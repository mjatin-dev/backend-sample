import { RuleDto, JoinClause } from '../rule/dto/rule.dto';
import { RuleComponentType } from '../rule/dto/Enums';
import {
  LookUpValue,
  FieldReference,
  LookUpTable,
  RootCondition,
  FunctionValue,
  SubQuery,
  PrimitiveValue,
  PrimitiveFormatEnum,
  SubQueryValue,
} from '../rule/dto/front-end-rule.dto';
import _ from 'lodash';

export class RuleTransformer {
  static processRuleTransformations(rule: RuleDto) {
    try {
      const ruleCopy: RuleDto = JSON.parse(JSON.stringify(rule));
      const joinClause: JoinClause[] = [];
      const joinClauseTableMap = {};
      const ruleConditions = ruleCopy.where || [];
      const ruleHaving = ruleCopy.having || [];
      const ruleSubQueries = ruleCopy.subQueries || [];

      ruleSubQueries.forEach((subQuery, subQueryIndex) => {
        const conditions = subQuery.where;
        conditions.forEach((condition, whereIndex) => {
          if (condition.type === RuleComponentType.ROOT_CONDITIONAL) {
            RuleTransformer._processRootConditionTransformations(
              condition as RootCondition,
              [],
              {},
              ruleCopy.subQueries[subQueryIndex],
              `where[${whereIndex}]`,
            );
          }
        });
      });

      ruleConditions.forEach((condition, index) => {
        if (condition.type === RuleComponentType.ROOT_CONDITIONAL) {
          RuleTransformer._processRootConditionTransformations(
            condition as RootCondition,
            joinClause,
            joinClauseTableMap,
            ruleCopy,
            `where[${index}]`,
          );
        }
      });

      ruleHaving.forEach((condition, index) => {
        if (condition.type === RuleComponentType.ROOT_CONDITIONAL) {
          RuleTransformer._processRootConditionTransformations(
            condition as RootCondition,
            joinClause,
            joinClauseTableMap,
            ruleCopy,
            `having[${index}]`,
          );
        }
      });

      ruleCopy.join = joinClause;
      return ruleCopy;
    } catch (e) {
      console.log('Error in RuleTransformer', e, e.stack);
      return rule;
    }
  }

  static _processRootConditionTransformations(
    rootCondition: RootCondition,
    joinClause: JoinClause[],
    joinClauseTableMap: any,
    ruleCopy: RuleDto | SubQuery,
    targetPath: string,
  ) {
    if (rootCondition.field.type === RuleComponentType.LOOKUP_VALUE) {
      const fieldReference = RuleTransformer._processLookUpValue(
        rootCondition.field as LookUpValue,
        joinClause,
        joinClauseTableMap,
      );
      _.set(ruleCopy, `${targetPath}.field`, fieldReference);
    }
    if (rootCondition.value.type === RuleComponentType.LOOKUP_VALUE) {
      const fieldReference = RuleTransformer._processLookUpValue(
        rootCondition.value as LookUpValue,
        joinClause,
        joinClauseTableMap,
      );
      _.set(ruleCopy, `${targetPath}.value`, fieldReference);
    }
    if (rootCondition.field.type === RuleComponentType.FIELD_REFERENCE) {
      const fieldReference = RuleTransformer._processFieldReference(
        rootCondition.field as FieldReference,
        ruleCopy,
      );
      _.set(ruleCopy, `${targetPath}.field`, fieldReference);
    }
    if (rootCondition.value.type === RuleComponentType.FIELD_REFERENCE) {
      const fieldReference = RuleTransformer._processFieldReference(
        rootCondition.value as FieldReference,
        ruleCopy,
      );
      _.set(ruleCopy, `${targetPath}.value`, fieldReference);
    }
    if (rootCondition.field.type === RuleComponentType.FUNCTION_VALUE) {
      RuleTransformer.processFunctionValueTransformations(
        rootCondition.field as FunctionValue,
        joinClause,
        joinClauseTableMap,
        ruleCopy,
        `${targetPath}.field`,
      );
    }
    if (rootCondition.value.type === RuleComponentType.FUNCTION_VALUE) {
      RuleTransformer.processFunctionValueTransformations(
        rootCondition.value as FunctionValue,
        joinClause,
        joinClauseTableMap,
        ruleCopy,
        `${targetPath}.value`,
      );
    }

    if (rootCondition.value.type === RuleComponentType.PRIMITIVE_VALUE) {
      const value = rootCondition.value as PrimitiveValue;
      if (
        [PrimitiveFormatEnum.BOOLEAN, PrimitiveFormatEnum.NULL].includes(
          value.format as PrimitiveFormatEnum,
        )
      ) {
        if (rootCondition.operator == '=') {
          _.set(ruleCopy, `${targetPath}.operator`, 'IS');
        }
        if (rootCondition.operator == '!=') {
          _.set(ruleCopy, `${targetPath}.operator`, 'IS NOT');
        }
      }
    }
  }

