import { IAuthedUser } from '@/auth/types';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { RecommendationActionDto, UpdateRecommendationFeedbackDto } from './dto/update-recommendation-feedback.dto';
import { AiRecommendationService } from './ai-recommendation.service';
import { SuccessResponseObject } from '@/common/http';
import { SalesforceSchemaService } from '@/core/lib/salesforce/salesforce-schema.service';
export declare class AiRecommendationController {
    private readonly dataMigrationService;
    private readonly aiRecommendationService;
    private readonly salesforceSchemaService;
    constructor(dataMigrationService: DataMigrationService, aiRecommendationService: AiRecommendationService, salesforceSchemaService: SalesforceSchemaService);
    updateFeedback(authedUser: IAuthedUser, body: UpdateRecommendationFeedbackDto, migrationId: string): Promise<SuccessResponseObject>;
    applyAction(authedUser: IAuthedUser, body: RecommendationActionDto, migrationId: string): Promise<SuccessResponseObject>;
}
