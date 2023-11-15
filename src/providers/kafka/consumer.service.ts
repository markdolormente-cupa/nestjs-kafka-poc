import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private kafkaClient: Kafka;
  private activeConsumers: Consumer[] = [];
  private groupId: string = process.env.GROUP_ID || 'µservice-processor';

  constructor(private config: ConfigService) {
    this.kafkaClient = new Kafka({ ...this.config.get('kafka') });
  }

  async consume(topic: ConsumerSubscribeTopics, runConfig: ConsumerRunConfig) {
    const consumer = this.kafkaClient.consumer({
      groupId: this.groupId,
    });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(runConfig);
    this.activeConsumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.activeConsumers) {
      await consumer.disconnect();
    }
  }
}
