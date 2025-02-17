import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import {
  RecommendationActionDto,
  UpdateRecommendationFeedbackDto,
} from './dto/update-recommendation-feedback.dto';
import { AiRecommendationService } from './ai-recommendation.service';
import { SuccessResponseObject } from '@/common/http';
import { AI_RECOMMENDATION } from './ai-recommendation.types';
import { SalesforceSchemaService } from '@/core/lib/salesforce/salesforce-schema.service';

@ApiTags('DataRaptorRule')
@Controller('ai-recommendation')
@UseGuards(AuthGuard('jwt'))
export class AiRecommendationController {
  constructor(
    private readonly dataMigrationService: DataMigrationService,
    private readonly aiRecommendationService: AiRecommendationService,
    private readonly salesforceSchemaService: SalesforceSchemaService,
  ) {}

  @Put('migration/:migrationId/feedback')
  async updateFeedback(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: UpdateRecommendationFeedbackDto,
    @Param('migrationId') migrationId: string,
  ) {
    const { tenantId } = authedUser;

    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    await this.aiRecommendationService.updateAiRecommendationFeedBack(
      tenantId,
      migration.dataSourceId,
      body.id,
      body.liked,
    );

    return new SuccessResponseObject('Feedback updated');
  }

  @Put('migration/:migrationId/action')
  async applyAction(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: RecommendationActionDto,
    @Param('migrationId') migrationId: string,
  ) {
    const { tenantId } = authedUser;
    const { action, fieldName, recommendationId, value } = body;

    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const recommendations =
      await this.aiRecommendationService.getAiRecommendationById(
        tenantId,
        migration.dataSourceId,
        recommendationId,
      );
    const recommendation = recommendations[0];

    if (!recommendation) {
      throw new BadRequestException('Recommendation not found!');
    }

    if (action === 'accept') {
      await this.salesforceSchemaService.updateObjectRecord(
        authedUser,
        recommendation.table_name,
        recommendation.record_id,
        { [fieldName]: value },
      );
    } else {
      throw new BadRequestException('Invalid action');
    }
    return new SuccessResponseObject('Action applied');
  }
}
