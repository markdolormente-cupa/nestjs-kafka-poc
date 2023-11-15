import { Injectable, Logger } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { RegistryService } from 'src/providers/kafka/registry.service';

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);
  private readonly TOPIC: string = 'aws.us-west-2.english.saas.fct.tenants.0';

  constructor(
    private readonly producerService: ProducerService,
    private readonly registryService: RegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateTenantDto) {
    const encodedMessage = await this.registryService.encode(
      `${this.TOPIC}-value`,
      dto,
    );

    await this.producerService.produce({
      topic: this.TOPIC,
      messages: [
        {
          key: dto.tenantId,
          value: encodedMessage,
        },
      ],
    });

    this.logger.log('Tenant created', JSON.stringify(dto));
    this.eventEmitter.emit('registration.prepare', dto);
  }
}
