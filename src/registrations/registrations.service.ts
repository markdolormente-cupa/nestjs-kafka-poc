import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { RegistryService } from 'src/providers/kafka/registry.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RegistrationsService {
  private static readonly TOPIC =
    'aws.us-west-2.english.saas.fct.registrations.0';

  constructor(
    private readonly producerService: ProducerService,
    private readonly registryService: RegistryService,
  ) {}

  async create(dto: CreateRegistrationDto) {
    const tenantId = this.generateTenantId();

    const payload = {
      tenantId,
      ...dto,
      timestamp: new Date().getTime(),
    };

    const encodedMessage = await this.encodePayload(payload);
    return this.publishToKafka(tenantId, encodedMessage);
  }

  private generateTenantId(): string {
    return 'T-' + randomUUID();
  }

  async update(dto: UpdateRegistrationDto) {
    const encodedMessage = await this.encodePayload(dto);
    return this.publishToKafka(dto.tenantId, encodedMessage);
  }

  private async encodePayload(payload: any) {
    const topicWithValue = `${RegistrationsService.TOPIC}-value`;
    return this.registryService.encode(topicWithValue, payload);
  }

  private publishToKafka(key: string, encodedMessage: any) {
    return this.producerService.produce({
      topic: RegistrationsService.TOPIC,
      messages: [
        {
          key,
          value: encodedMessage,
        },
      ],
    });
  }
}
