import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateRegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'foobar@mail.com' })
  email: string;

  @IsIn(['pending', 'preparing', 'waiting', 'complete'])
  @IsOptional()
  status: 'pending' | 'preparing' | 'waiting' | 'complete' = 'pending';
}
