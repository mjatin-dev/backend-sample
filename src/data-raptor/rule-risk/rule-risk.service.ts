import { Injectable } from '@nestjs/common';
import { RuleRiskRepository } from './rule-risk.repository';
import { RuleRisk } from './rule-risk.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class RuleRiskService {
  constructor(private readonly ruleRiskRepository: RuleRiskRepository) {}

  async findMany(options: FindManyOptions<RuleRisk>) {
    const ruleRisks = await this.ruleRiskRepository.find(options);
    return ruleRisks;
  }
}
