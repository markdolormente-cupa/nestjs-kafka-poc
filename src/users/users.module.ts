import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KafkaModule } from 'src/providers/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
