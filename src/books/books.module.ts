import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { KafkaModule } from '../providers/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
