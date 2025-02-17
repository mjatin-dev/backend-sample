import { getConnection } from 'typeorm';
import { DataAnomalyRecord } from './type';
import { Injectable } from '@nestjs/common';

export interface GetDataAnomaliesParams {
  tenantId: number;
  dataSourceId: string;
  tableName: string;
  recordId: string;
  ruleIds: string[];
}

@Injectable()
export class RuleDataAnomalyRepository {
  async getDataAnomalies({
    tenantId,
    dataSourceId,
    tableName,
    recordId,
    ruleIds,
  }: GetDataAnomaliesParams): Promise<DataAnomalyRecord[]> {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const anomalyIds = ruleIds.map(
      (ruleId) => `${tableName}_${recordId}_${ruleId}`,
    );

    const query = `
      SELECT *
      FROM "${schemaName}".cc_anomaly_result
      WHERE "id" = ANY($1)
    `;

    return getConnection().query(query, [anomalyIds]);
  }
}