  static processFunctionValueTransformations(
    functionValue: FunctionValue,
    joinClause: JoinClause[],
    joinClauseTableMap: any,
    ruleCopy: RuleDto | SubQuery,
    targetPath: string,
  ) {
    functionValue.value.forEach((value, index) => {
      if (value.type === RuleComponentType.LOOKUP_VALUE) {
        const lookUpValue = value as LookUpValue;
        const fieldReference = RuleTransformer._processLookUpValue(
          lookUpValue,
          joinClause,
          joinClauseTableMap,
        );
        _.set(ruleCopy, `${targetPath}.value[${index}]`, fieldReference);
      }
      if (value.type === RuleComponentType.FIELD_REFERENCE) {
        const fieldReference = value as FieldReference;
        const newFieldReference = RuleTransformer._processFieldReference(
          fieldReference,
          ruleCopy,
        );
        _.set(ruleCopy, `${targetPath}.value[${index}]`, newFieldReference);
      }
    });
  }

  static _processFieldReference(
    fieldReference: FieldReference,
    ruleCopy: RuleDto | SubQuery,
  ) {
    const referenceCopy = _.cloneDeep(fieldReference);
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

  static _processLookUpValue(
    lookUpValue: LookUpValue,
    joinClause: JoinClause[],
    joinClauseTableMap: any,
  ): FieldReference {
    const lookUpComponents = lookUpValue.value;

    for (let i = 0; i < lookUpComponents.length; i++) {
      const component = lookUpComponents[i];
      const previousComponent = lookUpComponents[i - 1];
      if (component.type === RuleComponentType.LOOKUP_TABLE) {
        const lookUpTable = component as LookUpTable;
        const relationshipKey = `${lookUpTable.table}_${lookUpTable.relationShipName}_${lookUpTable.referenceTable}`;
        let joinConditionField = '';
        let previousRelationShipKey = '';
        // Build Join object based on the Look up condition
        if (previousComponent) {
          const previousLookUpTable = previousComponent as LookUpTable;
          previousRelationShipKey = `${previousLookUpTable.table}_${previousLookUpTable.relationShipName}_${previousLookUpTable.referenceTable}`;
          joinConditionField = `${previousRelationShipKey}.${lookUpTable.joinField}`;
        } else {
          joinConditionField = `${lookUpTable.table}.${lookUpTable.joinField}`;
        }
        const joinCondition: RootCondition = {
          type: RuleComponentType.ROOT_CONDITIONAL,
          field: {
            type: RuleComponentType.FIELD_REFERENCE,
            value: joinConditionField,
          },
          operator: '=',
          value: {
            type: RuleComponentType.FIELD_REFERENCE,
            value: `${relationshipKey}.${lookUpTable.referenceJoinField}`,
          },
        };
        const join: JoinClause = {
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
      } else if (component.type === RuleComponentType.FIELD_REFERENCE) {
        if (previousComponent) {
          const previousLookUpTable = previousComponent as LookUpTable;
          const previousRelationShipKey = `${previousLookUpTable.table}_${previousLookUpTable.relationShipName}_${previousLookUpTable.referenceTable}`;
          const fieldReference = component as FieldReference;
          const fieldReferenceCopy = JSON.parse(JSON.stringify(fieldReference));
          fieldReferenceCopy.value = `${previousRelationShipKey}.${fieldReference.value}`;
          return fieldReferenceCopy;
        }
      }
    }
  }
  static transformSubQueriesReferences(
    rule: RuleDto,
    subQueryMap: Record<string, string>,
  ) {
    const ruleCopy: RuleDto = JSON.parse(JSON.stringify(rule));
    const existingSubQueriesIds = [];
    const conditionals = rule.where || [];

    conditionals.forEach((condition: RootCondition, index: number) => {
      if (condition.type !== RuleComponentType.ROOT_CONDITIONAL) {
        return;
      }
      if (condition.value.type === RuleComponentType.SUB_QUERY_VALUE) {
        const subQueryValue = condition.value as SubQueryValue;
        const subQueryId = subQueryValue.subQueryId;
        if (subQueryMap[subQueryId]) {
          _.set(
            ruleCopy,
            `where[${index}].value.subQueryId`,
            subQueryMap[subQueryId],
          );
        } else {
          existingSubQueriesIds.push(subQueryId);
        }
      }
    });

    return { ruleCopy, existingSubQueriesIds };
  }
}
