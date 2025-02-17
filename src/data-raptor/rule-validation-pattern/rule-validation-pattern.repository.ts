import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ValidationPattern } from './rule-validation-pattern.entity';

@EntityRepository(ValidationPattern)
export class DataRaptorValidationPatternRepository extends BaseRepository<ValidationPattern> {}
