import { RuleDepartment } from '../rule-department/rule-department.entity';
import { DataSource } from '@/data-source/dataSource.entity';
import { RuleObjectTemplateRef } from './rule-object-template-ref.entity';
import { RuleType } from '../rule-type/rule-type.entity';
import { RuleRisk } from '../rule-risk/rule-risk.entity';
export declare class RuleTemplate {
    ruleTemplateId: string;
    name: string;
    table: string;
    description: string;
    ruleBody: any;
    frontEndRuleBody: any;
    context: string;
    violationScore: number;
    department: string;
    type: string;
    risk: string;
    dataSourceName: string;
    DepartmentObject: RuleDepartment;
    RiskObject: RuleRisk;
    DataSourceObject: DataSource;
    createdAt: Date;
    updatedAt: Date;
    ObjectReferences: RuleObjectTemplateRef[];
    TypeObject: RuleType;
    deletedAt: Date;
}
