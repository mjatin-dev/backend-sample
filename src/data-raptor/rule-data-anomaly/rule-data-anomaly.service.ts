import { Injectable } from '@nestjs/common';
import {
  GetDataAnomaliesParams,
  RuleDataAnomalyRepository,
} from './rule-data-anomaly.repository';

@Injectable()
export class RuleDataAnomalyService {
  constructor(
    private readonly ruleDataAnomalyRepository: RuleDataAnomalyRepository,
  ) {}

  async getDataAnomalies({
    tenantId,
    dataSourceId,
    tableName,
    recordId,
    ruleIds,
  }: GetDataAnomaliesParams) {
    return this.ruleDataAnomalyRepository.getDataAnomalies({
      tenantId,
      dataSourceId,
      tableName,
      recordId,
      ruleIds,
    });
  }
}
