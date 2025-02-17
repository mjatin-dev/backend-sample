"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleTransformer = void 0;
const Enums_1 = require("../rule/dto/Enums");
const front_end_rule_dto_1 = require("../rule/dto/front-end-rule.dto");
const lodash_1 = __importDefault(require("lodash"));
class RuleTransformer {
    static processRuleTransformations(rule) {
        try {
            const ruleCopy = JSON.parse(JSON.stringify(rule));
            const joinClause = [];
            const joinClauseTableMap = {};
            const ruleConditions = ruleCopy.where || [];
            const ruleHaving = ruleCopy.having || [];
            const ruleSubQueries = ruleCopy.subQueries || [];
            ruleSubQueries.forEach((subQuery, subQueryIndex) => {
                const conditions = subQuery.where;
                conditions.forEach((condition, whereIndex) => {
                    if (condition.type === Enums_1.RuleComponentType.ROOT_CONDITIONAL) {
                        RuleTransformer._processRootConditionTransformations(condition, [], {}, ruleCopy.subQueries[subQueryIndex], `where[${whereIndex}]`);
                    }
                });
            });
            ruleConditions.forEach((condition, index) => {
                if (condition.type === Enums_1.RuleComponentType.ROOT_CONDITIONAL) {
                    RuleTransformer._processRootConditionTransformations(condition, joinClause, joinClauseTableMap, ruleCopy, `where[${index}]`);
                }
            });
            ruleHaving.forEach((condition, index) => {
                if (condition.type === Enums_1.RuleComponentType.ROOT_CONDITIONAL) {
                    RuleTransformer._processRootConditionTransformations(condition, joinClause, joinClauseTableMap, ruleCopy, `having[${index}]`);
                }
            });
            ruleCopy.join = joinClause;
            return ruleCopy;
        }
        catch (e) {
            console.log('Error in RuleTransformer', e, e.stack);
            return rule;
        }
    }
    static _processRootConditionTransformations(rootCondition, joinClause, joinClauseTableMap, ruleCopy, targetPath) {
        if (rootCondition.field.type === Enums_1.RuleComponentType.LOOKUP_VALUE) {
            const fieldReference = RuleTransformer._processLookUpValue(rootCondition.field, joinClause, joinClauseTableMap);
            lodash_1.default.set(ruleCopy, `${targetPath}.field`, fieldReference);
        }
        if (rootCondition.value.type === Enums_1.RuleComponentType.LOOKUP_VALUE) {
            const fieldReference = RuleTransformer._processLookUpValue(rootCondition.value, joinClause, joinClauseTableMap);
            lodash_1.default.set(ruleCopy, `${targetPath}.value`, fieldReference);
        }
        if (rootCondition.field.type === Enums_1.RuleComponentType.FIELD_REFERENCE) {
            const fieldReference = RuleTransformer._processFieldReference(rootCondition.field, ruleCopy);
            lodash_1.default.set(ruleCopy, `${targetPath}.field`, fieldReference);
        }
        if (rootCondition.value.type === Enums_1.RuleComponentType.FIELD_REFERENCE) {
            const fieldReference = RuleTransformer._processFieldReference(rootCondition.value, ruleCopy);
            lodash_1.default.set(ruleCopy, `${targetPath}.value`, fieldReference);
        }
        if (rootCondition.field.type === Enums_1.RuleComponentType.FUNCTION_VALUE) {
            RuleTransformer.processFunctionValueTransformations(rootCondition.field, joinClause, joinClauseTableMap, ruleCopy, `${targetPath}.field`);
        }
        if (rootCondition.value.type === Enums_1.RuleComponentType.FUNCTION_VALUE) {
            RuleTransformer.processFunctionValueTransformations(rootCondition.value, joinClause, joinClauseTableMap, ruleCopy, `${targetPath}.value`);
        }
        if (rootCondition.value.type === Enums_1.RuleComponentType.PRIMITIVE_VALUE) {
            const value = rootCondition.value;
            if ([front_end_rule_dto_1.PrimitiveFormatEnum.BOOLEAN, front_end_rule_dto_1.PrimitiveFormatEnum.NULL].includes(value.format)) {
                if (rootCondition.operator == '=') {
                    lodash_1.default.set(ruleCopy, `${targetPath}.operator`, 'IS');
                }
                if (rootCondition.operator == '!=') {
                    lodash_1.default.set(ruleCopy, `${targetPath}.operator`, 'IS NOT');
                }
            }
        }
    }
    static processFunctionValueTransformations(functionValue, joinClause, joinClauseTableMap, ruleCopy, targetPath) {
        functionValue.value.forEach((value, index) => {
            if (value.type === Enums_1.RuleComponentType.LOOKUP_VALUE) {
                const lookUpValue = value;
                const fieldReference = RuleTransformer._processLookUpValue(lookUpValue, joinClause, joinClauseTableMap);
                lodash_1.default.set(ruleCopy, `${targetPath}.value[${index}]`, fieldReference);
            }
            if (value.type === Enums_1.RuleComponentType.FIELD_REFERENCE) {
                const fieldReference = value;
                const newFieldReference = RuleTransformer._processFieldReference(fieldReference, ruleCopy);
                lodash_1.default.set(ruleCopy, `${targetPath}.value[${index}]`, newFieldReference);
            }
        });
    }
    static _processFieldReference(fieldReference, ruleCopy) {
        const referenceCopy = lodash_1.default.cloneDeep(fieldReference);
        const valueString = String(referenceCopy.value);
        if (valueString.includes('.') && valueString.includes('"')) {
            return referenceCopy;
        }
        if (valueString.includes('.') && !valueString.includes('"')) {
            const fieldComponent = valueString.split('.');
            referenceCopy.value = `${fieldComponent[0]}."${fieldComponent[1]}"`;
            return referenceCopy;
        }
        if (!valueString.includes('.')) {
            referenceCopy.value = `${ruleCopy.table}."${valueString}"`;
            return referenceCopy;
        }
    }
    static _processLookUpValue(lookUpValue, joinClause, joinClauseTableMap) {
        const lookUpComponents = lookUpValue.value;
        for (let i = 0; i < lookUpComponents.length; i++) {
            const component = lookUpComponents[i];
            const previousComponent = lookUpComponents[i - 1];
            if (component.type === Enums_1.RuleComponentType.LOOKUP_TABLE) {
                const lookUpTable = component;
                const relationshipKey = `${lookUpTable.table}_${lookUpTable.relationShipName}_${lookUpTable.referenceTable}`;
                let joinConditionField = '';
                let previousRelationShipKey = '';
                if (previousComponent) {
                    const previousLookUpTable = previousComponent;
                    previousRelationShipKey = `${previousLookUpTable.table}_${previousLookUpTable.relationShipName}_${previousLookUpTable.referenceTable}`;
                    joinConditionField = `${previousRelationShipKey}.${lookUpTable.joinField}`;
                }
                else {
                    joinConditionField = `${lookUpTable.table}.${lookUpTable.joinField}`;
                }
                const joinCondition = {
                    type: Enums_1.RuleComponentType.ROOT_CONDITIONAL,
                    field: {
                        type: Enums_1.RuleComponentType.FIELD_REFERENCE,
                        value: joinConditionField,
                    },
                    operator: '=',
                    value: {
                        type: Enums_1.RuleComponentType.FIELD_REFERENCE,
                        value: `${relationshipKey}.${lookUpTable.referenceJoinField}`,
                    },
                };
                const join = {
                    type: 'left',
                    table: `"${lookUpTable.referenceTable}" ${relationshipKey}`,
                    condition: joinCondition,
                };
                if (!joinClauseTableMap[relationshipKey]) {
                    joinClauseTableMap[relationshipKey] = {
                        index: joinClause.length,
                        join,
                    };
                    joinClause.push(join);
                }
            }
            else if (component.type === Enums_1.RuleComponentType.FIELD_REFERENCE) {
                if (previousComponent) {
                    const previousLookUpTable = previousComponent;
                    const previousRelationShipKey = `${previousLookUpTable.table}_${previousLookUpTable.relationShipName}_${previousLookUpTable.referenceTable}`;
                    const fieldReference = component;
                    const fieldReferenceCopy = JSON.parse(JSON.stringify(fieldReference));
                    fieldReferenceCopy.value = `${previousRelationShipKey}.${fieldReference.value}`;
                    return fieldReferenceCopy;
                }
            }
        }
    }
    static transformSubQueriesReferences(rule, subQueryMap) {
        const ruleCopy = JSON.parse(JSON.stringify(rule));
        const existingSubQueriesIds = [];
        const conditionals = rule.where || [];
        conditionals.forEach((condition, index) => {
            if (condition.type !== Enums_1.RuleComponentType.ROOT_CONDITIONAL) {
                return;
            }
            if (condition.value.type === Enums_1.RuleComponentType.SUB_QUERY_VALUE) {
                const subQueryValue = condition.value;
                const subQueryId = subQueryValue.subQueryId;
                if (subQueryMap[subQueryId]) {
                    lodash_1.default.set(ruleCopy, `where[${index}].value.subQueryId`, subQueryMap[subQueryId]);
                }
                else {
                    existingSubQueriesIds.push(subQueryId);
                }
            }
        });
        return { ruleCopy, existingSubQueriesIds };
    }
}
exports.RuleTransformer = RuleTransformer;
//# sourceMappingURL=RuleTransformer.js.map