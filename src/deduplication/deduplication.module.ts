import { Module } from '@nestjs/common';
import { DeduplicationConfigController } from './controllers/deduplication-config.controller';
import { DeduplicationConfigService } from './services/deduplication-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeDuplicationConfigRepository } from './repositories/deduplication-config.repository';
import { DataMigrationModule } from '@/data-migration/data-migration.module';
import { DeduplicationResultController } from './controllers/deduplication-result.controller';
import { DeduplicationResultService } from './services/deduplication-result.service';
import { DeduplicationResultRepository } from './repositories/deduplication-result.repository';
import { SalesforceModule } from '@/core/lib/salesforce/salesforce.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeDuplicationConfigRepository]),
    DataMigrationModule,
    SalesforceModule,
  ],
  controllers: [DeduplicationConfigController, DeduplicationResultController],
  providers: [
    DeduplicationConfigService,
    DeduplicationResultService,
    DeduplicationResultRepository,
  ],
})
export class DeduplicationModule {}
