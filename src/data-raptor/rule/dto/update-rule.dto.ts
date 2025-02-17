import { Type } from 'class-transformer';
import { RuleDto } from './rule.dto';
import { FrontEndRuleDto } from './front-end-rule.dto';
import {
  Min,
  Max,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
  IsDefined,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { FormattedRuleDto } from './formatted-rule.dto';

export class UpdateRuleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  table?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => RuleDto)
  @IsOptional()
  rule?: RuleDto;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  violationScore?: number;

  @IsOptional()
  formattedRule?: FormattedRuleDto;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  risk?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsOptional()
  frontEndObject?: FrontEndRuleDto;

  @IsOptional()
  previousFormattedRule?: FormattedRuleDto;
  tableDependencies?: string[];
}
