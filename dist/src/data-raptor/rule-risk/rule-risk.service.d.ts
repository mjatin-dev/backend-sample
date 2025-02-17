import { RuleRiskRepository } from './rule-risk.repository';
import { RuleRisk } from './rule-risk.entity';
import { FindManyOptions } from 'typeorm';
export declare class RuleRiskService {
    private readonly ruleRiskRepository;
    constructor(ruleRiskRepository: RuleRiskRepository);
    findMany(options: FindManyOptions<RuleRisk>): Promise<RuleRisk[]>;
}
