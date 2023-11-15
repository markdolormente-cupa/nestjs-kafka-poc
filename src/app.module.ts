import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConsumersModule } from './consumers/consumers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    BooksModule,
    ConsumersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
