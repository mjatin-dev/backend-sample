import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleDepartment } from './rule-department.entity';

@EntityRepository(RuleDepartment)
export class RuleDepartmentRepository extends BaseRepository<RuleDepartment> {}
