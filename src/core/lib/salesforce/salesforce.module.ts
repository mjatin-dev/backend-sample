import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesforceAuthService } from './salesforce-auth.service';
import { SalesforceMergeService } from './salesforce-merge.service';
import { SalesforceSchemaService } from './salesforce-schema.service';
import { KmsModule } from '@/core/lib/aws/kms/kms.module';
import { IntegrationModule } from '@/integration/integration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      IntegrationRepository,
      IntegrationStateRepository,
    ]),
    KmsModule,
    forwardRef(() => IntegrationModule),
  ],
  providers: [
    SalesforceAuthService,
    SalesforceMergeService,
    SalesforceSchemaService,
  ],
  exports: [
    SalesforceAuthService,
    SalesforceMergeService,
    SalesforceSchemaService,
  ],
})
export class SalesforceModule {}
