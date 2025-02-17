import { RuleDto } from '../rule/dto/rule.dto';
import { FunctionValue, LookUpValue, RootCondition, SubQuery } from '../rule/dto/front-end-rule.dto';
export declare class RuleFormatter {
    static getFormattedTemporalTableName(name: string): string;
    static getFormattedRule(tenantId: number, dataSource: string, rule: RuleDto): any;
    static _getSubQueriesFormatted(ruleClone: RuleDto, schema: string): SubQuery[];
    static _applyFieldRegex(jsonString: string, tableName: string, replaceWith: string): string;
    static _applyAliasRegex(jsonString: string, tableName: string, replaceWith: string): string;
    static getTableDependencies(rule: RuleDto): string[];
    static processRootConditionDependencies(rootCondition: RootCondition, dependencies: Set<string>): void;
    static processFunctionValueDependencies(functionValue: FunctionValue, dependencies: Set<string>): void;
    static processLookUpValueConditionDependencies(lookUpValue: LookUpValue, set: Set<string>): void;
}
