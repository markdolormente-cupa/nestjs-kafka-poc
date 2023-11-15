import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

@Injectable()
export class RegistryService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  public registry: SchemaRegistry;

  onModuleInit() {
    const { host, api_key, api_secret } =
      this.configService.get('confluentRegistry');

    this.registry = new SchemaRegistry({
      host,
      auth: {
        username: api_key,
        password: api_secret,
      },
    });
  }

  async encode(subject: string, payload: any) {
    const registryId = await this.registry.getLatestSchemaId(subject);
    return this.registry.encode(registryId, payload);
  }

  async decode(buffer: any) {
    return this.registry.decode(buffer);
  }
}
