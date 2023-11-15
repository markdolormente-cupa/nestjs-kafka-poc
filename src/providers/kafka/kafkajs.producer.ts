import { Logger } from '@nestjs/common';
import { Kafka, KafkaConfig, Producer, ProducerRecord } from 'kafkajs';
import { sleep } from 'radash';
import { IProducer } from '../../common/interfaces/producer.interface';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string, kafkaConfig: KafkaConfig) {
    this.kafka = new Kafka(kafkaConfig);
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  transactionProducer(transactionalId: string): Producer {
    return this.kafka.producer({
      transactionalId,
      maxInFlightRequests: 1,
      idempotent: true,
    });
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (error) {
      this.logger.error('Failed to connect to Kafka.', error);
      await sleep(5000);
      await this.connect();
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
