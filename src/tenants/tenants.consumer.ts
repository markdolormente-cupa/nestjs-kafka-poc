import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../providers/kafka/consumer.service';
import { RegistryService } from '../providers/kafka/registry.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TenatsConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly registryService: RegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(TenatsConsumer.name);
  private readonly topic: string = 'aws.us-west-2.english.saas.fct.tenants.0';

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: [this.topic], fromBeginning: false },
      {
        eachMessage: async ({ message }) => {
          const decodedMessage = await this.registryService.decode(
            message.value,
          );
          this.handleTenantCreated(decodedMessage);
          this.logger.log('Tenant message:', JSON.stringify(decodedMessage));
        },
      },
    );

    this.logger.log(`Subscribed to ${this.topic} topic.`);
  }

  private handleTenantCreated(tenant) {
    this.eventEmitter.emit('registration.prepare', tenant);
  }
}
