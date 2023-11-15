import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsConsumer } from './registrations.consumer';
import { KafkaModule } from '../providers/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsConsumer],
})
export class RegistrationsModule {}
