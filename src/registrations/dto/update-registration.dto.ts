import {
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsString,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class UpdateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsIn(['pending', 'preparing', 'waiting', 'complete'])
  @IsOptional()
  status: 'pending' | 'preparing' | 'waiting' | 'complete' = 'pending';

  @IsNumber()
  @IsOptional()
  timestamp: number = Date.now();
}
