import { FormattedRuleDto } from '../rule/dto/formatted-rule.dto';
import { ConditionalValue, FieldReference, FunctionValue, PrimitiveValue, RootCondition, RuleWhereArray, SubQueryValue } from '../rule/dto/front-end-rule.dto';
export declare enum SpecialFunctions {
    DAYS_SINCE = "DAYS_SINCE"
}
export declare class JsonToSql {
    json: FormattedRuleDto;
    constructor(json: FormattedRuleDto);
    buildSelectQuery(json: FormattedRuleDto): string;
    buildGroupBy(groupBy: any): any;
    buildCondition(where: RuleWhereArray): string;
    getPrimitiveStringValue(primitiveValue: PrimitiveValue): string;
    getFieldReferenceStringValue(fieldReference: FieldReference): string;
    getDaysSinceFunctionStringValue(functionValue: FunctionValue): string;
    getFunctionValueStringValue(functionValue: FunctionValue): string;
    getSubQueryValueStringValue(subQueryValue: SubQueryValue): string;
    handleConditionalValue(conditionalValue: ConditionalValue): string;
    buildRootCondition(condition: RootCondition): string;
    build(): string;
}
