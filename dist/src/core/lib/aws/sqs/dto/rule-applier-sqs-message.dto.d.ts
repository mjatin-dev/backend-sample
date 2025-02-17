export declare class RuleApplierSqsMessageDto {
    userId: number;
    tenantId: number;
    migrationId: string;
    ruleIds: string[];
    action: RuleApplierActions;
}
export declare enum RuleApplierActions {
    APPLY = "apply",
    REMOVE = "remove",
    UPDATE = "update",
    RE_APPLY = "re-apply"
}
