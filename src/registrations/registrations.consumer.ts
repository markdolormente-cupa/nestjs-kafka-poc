import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../providers/kafka/consumer.service';
import { RegistryService } from '../providers/kafka/registry.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RegistrationsConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly registryService: RegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(RegistrationsConsumer.name);
  private readonly TOPIC: string =
    'aws.us-west-2.english.saas.fct.registrations.0';

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: [this.TOPIC], fromBeginning: false },
      {
        eachMessage: async ({ message }) => {
          const decodedMessage = await this.registryService.decode(
            message.value,
          );

          if (decodedMessage.status === 'pending') {
            this.handlePendingRegistration(decodedMessage);
          }

          if (decodedMessage.status === 'preparing') {
            this.handlePreparingRegistration(decodedMessage);
          }

          this.logger.log(
            'Registration message:',
            JSON.stringify(decodedMessage),
          );
        },
      },
    );

    this.logger.log(`Subscribed to ${this.TOPIC} topic.`);
  }

  private handlePendingRegistration(registration) {
    this.eventEmitter.emit('tenant.create', registration);
  }

  private handlePreparingRegistration(registration) {
    this.eventEmitter.emit('user.create', registration);
  }
}
