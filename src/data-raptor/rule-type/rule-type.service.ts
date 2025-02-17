import { FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { RuleType } from './rule-type.entity';
import { RuleTypeRepository } from './rule-type.repository';

@Injectable()
export class RuleTypeService {
  constructor(private readonly ruleTypeRepository: RuleTypeRepository) { }

  getRuleTypes(options: FindManyOptions<RuleType> = {}): Promise<RuleType[]> {
    return this.ruleTypeRepository.find(options)
  }
}
