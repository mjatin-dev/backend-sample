import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { In } from 'typeorm';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { DataAnomalyRecord, MigrationTableRecord } from './type';
import { RuleDataAnomalyService } from './rule-data-anomaly.service';
import {
  AIRecommendation,
  AI_RECOMMENDATION,
} from '@/ai-recommendation/ai-recommendation.types';
import { AiRecommendationService } from '@/ai-recommendation/ai-recommendation.service';
import { RuleService } from '../rule/rule.service';
import { DataAnomalyBuilder } from './utils/DataAnomaliesBuilder';
import { RuleTypeEnum } from '../types';

@ApiTags('DataRaptorRuleDataAnomaly')
@UseGuards(AuthGuard('jwt'))
@Controller('data-raptor-rule-data-anomaly')
export class RuleDataAnomalyController {
  constructor(
    private readonly dataMigrationSchemaService: DataMigrationSchemaService,
    private readonly dataMigrationService: DataMigrationService,
    private readonly ruleDataAnomalyService: RuleDataAnomalyService,
    private readonly aiRecommendationService: AiRecommendationService,
    private readonly ruleService: RuleService,
  ) {}

  @Get('/migration/:migrationId/table/:tableName/record/:recordId')
  async getRuleDataAnomaly(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableName') tableName: string,
    @Param('recordId') recordId: string,
  ) {
    const tenantId = authedUser.tenantId;

    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const record: MigrationTableRecord =
      await this.dataMigrationSchemaService.getMigrationRecord(
        tenantId,
        migration.dataSourceId,
        tableName,
        recordId,
      );

    if (!record) {
      throw new BadRequestException('Record not found!');
    }

    const rulesApplied = record.rules_applied;
    const ruleIds = Object.keys(rulesApplied || {});

    let dataAnomalies: DataAnomalyRecord[] = [];
    let aiRecommendations: AIRecommendation[] = [];

    if (ruleIds.length > 0) {
      // Data Quality Anomalies
      let dataQualityAnomalies =
        await this.ruleDataAnomalyService.getDataAnomalies({
          tenantId,
          dataSourceId: migration.dataSourceId,
          tableName,
          recordId,
          ruleIds,
        });

      dataQualityAnomalies = dataQualityAnomalies.map((anomaly) => ({
        ...anomaly,
        anomalyType: RuleTypeEnum.AnomalyDetection,
        ai_recommendation_type: AI_RECOMMENDATION.DATA_ANOMALY,
      }));

      // Data Validation Anomalies
      const dataQualityAnomaliesRuleIds = dataQualityAnomalies.map(
        (anomaly) => anomaly.rule_id,
      );

      const dataValidationRuleIds = ruleIds.filter(
        (ruleId) => !dataQualityAnomaliesRuleIds.includes(ruleId),
      );

      const rules = await this.ruleService.findMany({
        where: { ruleId: In(dataValidationRuleIds) },
      });

      const dataValidationAnomalies = DataAnomalyBuilder.buildFromRules(
        rules,
        record,
        record.Id,
      );

      dataAnomalies = [...dataQualityAnomalies, ...dataValidationAnomalies];

      const keys = dataAnomalies.map(
        (anomaly) =>
          `${tableName}#${recordId}#${anomaly.rule_id}#${
            anomaly.ai_recommendation_type || AI_RECOMMENDATION.DATA_ANOMALY
          }`,
      );

      aiRecommendations =
        await this.aiRecommendationService.getAiRecommendationByIds(
          tenantId,
          migration.dataSourceId,
          keys,
          record['LastModifiedDate'] || record['SystemModstamp'] || undefined,
        );
    }

    return new SuccessResponseObject('Record Retrieved successfully', {
      anomalies: dataAnomalies || [],
      aiRecommendations: aiRecommendations || [],
    });
  }
}
