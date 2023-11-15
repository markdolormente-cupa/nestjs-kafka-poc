import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

@Injectable()
export class RegistryService implements OnModuleInit {
  private registry: SchemaRegistry;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const registryConfig = this.config.get('confluentRegistry');
    this.registry = new SchemaRegistry({
      host: registryConfig.host,
      auth: {
        username: registryConfig.api_key,
        password: registryConfig.api_secret,
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
