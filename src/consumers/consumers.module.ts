import { Module } from '@nestjs/common';
import { KafkaModule } from '../providers/kafka/kafka.module';
import { SampleConsumer } from './sample.consumer';

@Module({
  imports: [KafkaModule],
  providers: [SampleConsumer],
})
export class ConsumersModule {}
