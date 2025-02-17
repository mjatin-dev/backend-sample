import { Rule } from '@/data-raptor/rule/rule.entity';
import { DataAnomalyRecord, MigrationTableRecord } from '../type';
import { AI_RECOMMENDATION } from '@/ai-recommendation/ai-recommendation.types';

export class DataAnomalyBuilder {
  static buildFromRules(
    rules: Rule[],
    record: MigrationTableRecord,
    recordId: string,
  ): DataAnomalyRecord[] {
    const anomalies = [];
    for (const rule of rules) {
      const dataAnomalyRecord: DataAnomalyRecord = {
        id: `${rule.ruleId}-${recordId}`,
        table_name: record.table,
        record_id: record.id,
        rule_id: rule.ruleId,
        record: record,
        anomalyType: rule.type,
        details: {
          detail: [],
        },
        ai_recommendations: {},
        ai_recommendation_type: AI_RECOMMENDATION.DATA_VALIDATION,
      };
      anomalies.push(dataAnomalyRecord);
    }
    return anomalies;
  }
}
