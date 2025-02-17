import { DataSource } from '@/data-source/dataSource.entity';
export declare class RuleObjectTemplateRef {
    ruleObjectTemplateRefId: string;
    description: string;
    type: string;
    tableName: string;
    fieldName: string;
    context: string;
    dataSourceName: string;
    DataSourceObject: DataSource;
}
