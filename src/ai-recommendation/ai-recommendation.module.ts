import { Module } from '@nestjs/common';
import { AiRecommendationService } from './ai-recommendation.service';
import { AiRecommendationController } from './ai-recommendation.controller';
import { DataMigrationModule } from '@/data-migration/data-migration.module';
import { SalesforceModule } from '@/core/lib/salesforce/salesforce.module';

@Module({
  imports: [DataMigrationModule, SalesforceModule],
  providers: [AiRecommendationService],
  exports: [AiRecommendationService],
  controllers: [AiRecommendationController],
})
export class AiRecommendationModule {}
