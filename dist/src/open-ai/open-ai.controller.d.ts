import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { OpenAIService } from './open-ai.service';
import { AISummaryRequestDto } from './dto/ai-summary.request.dto';
import { RuleService } from '@/data-raptor/rule/rule.service';
export declare class OpenAIController {
    private readonly openAIService;
    private readonly dataMigrationService;
    private readonly dataMigrationSchemaService;
    private readonly ruleService;
    constructor(openAIService: OpenAIService, dataMigrationService: DataMigrationService, dataMigrationSchemaService: DataMigrationSchemaService, ruleService: RuleService);
    getOpenAISummary(authedUser: IAuthedUser, body: AISummaryRequestDto): Promise<SuccessResponseObject>;
}
