import { Module } from '@nestjs/common';
import { Office365Service } from './office365.service';
import { KmsModule } from '../aws/kms/kms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { IntegrationRepository } from '@/integration/integration.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IntegrationRepository,
      IntegrationStateRepository,
    ]),
    KmsModule,
  ],
  providers: [Office365Service],
  exports: [Office365Service],
})
export class Office365Module {}
