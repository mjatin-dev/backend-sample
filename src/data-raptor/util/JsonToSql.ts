import { RuleComponentType } from '../rule/dto/Enums';
import { FormattedRuleDto } from '../rule/dto/formatted-rule.dto';
import {
  ConditionalValue,
  FieldReference,
  FunctionValue,
  LogicalOperator,
  PrimitiveValue,
  RootCondition,
  RuleWhereArray,
  SubQueryValue,
} from '../rule/dto/front-end-rule.dto';

export enum SpecialFunctions {
  DAYS_SINCE = 'DAYS_SINCE',
}

export class JsonToSql {
  json: FormattedRuleDto;

  constructor(json: FormattedRuleDto) {
    this.json = json;
  }

  buildSelectQuery(json: FormattedRuleDto) {
    const {
      table,
      fields = ['*'],
      where,
      join,
      having,
      subQueries,
      limit,
    } = json;
    let { groupBy } = json;

    if (groupBy && Array.isArray(groupBy) && groupBy.length > 0) {
      groupBy = this.buildGroupBy(groupBy);
    }

    let sql = `SELECT ${fields.join(', ')} FROM ${table}`;

    if (join && Array.isArray(join) && join.length > 0) {
      join.forEach((j) => {
        sql += ` ${j.type.toUpperCase()} JOIN ${
          j.table
        } ON ${this.buildCondition([j.condition])}`;
      });
    }

    if (where && Array.isArray(where) && where.length > 0) {
      sql += ` WHERE ${this.buildCondition(where)}`;
    }

    if (groupBy && Array.isArray(groupBy) && groupBy.length > 0) {
      sql += ` GROUP BY ${groupBy.join(', ')}`;
    }

    if (having && Array.isArray(having) && having.length > 0) {
      sql += ` HAVING ${this.buildCondition(having)}`;
    }

    if (subQueries && Array.isArray(subQueries) && subQueries.length > 0) {
      const subQueriesSqlString = subQueries
        .map(
          (subQuery) =>
            `${subQuery.alias} AS (${this.buildSelectQuery(subQuery)})`,
        )
        .join(',');
      sql = `WITH ${subQueriesSqlString}${sql}`;
    }

    if (limit) {
      sql += ` LIMIT ${limit}`;
    }

    return sql;
  }

  buildGroupBy(groupBy: any) {
    return groupBy.map((field: any) => {
      if (field.includes('.') && !field.includes('"')) {
        const fieldComponent = field.split('.');
        return `${fieldComponent[0]}."${fieldComponent[1]}"`;
      }
      return field;
    });
  }

  buildCondition(where: RuleWhereArray) {
    const conditions = [];
    for (const obj of where) {
      if (obj.type) {
        switch (obj.type) {
          case RuleComponentType.LOGICAL_OPERATOR:
            conditions.push(
              (obj as LogicalOperator).value.toUpperCase() || 'AND',
            );
            break;
          case RuleComponentType.OPEN_PARENTHESIS:
            conditions.push('(');
            break;
          case RuleComponentType.CLOSED_PARENTHESIS:
            conditions.push(')');
            break;
          case RuleComponentType.ROOT_CONDITIONAL:
            conditions.push(this.buildRootCondition(obj as RootCondition));
            break;
          default:
            break;
        }
      }
    }
    return conditions.join(' ');
  }

  getPrimitiveStringValue(primitiveValue: PrimitiveValue): string {
    if (
      ['NULL', 'TRUE', 'FALSE'].includes(
        String(primitiveValue.value).toUpperCase(),
      )
    ) {
      return `${primitiveValue.value}`;
    } else {
      return `'${primitiveValue.value}'`;
    }
  }

  getFieldReferenceStringValue(fieldReference: FieldReference): string {
    const fieldComponent = fieldReference.value.split('.');
    if (fieldComponent[1]?.includes('"')) {
      return `${fieldComponent[0]}.${fieldComponent[1]}`;
    }
    return `${fieldComponent[0]}."${fieldComponent[1]}"`;
  }

  getDaysSinceFunctionStringValue(functionValue: FunctionValue): string {
    const { function: _functionName, numberOfParams, value } = functionValue;
    const date = this.handleConditionalValue(value[0]);
    return `now()::DATE - ${date}::DATE`;
  }

  getFunctionValueStringValue(functionValue: FunctionValue): string {
    const { function: functionName, numberOfParams, value } = functionValue;
    if (functionName === SpecialFunctions.DAYS_SINCE) {
      return this.getDaysSinceFunctionStringValue(functionValue);
    }
    const paramStringValues = value
      .map((conditionalValue) => this.handleConditionalValue(conditionalValue))
      .join(', ');
    return `${functionName}(${paramStringValues})`;
  }

  getSubQueryValueStringValue(subQueryValue: SubQueryValue): string {
    const { subQueryId, value } = subQueryValue;
    return `(SELECT "${value}" FROM ${subQueryId})`;
  }

  handleConditionalValue(conditionalValue: ConditionalValue): string {
    if (conditionalValue.type === RuleComponentType.PRIMITIVE_VALUE) {
      return this.getPrimitiveStringValue(conditionalValue as PrimitiveValue);
    }
    if (conditionalValue.type === RuleComponentType.FIELD_REFERENCE) {
      return this.getFieldReferenceStringValue(
        conditionalValue as FieldReference,
      );
    }
    if (conditionalValue.type === RuleComponentType.FUNCTION_VALUE) {
      return this.getFunctionValueStringValue(
        conditionalValue as FunctionValue,
      );
    }
    if (conditionalValue.type === RuleComponentType.SUB_QUERY_VALUE) {
      return this.getSubQueryValueStringValue(
        conditionalValue as SubQueryValue,
      );
    }
    return '';
  }

  buildRootCondition(condition: RootCondition) {
    const { field, operator, value } = condition;
    const fieldResult: string = this.handleConditionalValue(field);
    const valueResult: string = this.handleConditionalValue(value);

    if (
      [
        '>',
        '>=',
        '<',
        '<=',
        '=',
        '<>',
        '!=',
        'LIKE',
        'IS',
        'IS NOT',
        'IN',
        'NOT IN',
      ].includes(operator.toUpperCase())
    ) {
      return `${fieldResult} ${operator} ${valueResult}`;
    }
    throw new Error(`Unsupported operator: ${operator}`);
  }

  build() {
    return this.buildSelectQuery(this.json);
  }
}
