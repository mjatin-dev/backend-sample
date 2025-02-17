import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataMigrationRepository } from './repositories/dataMigration.repository';
import { DataMigrationSchemaRepository } from './repositories/dataMigrationSchema.repository';
import { DataMigrationSchemaObjectRepository } from './repositories/dataMigrationSchemaObject.repository';
import { DataMigrationEventBusIntegrationRepository } from './repositories/dataMigrationEventBusIntegration.repository';
import { DataMigrationController } from './data-migration.controller';
import { DataMigrationService } from './services/data-migration.service';
import { DataSourceModule } from '@/data-source/data-source.module';
import { SqsModule } from '@/core/lib/aws/sqs/sqs.module';
import { DataMigrationSchemaService } from './services/data-migration-schema.service';
import { SalesforceModule } from '@/core/lib/salesforce/salesforce.module';

@Module({
  imports: [
    DataSourceModule,
    TypeOrmModule.forFeature([
      DataMigrationRepository,
      DataMigrationSchemaObjectRepository,
      DataMigrationEventBusIntegrationRepository,
    ]),
    SqsModule,
    SalesforceModule,
  ],
  controllers: [DataMigrationController],
  providers: [
    DataMigrationService,
    DataMigrationSchemaService,
    DataMigrationSchemaRepository,
  ],
  exports: [
    DataMigrationService,
    DataMigrationSchemaService,
    DataMigrationSchemaRepository,
  ],
})
export class DataMigrationModule {}
