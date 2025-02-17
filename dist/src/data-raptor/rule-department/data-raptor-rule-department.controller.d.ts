import { RuleDepartmentService } from './rule-department.service';
import { SuccessResponseObject } from '@/common/http';
export declare class DataRaptorRuleDepartmentController {
    private readonly ruleDepartmentService;
    constructor(ruleDepartmentService: RuleDepartmentService);
    getRulesByMigrationAndTableName(): Promise<SuccessResponseObject>;
}
