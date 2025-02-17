import { RuleHavingArray, RuleWhereArray, RootCondition, SubQuery } from './front-end-rule.dto';
export declare class JoinClause {
    type: string;
    table: string;
    condition: RootCondition;
}
export declare class RuleDto {
    table: string;
    where: RuleWhereArray;
    join?: JoinClause[];
    subQueries?: SubQuery[];
    having?: RuleHavingArray;
    groupBy?: string[];
}
