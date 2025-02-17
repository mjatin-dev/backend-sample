"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAnomalyBuilder = void 0;
const ai_recommendation_types_1 = require("../../../ai-recommendation/ai-recommendation.types");
class DataAnomalyBuilder {
    static buildFromRules(rules, record, recordId) {
        const anomalies = [];
        for (const rule of rules) {
            const dataAnomalyRecord = {
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
                ai_recommendation_type: ai_recommendation_types_1.AI_RECOMMENDATION.DATA_VALIDATION,
            };
            anomalies.push(dataAnomalyRecord);
        }
        return anomalies;
    }
}
exports.DataAnomalyBuilder = DataAnomalyBuilder;
//# sourceMappingURL=DataAnomaliesBuilder.js.map