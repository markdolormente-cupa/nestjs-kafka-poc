import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Kafka, Partitioners, Producer, ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private kafkaClient: Kafka;
  private kafkaProducer: Producer;
  private clientId: string = process.env.CLIENT_ID || 'µservice-client';

  constructor(private config: ConfigService) {
    this.kafkaClient = new Kafka({
      clientId: this.clientId,
      ...this.config.get('kafka'),
    });
    this.kafkaProducer = this.kafkaClient.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  async onModuleInit() {
    await this.kafkaProducer.connect();
  }

  async produce(record: ProducerRecord) {
    return this.kafkaProducer.send(record);
  }

  async onApplicationShutdown() {
    await this.kafkaProducer.disconnect();
  }
}
