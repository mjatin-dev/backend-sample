import { RuleDto, JoinClause } from '../rule/dto/rule.dto';
import { LookUpValue, FieldReference, RootCondition, FunctionValue, SubQuery } from '../rule/dto/front-end-rule.dto';
export declare class RuleTransformer {
    static processRuleTransformations(rule: RuleDto): RuleDto;
    static _processRootConditionTransformations(rootCondition: RootCondition, joinClause: JoinClause[], joinClauseTableMap: any, ruleCopy: RuleDto | SubQuery, targetPath: string): void;
    static processFunctionValueTransformations(functionValue: FunctionValue, joinClause: JoinClause[], joinClauseTableMap: any, ruleCopy: RuleDto | SubQuery, targetPath: string): void;
    static _processFieldReference(fieldReference: FieldReference, ruleCopy: RuleDto | SubQuery): FieldReference;
    static _processLookUpValue(lookUpValue: LookUpValue, joinClause: JoinClause[], joinClauseTableMap: any): FieldReference;
    static transformSubQueriesReferences(rule: RuleDto, subQueryMap: Record<string, string>): {
        ruleCopy: RuleDto;
        existingSubQueriesIds: any[];
    };
}
