import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
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

  const config = new DocumentBuilder()
    .setTitle('Service-Name OpenAPI')
    .setDescription('Service-Name API description')
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('template/docs', app, document);

  await app.listen(process.env.APP_PORT);
  return `App is listening to port ${process.env.APP_PORT}`;
}

bootstrap().then((message) => {
  const consoleLogger = new ConsoleLogger(process.env.APP_NAME);
  consoleLogger.log(message);
});
