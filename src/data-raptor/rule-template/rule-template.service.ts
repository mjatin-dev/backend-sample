import { Injectable } from '@nestjs/common';
import { RuleTemplateRepository } from './rule-template.repository';
import { FindManyOptions } from 'typeorm';
import { RuleTemplate } from './rule-template.entity';

@Injectable()
export class RuleTemplateService {
  constructor(
    private readonly ruleTemplateRepository: RuleTemplateRepository,
  ) {}

  async findMany(options: FindManyOptions<RuleTemplate> = {}) {
    return await this.ruleTemplateRepository.find(options);
  }
}
