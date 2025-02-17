export declare enum AnomalyAnalysisModeEnum {
    FROM_RULE = "RULE",
    FROM_RECORD = "RECORDS"
}
export declare enum AnomalyRuleAction {
    APPLY = "apply",
    RE_APPLY = "re-apply",
    REMOVE = "remove"
}
export declare class AnomalyRuleApplierSQSMessageDto {
    tenantId: number;
    dataSourceId: string;
    migrationId: string;
    analysisMode: AnomalyAnalysisModeEnum;
    ruleAction?: AnomalyRuleAction;
    table: string;
    ruleId?: string;
    records?: string[];
}
