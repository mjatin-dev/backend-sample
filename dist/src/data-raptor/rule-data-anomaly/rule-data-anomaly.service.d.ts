import { GetDataAnomaliesParams, RuleDataAnomalyRepository } from './rule-data-anomaly.repository';
export declare class RuleDataAnomalyService {
    private readonly ruleDataAnomalyRepository;
    constructor(ruleDataAnomalyRepository: RuleDataAnomalyRepository);
    getDataAnomalies({ tenantId, dataSourceId, tableName, recordId, ruleIds, }: GetDataAnomaliesParams): Promise<import("./type").DataAnomalyRecord[]>;
}
