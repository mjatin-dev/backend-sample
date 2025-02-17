import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsNotEmptyObject,
  IsDefined,
  IsOptional,
} from 'class-validator';
import { RuleDto } from '../rule/dto/rule.dto';

export class UpdateRuleTempTableDto {
  @IsString()
  @IsOptional()
  table: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsObject()
  @IsOptional()
  definition: RuleDto;
}

export class CreateRuleTempTable {
  @IsString()
  @IsNotEmpty()
  table: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  definition: RuleDto;
}
