import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsInt, IsString } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateBookDto {
  @ApiProperty({ default: randomUUID() })
  @IsString()
  customer_id: string;

  @ApiProperty({ default: randomUUID() })
  @IsString()
  proposition_id: string;

  @ApiProperty({ default: randomUUID() })
  @IsString()
  event_id: string;

  @ApiProperty({ default: 'BookCreated' })
  @IsString()
  @Equals('BookCreated')
  event_type: string;

  @ApiProperty({ default: new Date().getTime() })
  @IsInt()
  timestamp: bigint;
}
