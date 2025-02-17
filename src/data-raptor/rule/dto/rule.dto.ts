import { IsString, IsDefined, IsArray, IsOptional } from 'class-validator';

import {
  RuleHavingArray,
  RuleWhereArray,
  RootCondition,
  SubQuery,
} from './front-end-rule.dto';

export class JoinClause {
  type: string;
  table: string;
  condition: RootCondition;
}

export class RuleDto {
  @IsString()
  table: string;

  @IsDefined()
  @IsArray()
  where: RuleWhereArray;

  @IsOptional()
  @IsArray()
  join?: JoinClause[];

  @IsOptional()
  @IsArray()
  subQueries?: SubQuery[];

  @IsOptional()
  @IsArray()
  having?: RuleHavingArray;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  groupBy?: string[];
}
