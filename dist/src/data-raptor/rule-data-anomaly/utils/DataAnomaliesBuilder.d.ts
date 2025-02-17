import { Rule } from '@/data-raptor/rule/rule.entity';
import { DataAnomalyRecord, MigrationTableRecord } from '../type';
export declare class DataAnomalyBuilder {
    static buildFromRules(rules: Rule[], record: MigrationTableRecord, recordId: string): DataAnomalyRecord[];
}
