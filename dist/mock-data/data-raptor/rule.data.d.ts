export declare const ruleWithSubQueries: {
    name: string;
    table: string;
    violationScore: number;
    active: boolean;
    description: string;
    type: string;
    department: string;
    risk: string;
    frontEndObject: {
        ruleName: string;
        violationScore: number;
        department: string;
        description: string;
        category: string;
        riskLevel: string;
        subQueries: ({
            alias: string;
            table: string;
            where: {
                type: string;
                field: {
                    type: string;
                    value: string;
                };
                operator: string;
                value: {
                    type: string;
                    value: string;
                    format: string;
                };
            }[];
        } | {
            alias: string;
            table: string;
            where: {
                type: string;
                field: {
                    type: string;
                    value: string;
                };
                operator: string;
                value: {
                    type: string;
                    subQueryId: string;
                    value: string;
                };
            }[];
        })[];
        where: {
            field: {
                type: string;
                value: string;
            };
            operator: string;
            value: {
                type: string;
                subQueryId: string;
                value: string;
            };
            type: string;
        }[];
        having: any[];
    };
    rule: {
        table: string;
        subQueries: ({
            alias: string;
            table: string;
            where: {
                type: string;
                field: {
                    type: string;
                    value: string;
                };
                operator: string;
                value: {
                    type: string;
                    value: string;
                    format: string;
                };
            }[];
        } | {
            alias: string;
            table: string;
            where: {
                type: string;
                field: {
                    type: string;
                    value: string;
                };
                operator: string;
                value: {
                    type: string;
                    subQueryId: string;
                    value: string;
                };
            }[];
        })[];
        where: {
            field: {
                type: string;
                value: string;
            };
            operator: string;
            value: {
                type: string;
                subQueryId: string;
                value: string;
            };
            type: string;
        }[];
    };
};
export declare const transformedRuleWithSubQueries: {
    table: string;
    subQueries: ({
        alias: string;
        table: string;
        where: {
            type: string;
            field: {
                type: string;
                value: string;
            };
            operator: string;
            value: {
                type: string;
                value: string;
                format: string;
            };
        }[];
    } | {
        alias: string;
        table: string;
        where: {
            type: string;
            field: {
                type: string;
                value: string;
            };
            operator: string;
            value: {
                type: string;
                subQueryId: string;
                value: string;
            };
        }[];
    })[];
    where: {
        field: {
            type: string;
            value: string;
        };
        operator: string;
        value: {
            type: string;
            subQueryId: string;
            value: string;
        };
        type: string;
    }[];
    join: any[];
};
