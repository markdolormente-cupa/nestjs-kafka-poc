import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { Equals, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ default: 'BookUpdated' })
  @IsString()
  @Equals('BookUpdated')
  event_type: string;
}
