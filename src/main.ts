import { NestFactory } from '@nestjs/core';
import { ConsoleLogger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function createNestApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  return app;
}

function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('µService API')
    .setDescription('µService API Documentation')
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api/docs', app, document);
}

async function bootstrap() {
  const app = await createNestApp();
  setupSwagger(app);

  await app.listen(process.env.APP_PORT);
  return `App is listening to port ${process.env.APP_PORT}`;
}

bootstrap().then((message) => {
  const consoleLogger = new ConsoleLogger(process.env.APP_NAME);
  consoleLogger.log(message);
});
