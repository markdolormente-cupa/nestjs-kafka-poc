import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { RegistryService } from './registry.service';

@Module({
  providers: [ProducerService, ConsumerService, RegistryService],
  exports: [ProducerService, ConsumerService, RegistryService],
})
export class KafkaModule {}
