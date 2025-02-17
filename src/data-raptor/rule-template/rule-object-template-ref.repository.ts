import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleObjectTemplateRef } from './rule-object-template-ref.entity';

@EntityRepository(RuleObjectTemplateRef)
export class RuleObjectTemplateRefRepository extends BaseRepository<RuleObjectTemplateRef> {}
