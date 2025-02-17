"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleFormatter = void 0;
const Enums_1 = require("../rule/dto/Enums");
const uuid_1 = require("uuid");
class RuleFormatter {
    static getFormattedTemporalTableName(name) {
        return `temp_${name.replaceAll(' ', '_').substring(0, 50)}_${(0, uuid_1.v4)().split('-')[0]}`;
    }
    static getFormattedRule(tenantId, dataSource, rule) {
        const ruleClone = JSON.parse(JSON.stringify(rule));
        const schema = `mig_${tenantId}_${dataSource}`.replace(/(\-)/g, '_');
        const tableNames = new Set();
        tableNames.add(ruleClone.table);
        ruleClone.table = `${schema}."${ruleClone.table}" ${ruleClone.table}`;
        const subQueriesFormatted = this._getSubQueriesFormatted(ruleClone, schema);
        ruleClone.subQueries = subQueriesFormatted || [];
        if (ruleClone.join) {
            ruleClone.join = ruleClone.join.map((join) => {
                return Object.assign(Object.assign({}, join), { table: `${schema}.${join.table}` });
            });
        }
        let ruleJsonString = JSON.stringify(ruleClone);
        tableNames.forEach((tableName) => {
            const postfix = (0, uuid_1.v4)().split('-')[0];
            ruleJsonString = this._applyFieldRegex(ruleJsonString, tableName, `"${tableName}${postfix}.`);
            ruleJsonString = this._applyAliasRegex(ruleJsonString, tableName, ` ${tableName}${postfix}"`);
        });
        return JSON.parse(ruleJsonString);
    }
    static _getSubQueriesFormatted(ruleClone, schema) {
        const subQueries = ruleClone.subQueries || [];
        return subQueries === null || subQueries === void 0 ? void 0 : subQueries.map((subQuery, index) => {
            const postfix = `sub${(0, uuid_1.v4)().split('-')[0]}`;
            const table = subQuery.table;
            ruleClone.subQueries[index].table = `${schema}."${subQuery.table}" ${table}${postfix}`;
            const subQueryString = JSON.stringify(ruleClone.subQueries[index]);
            const subQueryStringFormatted = this._applyFieldRegex(subQueryString, table, `"${table}${postfix}.`);
            return JSON.parse(subQueryStringFormatted);
        });
    }
    static _applyFieldRegex(jsonString, tableName, replaceWith) {
        const fieldRegex = new RegExp(`(\\"${tableName}\\\.)`, 'g');
        return jsonString.replace(fieldRegex, replaceWith);
    }
    static _applyAliasRegex(jsonString, tableName, replaceWith) {
        const tableAliasRegex = new RegExp(`( ${tableName}\\")`, 'g');
        return jsonString.replace(tableAliasRegex, replaceWith);
    }
    static getTableDependencies(rule) {
        const dependencies = new Set();
        dependencies.add(rule.table);
        if (rule.where) {
            rule.where.forEach((condition) => {
                if (condition.type === Enums_1.RuleComponentType.ROOT_CONDITIONAL) {
                    RuleFormatter.processRootConditionDependencies(condition, dependencies);
                }
            });
        }
        if (rule.having) {
            rule.having.forEach((condition) => {
                if (condition.type === Enums_1.RuleComponentType.ROOT_CONDITIONAL) {
                    RuleFormatter.processRootConditionDependencies(condition, dependencies);
                }
            });
        }
        return Array.from(dependencies);
    }
    static processRootConditionDependencies(rootCondition, dependencies) {
        if (rootCondition.field.type === Enums_1.RuleComponentType.LOOKUP_VALUE) {
            RuleFormatter.processLookUpValueConditionDependencies(rootCondition.field, dependencies);
        }
        if (rootCondition.value.type === Enums_1.RuleComponentType.LOOKUP_VALUE) {
            RuleFormatter.processLookUpValueConditionDependencies(rootCondition.value, dependencies);
        }
        if (rootCondition.field.type === Enums_1.RuleComponentType.FUNCTION_VALUE) {
            RuleFormatter.processFunctionValueDependencies(rootCondition.field, dependencies);
        }
        if (rootCondition.value.type === Enums_1.RuleComponentType.FUNCTION_VALUE) {
            RuleFormatter.processFunctionValueDependencies(rootCondition.value, dependencies);
        }
    }
    static processFunctionValueDependencies(functionValue, dependencies) {
        functionValue.value.forEach((value) => {
            if (value.type === Enums_1.RuleComponentType.LOOKUP_VALUE) {
                const lookUpValue = value;
                RuleFormatter.processLookUpValueConditionDependencies(lookUpValue, dependencies);
            }
        });
    }
    static processLookUpValueConditionDependencies(lookUpValue, set) {
        const lookUpComponents = lookUpValue.value;
        lookUpComponents.forEach((component) => {
            if (component.type === Enums_1.RuleComponentType.LOOKUP_TABLE) {
                const lookUpTable = component;
                if (lookUpTable.table)
                    set.add(lookUpTable.table);
                if (lookUpTable.referenceTable)
                    set.add(lookUpTable.referenceTable);
            }
        });
    }
}
exports.RuleFormatter = RuleFormatter;
//# sourceMappingURL=RuleFormatter.js.map