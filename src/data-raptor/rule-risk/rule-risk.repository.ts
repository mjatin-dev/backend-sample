import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleRisk } from './rule-risk.entity';

@EntityRepository(RuleRisk)
export class RuleRiskRepository extends BaseRepository<RuleRisk> {}
