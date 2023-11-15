import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../providers/kafka/consumer.service';
import { RegistryService } from '../providers/kafka/registry.service';

@Injectable()
export class SampleConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly registryService: RegistryService,
  ) {}

  private readonly logger = new Logger(SampleConsumer.name);
  private readonly topic: string = 'aws.us-west-2.english.template.fct.test.0';

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topics: [this.topic], fromBeginning: false },
      config: { groupId: 'nestjs-processor-local' },
      onMessage: async (message) => {
        const decodedKey = await this.registryService.decode(message.key);
        const decodedMessage = await this.registryService.decode(message.value);

        this.logger.log('Consumed message:', {
          key: decodedKey,
          value: decodedMessage,
        });
      },
    });
  }
}
