import { RuleDepartmentRepository } from './rule-department.repository';
import { RuleDepartment } from './rule-department.entity';
import { FindManyOptions } from 'typeorm';
export declare class RuleDepartmentService {
    private readonly ruleDepartmentRepository;
    constructor(ruleDepartmentRepository: RuleDepartmentRepository);
    findMany(options: FindManyOptions<RuleDepartment>): Promise<RuleDepartment[]>;
}
