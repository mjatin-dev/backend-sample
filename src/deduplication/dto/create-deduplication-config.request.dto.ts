import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateDeduplicationConfigRequestDto {
  @IsString()
  @IsNotEmpty()
  migrationId: string;

  @IsString()
  @IsNotEmpty()
  tableName: string;

  @IsArray()
  @Type(() => String)
  fields: string[];
}
