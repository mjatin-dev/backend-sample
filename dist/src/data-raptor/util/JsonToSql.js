"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonToSql = exports.SpecialFunctions = void 0;
const Enums_1 = require("../rule/dto/Enums");
var SpecialFunctions;
(function (SpecialFunctions) {
    SpecialFunctions["DAYS_SINCE"] = "DAYS_SINCE";
})(SpecialFunctions = exports.SpecialFunctions || (exports.SpecialFunctions = {}));
class JsonToSql {
    constructor(json) {
        this.json = json;
    }
    buildSelectQuery(json) {
        const { table, fields = ['*'], where, join, having, subQueries, limit, } = json;
        let { groupBy } = json;
        if (groupBy && Array.isArray(groupBy) && groupBy.length > 0) {
            groupBy = this.buildGroupBy(groupBy);
        }
        let sql = `SELECT ${fields.join(', ')} FROM ${table}`;
        if (join && Array.isArray(join) && join.length > 0) {
            join.forEach((j) => {
                sql += ` ${j.type.toUpperCase()} JOIN ${j.table} ON ${this.buildCondition([j.condition])}`;
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
                .map((subQuery) => `${subQuery.alias} AS (${this.buildSelectQuery(subQuery)})`)
                .join(',');
            sql = `WITH ${subQueriesSqlString}${sql}`;
        }
        if (limit) {
            sql += ` LIMIT ${limit}`;
        }
        return sql;
    }
    buildGroupBy(groupBy) {
        return groupBy.map((field) => {
            if (field.includes('.') && !field.includes('"')) {
                const fieldComponent = field.split('.');
                return `${fieldComponent[0]}."${fieldComponent[1]}"`;
            }
            return field;
        });
    }
    buildCondition(where) {
        const conditions = [];
        for (const obj of where) {
            if (obj.type) {
                switch (obj.type) {
                    case Enums_1.RuleComponentType.LOGICAL_OPERATOR:
                        conditions.push(obj.value.toUpperCase() || 'AND');
                        break;
                    case Enums_1.RuleComponentType.OPEN_PARENTHESIS:
                        conditions.push('(');
                        break;
                    case Enums_1.RuleComponentType.CLOSED_PARENTHESIS:
                        conditions.push(')');
                        break;
                    case Enums_1.RuleComponentType.ROOT_CONDITIONAL:
                        conditions.push(this.buildRootCondition(obj));
                        break;
                    default:
                        break;
                }
            }
        }
        return conditions.join(' ');
    }
    getPrimitiveStringValue(primitiveValue) {
        if (['NULL', 'TRUE', 'FALSE'].includes(String(primitiveValue.value).toUpperCase())) {
            return `${primitiveValue.value}`;
        }
        else {
            return `'${primitiveValue.value}'`;
        }
    }
    getFieldReferenceStringValue(fieldReference) {
        var _a;
        const fieldComponent = fieldReference.value.split('.');
        if ((_a = fieldComponent[1]) === null || _a === void 0 ? void 0 : _a.includes('"')) {
            return `${fieldComponent[0]}.${fieldComponent[1]}`;
        }
        return `${fieldComponent[0]}."${fieldComponent[1]}"`;
    }
    getDaysSinceFunctionStringValue(functionValue) {
        const { function: _functionName, numberOfParams, value } = functionValue;
        const date = this.handleConditionalValue(value[0]);
        return `now()::DATE - ${date}::DATE`;
    }
    getFunctionValueStringValue(functionValue) {
        const { function: functionName, numberOfParams, value } = functionValue;
        if (functionName === SpecialFunctions.DAYS_SINCE) {
            return this.getDaysSinceFunctionStringValue(functionValue);
        }
        const paramStringValues = value
            .map((conditionalValue) => this.handleConditionalValue(conditionalValue))
            .join(', ');
        return `${functionName}(${paramStringValues})`;
    }
    getSubQueryValueStringValue(subQueryValue) {
        const { subQueryId, value } = subQueryValue;
        return `(SELECT "${value}" FROM ${subQueryId})`;
    }
    handleConditionalValue(conditionalValue) {
        if (conditionalValue.type === Enums_1.RuleComponentType.PRIMITIVE_VALUE) {
            return this.getPrimitiveStringValue(conditionalValue);
        }
        if (conditionalValue.type === Enums_1.RuleComponentType.FIELD_REFERENCE) {
            return this.getFieldReferenceStringValue(conditionalValue);
        }
        if (conditionalValue.type === Enums_1.RuleComponentType.FUNCTION_VALUE) {
            return this.getFunctionValueStringValue(conditionalValue);
        }
        if (conditionalValue.type === Enums_1.RuleComponentType.SUB_QUERY_VALUE) {
            return this.getSubQueryValueStringValue(conditionalValue);
        }
        return '';
    }
    buildRootCondition(condition) {
        const { field, operator, value } = condition;
        const fieldResult = this.handleConditionalValue(field);
        const valueResult = this.handleConditionalValue(value);
        if ([
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
        ].includes(operator.toUpperCase())) {
            return `${fieldResult} ${operator} ${valueResult}`;
        }
        throw new Error(`Unsupported operator: ${operator}`);
    }
    build() {
        return this.buildSelectQuery(this.json);
    }
}
exports.JsonToSql = JsonToSql;
//# sourceMappingURL=JsonToSql.js.map