import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleTemplate } from './rule-template.entity';

@EntityRepository(RuleTemplate)
export class RuleTemplateRepository extends BaseRepository<RuleTemplate> {}
