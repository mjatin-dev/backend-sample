import { RuleRiskService } from './rule-risk.service';
import { SuccessResponseObject } from '@/common/http';
export declare class DataRaptorRuleRiskController {
    private readonly ruleRiskService;
    constructor(ruleRiskService: RuleRiskService);
    getRulesByMigrationAndTableName(): Promise<SuccessResponseObject>;
}
