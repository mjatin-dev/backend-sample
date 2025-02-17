import { RuleDto } from '../rule/dto/rule.dto';
import { RuleComponentType } from '../rule/dto/Enums';
import {
  FunctionValue,
  LookUpTable,
  LookUpValue,
  RootCondition,
  SubQuery,
} from '../rule/dto/front-end-rule.dto';
import { v4 } from 'uuid';

export class RuleFormatter {
  static getFormattedTemporalTableName(name: string) {
    return `temp_${name.replaceAll(' ', '_').substring(0, 50)}_${
      v4().split('-')[0]
    }`;
  }

  static getFormattedRule(tenantId: number, dataSource: string, rule: RuleDto) {
    const ruleClone: RuleDto = JSON.parse(JSON.stringify(rule));
    const schema = `mig_${tenantId}_${dataSource}`.replace(/(\-)/g, '_');
    const tableNames = new Set<string>();
    //Format Table
    tableNames.add(ruleClone.table);
    ruleClone.table = `${schema}."${ruleClone.table}" ${ruleClone.table}`;

    //Format SubQuery tables
    const subQueriesFormatted = this._getSubQueriesFormatted(ruleClone, schema);

    ruleClone.subQueries = subQueriesFormatted || [];

    //Format Join
    if (ruleClone.join) {
      ruleClone.join = ruleClone.join.map((join) => {
        return {
          ...join,
          table: `${schema}.${join.table}`,
        };
      });
    }

    let ruleJsonString = JSON.stringify(ruleClone);

    tableNames.forEach((tableName) => {
      const postfix = v4().split('-')[0];
      ruleJsonString = this._applyFieldRegex(
        ruleJsonString,
        tableName,
        `"${tableName}${postfix}.`,
      );

      ruleJsonString = this._applyAliasRegex(
        ruleJsonString,
        tableName,
        ` ${tableName}${postfix}"`,
      );
    });

    return JSON.parse(ruleJsonString);
  }

  static _getSubQueriesFormatted(
    ruleClone: RuleDto,
    schema: string,
  ): SubQuery[] {
    const subQueries = ruleClone.subQueries || [];
    return subQueries?.map((subQuery, index) => {
      const postfix = `sub${v4().split('-')[0]}`;
      const table = subQuery.table;
      ruleClone.subQueries[
        index
      ].table = `${schema}."${subQuery.table}" ${table}${postfix}`;
      const subQueryString = JSON.stringify(ruleClone.subQueries[index]);
      const subQueryStringFormatted = this._applyFieldRegex(
        subQueryString,
        table,
        `"${table}${postfix}.`,
      );
      return JSON.parse(subQueryStringFormatted);
    });
  }

  static _applyFieldRegex(
    jsonString: string,
    tableName: string,
    replaceWith: string,
  ): string {
    const fieldRegex = new RegExp(`(\\"${tableName}\\\.)`, 'g');
    return jsonString.replace(fieldRegex, replaceWith);
  }

  static _applyAliasRegex(
    jsonString: string,
    tableName: string,
    replaceWith: string,
  ): string {
    const tableAliasRegex = new RegExp(`( ${tableName}\\")`, 'g');
    return jsonString.replace(tableAliasRegex, replaceWith);
  }

  static getTableDependencies(rule: RuleDto) {
    const dependencies = new Set<string>();
    dependencies.add(rule.table);
    if (rule.where) {
      rule.where.forEach((condition) => {
        if (condition.type === RuleComponentType.ROOT_CONDITIONAL) {
          RuleFormatter.processRootConditionDependencies(
            condition as RootCondition,
            dependencies,
          );
        }
      });
    }
    if (rule.having) {
      rule.having.forEach((condition) => {
        if (condition.type === RuleComponentType.ROOT_CONDITIONAL) {
          RuleFormatter.processRootConditionDependencies(
            condition as RootCondition,
            dependencies,
          );
        }
      });
    }
    return Array.from(dependencies);
  }

  static processRootConditionDependencies(
    rootCondition: RootCondition,
    dependencies: Set<string>,
  ) {
    if (rootCondition.field.type === RuleComponentType.LOOKUP_VALUE) {
      RuleFormatter.processLookUpValueConditionDependencies(
        rootCondition.field as LookUpValue,
        dependencies,
      );
    }
    if (rootCondition.value.type === RuleComponentType.LOOKUP_VALUE) {
      RuleFormatter.processLookUpValueConditionDependencies(
        rootCondition.value as LookUpValue,
        dependencies,
      );
    }
    if (rootCondition.field.type === RuleComponentType.FUNCTION_VALUE) {
      RuleFormatter.processFunctionValueDependencies(
        rootCondition.field as FunctionValue,
        dependencies,
      );
    }
    if (rootCondition.value.type === RuleComponentType.FUNCTION_VALUE) {
      RuleFormatter.processFunctionValueDependencies(
        rootCondition.value as FunctionValue,
        dependencies,
      );
    }
  }

  static processFunctionValueDependencies(
    functionValue: FunctionValue,
    dependencies: Set<string>,
  ) {
    functionValue.value.forEach((value) => {
      if (value.type === RuleComponentType.LOOKUP_VALUE) {
        const lookUpValue = value as LookUpValue;
        RuleFormatter.processLookUpValueConditionDependencies(
          lookUpValue,
          dependencies,
        );
      }
    });
  }

  static processLookUpValueConditionDependencies(
    lookUpValue: LookUpValue,
    set: Set<string>,
  ) {
    const lookUpComponents = lookUpValue.value;
    lookUpComponents.forEach((component) => {
      if (component.type === RuleComponentType.LOOKUP_TABLE) {
        const lookUpTable = component as LookUpTable;
        if (lookUpTable.table) set.add(lookUpTable.table);
        if (lookUpTable.referenceTable) set.add(lookUpTable.referenceTable);
      }
    });
  }
}
