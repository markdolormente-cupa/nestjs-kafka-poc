import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { OnEvent } from '@nestjs/event-emitter';
@Controller('users')
export class UsersController {
  constructor(private readonly tenantsService: UsersService) {}

  @OnEvent('user.create')
  handleUserCreate(dto: CreateUserDto) {
    return this.tenantsService.create(dto);
  }
}
