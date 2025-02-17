import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleType } from './rule-type.entity';

@EntityRepository(RuleType)
export class RuleTypeRepository extends BaseRepository<RuleType> {}
