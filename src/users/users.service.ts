import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProducerService } from 'src/providers/kafka/producer.service';
import { RegistryService } from 'src/providers/kafka/registry.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly TOPIC: string = 'aws.us-west-2.english.saas.fct.users.0';

  constructor(
    private readonly producerService: ProducerService,
    private readonly registryService: RegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateUserDto) {
    const user = {
      ...dto,
      userId: this.generateUserId(),
      status: 'pending',
    };
    const encodedMessage = await this.registryService.encode(
      `${this.TOPIC}-value`,
      user,
    );

    await this.producerService.produce({
      topic: this.TOPIC,
      messages: [
        {
          key: user.userId,
          value: encodedMessage,
        },
      ],
    });

    this.logger.log('User created', JSON.stringify(user));
  }

  private generateUserId(): string {
    return 'U-' + randomUUID();
  }
}
