import { RuleTemplateRepository } from './rule-template.repository';
import { FindManyOptions } from 'typeorm';
import { RuleTemplate } from './rule-template.entity';
export declare class RuleTemplateService {
    private readonly ruleTemplateRepository;
    constructor(ruleTemplateRepository: RuleTemplateRepository);
    findMany(options?: FindManyOptions<RuleTemplate>): Promise<RuleTemplate[]>;
}
