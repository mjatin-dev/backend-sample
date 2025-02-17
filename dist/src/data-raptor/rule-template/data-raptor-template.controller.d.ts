import { SuccessResponseObject } from '@/common/http';
import { RuleTemplateService } from './rule-template.service';
export declare class DataRaptorTemplateController {
    private readonly ruleTemplateService;
    constructor(ruleTemplateService: RuleTemplateService);
    getRuleTemplates(dataSourceName: string): Promise<SuccessResponseObject>;
}
