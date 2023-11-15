import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { IProducer } from '../../common/interfaces/producer.interface';
import { KafkajsProducer } from './kafkajs.producer';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();
  private readonly clientId: string = 'nestjs-kafka-local-client';

  constructor(private readonly configService: ConfigService) {}

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(topic, {
        clientId: this.clientId,
        ...this.configService.get('kafka'),
      });
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async produce(record: ProducerRecord) {
    const { topic } = record;
    const producer = await this.getProducer(topic);
    return producer.produce(record);
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
