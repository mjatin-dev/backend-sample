import { Injectable } from '@nestjs/common';
import { RuleDepartmentRepository } from './rule-department.repository';
import { RuleDepartment } from './rule-department.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class RuleDepartmentService {
  constructor(
    private readonly ruleDepartmentRepository: RuleDepartmentRepository,
  ) {}

  async findMany(options: FindManyOptions<RuleDepartment>) {
    const ruleDepartments = await this.ruleDepartmentRepository.find(options);
    return ruleDepartments;
  }
}
