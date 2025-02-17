import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { RuleDataAnomalyService } from './rule-data-anomaly.service';
import { AiRecommendationService } from '@/ai-recommendation/ai-recommendation.service';
import { RuleService } from '../rule/rule.service';
export declare class RuleDataAnomalyController {
    private readonly dataMigrationSchemaService;
    private readonly dataMigrationService;
    private readonly ruleDataAnomalyService;
    private readonly aiRecommendationService;
    private readonly ruleService;
    constructor(dataMigrationSchemaService: DataMigrationSchemaService, dataMigrationService: DataMigrationService, ruleDataAnomalyService: RuleDataAnomalyService, aiRecommendationService: AiRecommendationService, ruleService: RuleService);
    getRuleDataAnomaly(authedUser: IAuthedUser, migrationId: string, tableName: string, recordId: string): Promise<SuccessResponseObject>;
}
