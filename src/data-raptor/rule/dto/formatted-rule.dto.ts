import {
  RuleWhereArray,
  RuleHavingArray,
  SubQuery,
} from './front-end-rule.dto';
import { JoinClause } from './rule.dto';

export class FormattedRuleDto {
  table: string;
  subQueries?: SubQuery[];
  join?: JoinClause[];
  where?: RuleWhereArray;
  having?: RuleHavingArray;
  groupBy?: string[];
  fields?: string[];
  limit?: number;
}
