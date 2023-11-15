import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { randomUUID } from 'crypto';
import { ProducerService } from '../providers/kafka/producer.service';
import { RegistryService } from '../providers/kafka/registry.service';

@Injectable()
export class BooksService {
  private readonly topic: string = 'aws.us-west-2.english.template.fct.test.0';

  constructor(
    private readonly producerService: ProducerService,
    private readonly registryService: RegistryService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const encodedKey = await this.registryService.encode(
      `${this.topic}-key`,
      createBookDto,
    );

    const encodedMessage = await this.registryService.encode(
      `${this.topic}-value`,
      createBookDto,
    );

    return this.producerService.produce({
      topic: this.topic,
      messages: [
        {
          key: encodedKey,
          value: encodedMessage,
        },
      ],
    });
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
