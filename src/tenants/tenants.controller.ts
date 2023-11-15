import { Controller } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { OnEvent } from '@nestjs/event-emitter';
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @OnEvent('tenant.create')
  create(dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }
}
