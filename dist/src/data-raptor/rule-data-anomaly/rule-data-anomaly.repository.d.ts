import { DataAnomalyRecord } from './type';
export interface GetDataAnomaliesParams {
    tenantId: number;
    dataSourceId: string;
    tableName: string;
    recordId: string;
    ruleIds: string[];
}
export declare class RuleDataAnomalyRepository {
    getDataAnomalies({ tenantId, dataSourceId, tableName, recordId, ruleIds, }: GetDataAnomaliesParams): Promise<DataAnomalyRecord[]>;
}
