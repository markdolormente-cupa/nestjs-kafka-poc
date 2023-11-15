import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { KafkaModule } from 'src/providers/kafka/kafka.module';
import { TenatsConsumer } from './tenants.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [TenantsController],
  providers: [TenantsService, TenatsConsumer],
})
export class TenantsModule {}
