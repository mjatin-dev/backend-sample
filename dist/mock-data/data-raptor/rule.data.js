"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformedRuleWithSubQueries = exports.ruleWithSubQueries = void 0;
exports.ruleWithSubQueries = {
    name: 'Test SubQueries',
    table: 'Account',
    violationScore: 2,
    active: true,
    description: '',
    type: 'data-validation',
    department: 'sales',
    risk: 'low',
    frontEndObject: {
        ruleName: 'Test SubQueries',
        violationScore: 2,
        department: 'sales',
        description: '',
        category: 'data-validation',
        riskLevel: 'low',
        subQueries: [
            {
                alias: 'OpportunitiesNamesNotNull',
                table: 'Opportunity',
                where: [
                    {
                        type: 'ROOT_CONDITIONAL',
                        field: {
                            type: 'FIELD_REFERENCE',
                            value: 'Name',
                        },
                        operator: '!=',
                        value: {
                            type: 'PRIMITIVE_VALUE',
                            value: 'Null',
                            format: 'null',
                        },
                    },
                ],
            },
            {
                alias: 'UseNotEqualToOpportunityNames',
                table: 'User',
                where: [
                    {
                        type: 'ROOT_CONDITIONAL',
                        field: {
                            type: 'FIELD_REFERENCE',
                            value: 'Name',
                        },
                        operator: 'NOT IN',
                        value: {
                            type: 'SUB_QUERY_VALUE',
                            subQueryId: 'OpportunitiesNamesNotNull',
                            value: 'Name',
                        },
                    },
                ],
            },
        ],
        where: [
            {
                field: {
                    type: 'FIELD_REFERENCE',
                    value: 'Name',
                },
                operator: 'NOT IN',
                value: {
                    type: 'SUB_QUERY_VALUE',
                    subQueryId: 'UseNotEqualToOpportunityNames',
                    value: 'Name',
                },
                type: 'ROOT_CONDITIONAL',
            },
        ],
        having: [],
    },
    rule: {
        table: 'Account',
        subQueries: [
            {
                alias: 'OpportunitiesNamesNotNull',
                table: 'Opportunity',
                where: [
                    {
                        type: 'ROOT_CONDITIONAL',
                        field: {
                            type: 'FIELD_REFERENCE',
                            value: 'Name',
                        },
                        operator: '!=',
                        value: {
                            type: 'PRIMITIVE_VALUE',
                            value: 'Null',
                            format: 'null',
                        },
                    },
                ],
            },
            {
                alias: 'UseNotEqualToOpportunityNames',
                table: 'User',
                where: [
                    {
                        type: 'ROOT_CONDITIONAL',
                        field: {
                            type: 'FIELD_REFERENCE',
                            value: 'Name',
                        },
                        operator: 'NOT IN',
                        value: {
                            type: 'SUB_QUERY_VALUE',
                            subQueryId: 'OpportunitiesNamesNotNull',
                            value: 'Name',
                        },
                    },
                ],
            },
        ],
        where: [
            {
                field: {
                    type: 'FIELD_REFERENCE',
                    value: 'Name',
                },
                operator: 'NOT IN',
                value: {
                    type: 'SUB_QUERY_VALUE',
                    subQueryId: 'UseNotEqualToOpportunityNames',
                    value: 'Name',
                },
                type: 'ROOT_CONDITIONAL',
            },
        ],
    },
};
exports.transformedRuleWithSubQueries = {
    table: 'Account',
    subQueries: [
        {
            alias: 'OpportunitiesNamesNotNull',
            table: 'Opportunity',
            where: [
                {
                    type: 'ROOT_CONDITIONAL',
                    field: {
                        type: 'FIELD_REFERENCE',
                        value: 'Opportunity."Name"',
                    },
                    operator: 'IS NOT',
                    value: {
                        type: 'PRIMITIVE_VALUE',
                        value: 'Null',
                        format: 'null',
                    },
                },
            ],
        },
        {
            alias: 'UseNotEqualToOpportunityNames',
            table: 'User',
            where: [
                {
                    type: 'ROOT_CONDITIONAL',
                    field: {
                        type: 'FIELD_REFERENCE',
                        value: 'User."Name"',
                    },
                    operator: 'NOT IN',
                    value: {
                        type: 'SUB_QUERY_VALUE',
                        subQueryId: 'OpportunitiesNamesNotNull',
                        value: 'Name',
                    },
                },
            ],
        },
    ],
    where: [
        {
            field: {
                type: 'FIELD_REFERENCE',
                value: 'Account."Name"',
            },
            operator: 'NOT IN',
            value: {
                type: 'SUB_QUERY_VALUE',
                subQueryId: 'UseNotEqualToOpportunityNames',
                value: 'Name',
            },
            type: 'ROOT_CONDITIONAL',
        },
    ],
    join: [],
};
//# sourceMappingURL=rule.data.js.map