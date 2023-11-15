import { Controller, Post, Body } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { ApiTags } from '@nestjs/swagger';
import { OnEvent } from '@nestjs/event-emitter';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@ApiTags('Registrations')
@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @OnEvent('registration.prepare')
  prepareRegistration(dto: UpdateRegistrationDto) {
    return this.registrationsService.update({
      ...dto,
      status: 'preparing',
    });
  }
}
