import { FindManyOptions } from 'typeorm';
import { RuleType } from './rule-type.entity';
import { RuleTypeRepository } from './rule-type.repository';
export declare class RuleTypeService {
    private readonly ruleTypeRepository;
    constructor(ruleTypeRepository: RuleTypeRepository);
    getRuleTypes(options?: FindManyOptions<RuleType>): Promise<RuleType[]>;
}
