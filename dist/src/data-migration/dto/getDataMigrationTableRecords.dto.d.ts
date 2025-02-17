import { Condition } from '../dto/condition.dto';
export interface OrderByOption {
    fieldName: string;
    order?: string;
}
export interface GetDataMigrationTableRecordsDto {
    conditions: Condition[];
    fields: string[];
    orderBy: OrderByOption[];
}
