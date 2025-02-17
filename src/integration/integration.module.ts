import { AuthModule } from '@/auth/auth.module';
import { GoogleModule } from '@/core/lib/google/google.module';
import { SalesforceModule } from '@/core/lib/salesforce/salesforce.module';
import { Office365Module } from '@/core/lib/office365/office365.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationStateRepository } from './integrationState.repository';
import { IntegrationController } from './integration.controller';
import { IntegrationRepository } from './integration.repository';
import { IntegrationService } from './integration.service';
import { UserRepository } from '@/user/repositories/user.repository';
import { TenantModule } from '@/tenant/tenant.module';
import { UserModule } from '@/user/user.module';
import { TenantRepository } from '@/tenant/repositories/tenant.repository';
import { DataSourceRepository } from '@/data-source/dataSource.repository';
import { DataMigrationRepository } from '@/data-migration/repositories/dataMigration.repository';
import { SqsModule } from '@/core/lib/aws/sqs/sqs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      IntegrationRepository,
      IntegrationStateRepository,
      TenantRepository,
      DataSourceRepository,
      DataMigrationRepository,
    ]),
    forwardRef(() => AuthModule),
    GoogleModule,
    TenantModule,
    forwardRef(() => SalesforceModule),
    forwardRef(() => UserModule),
    SqsModule,
    Office365Module,
  ],
  providers: [IntegrationService],
  controllers: [IntegrationController],
  exports: [IntegrationService],
})
export class IntegrationModule {}
