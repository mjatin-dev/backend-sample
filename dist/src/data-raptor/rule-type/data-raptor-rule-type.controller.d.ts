import { RuleTypeService } from './rule-type.service';
import { SuccessResponseObject } from '@/common/http';
export declare class DataRaptorRuleTypeController {
    private readonly ruleTypeService;
    constructor(ruleTypeService: RuleTypeService);
    getRuleTypes(): Promise<SuccessResponseObject>;
}
