import { AI_RECOMMENDATION } from '@/ai-recommendation/ai-recommendation.types';
import { RuleTypeEnum } from '../types';
export interface MigrationTableRecord {
    [x: string]: any;
    rules_applied: {
        [ruleId: string]: {
            rule_name: string;
            violation_score: number;
        };
    };
}
interface DataAnomalyDetail {
    detail: {
        field: string;
        value: string;
        description: string;
    }[];
}
export interface DataAnomalyRecord {
    id: string;
    table_name: string;
    record_id: string;
    rule_id: string;
    anomalyType?: RuleTypeEnum | string;
    record: {
        [x: string]: any;
    };
    details: DataAnomalyDetail;
    ai_recommendations: {
        [x: string]: any;
    };
    ai_recommendation_type?: AI_RECOMMENDATION;
}
export {};
