import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { APPLICATION_STATUS, ICallbackQueryParams } from '@/core/types';
import { Integration } from './integration.entity';
import { IntegrationRepository } from './integration.repository';
import { IntegrationStateRepository } from './integrationState.repository';
import { UserService } from '@/user/services/user.service';
import { TenantService } from '@/tenant/services/tenant.service';
import { AppIds } from '@/core/types';
import { UserType } from '@/user/types';
import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { IAuthedUser } from '@/auth/types';
import { GoogleAuthService } from '@/core/lib/google/google-auth.service';
import { SalesforceAuthService } from '@/core/lib/salesforce/salesforce-auth.service';
import { SuccessResponseObject } from '@/common/http';
import { DataSourceRepository } from '../data-source/dataSource.repository';
import { DataMigrationRepository } from '../data-migration/repositories/dataMigration.repository';
import { SQSMessageProducerService } from '../core/lib/aws/sqs/sqs-message-producer.service';
import { Office365Service } from '../core/lib/office365/office365.service';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationStateRepository: IntegrationStateRepository,
    private readonly dataSourceRepository: DataSourceRepository,
    private readonly dataMigrationRepository: DataMigrationRepository,
    private readonly sqsMessageProducerService: SQSMessageProducerService,
    private readonly office365Service: Office365Service,
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
    private googleAuthService: GoogleAuthService,
    @Inject(forwardRef(() => SalesforceAuthService))
    private salesforceAuthService: SalesforceAuthService,
  ) {}

  async handleAuthCallBack(
    authedUser: IAuthedUser,
    appId: AppIds,
    query: ICallbackQueryParams,
  ) {
    let triggerDataMigration = false;
    switch (appId) {
      case AppIds.GMAIL:
        await this.googleAuthService.handleAuthCallback(query, authedUser);
        break;
      case AppIds.SALESFORCE:
        await this.salesforceAuthService.handleAuthCallback(
          query,
          AppIds.SALESFORCE,
          authedUser,
        );
        break;
      case AppIds.SALESFORCE_USER:
        await this.salesforceAuthService.handleAuthCallback(
          query,
          AppIds.SALESFORCE_USER,
          authedUser,
        );
        break;
      case AppIds.OFFICE365:
        triggerDataMigration = true;
        await this.office365Service.handleAuthCallback(query, authedUser);
        break;
      default:
        throw new NotFoundException('integration callback not found');
    }

    if (triggerDataMigration) {
      const dataSource = await this.dataSourceRepository.findOne({
        where: { integrationId: appId },
      });

      if (!dataSource) {
        console.log('Data source not found');
        return;
      }

      const whereConditions = { dataSourceId: dataSource.dataSourceId };

      if (dataSource.type === 'tenant') {
        whereConditions['tenantId'] = authedUser.tenantId;
      } else {
        whereConditions['userId'] = authedUser.userId;
      }

      const dataMigration = await this.dataMigrationRepository.findOne({
        where: whereConditions,
      });

      if (dataMigration) {
        console.log('Data migration already exists');
        return;
      }

      const newMigrationPayload = {
        dataSourceId: dataSource.dataSourceId,
      };

      if (dataSource.type === 'user') {
        newMigrationPayload['userId'] = authedUser.userId;
      } else {
        newMigrationPayload['tenantId'] = authedUser.tenantId;
      }

      // Create data migration record
      const newMigrationBody =
        this.dataMigrationRepository.create(newMigrationPayload);

      const newMigration = await this.dataMigrationRepository.save(
        newMigrationBody,
      );

      await this.sqsMessageProducerService.sendDataSetQueueMessage({
        migrationId: newMigration.dataMigrationId,
        userId: authedUser.userId,
        tenantId: authedUser.tenantId,
        dataSourceId: dataSource.dataSourceId,
      });
    }
  }

  async handleAuthorize(
    authedUser: IAuthedUser,
    appId: AppIds,
    optionalArgs: any,
  ) {
    switch (appId) {
      case AppIds.GMAIL:
        const googleRedirectUrl = await this.googleAuthService.authorize(
          appId,
          authedUser,
        );
        return new SuccessResponseObject('success', googleRedirectUrl);
      case AppIds.SALESFORCE:
        const salesforceRedirectUrl =
          await this.salesforceAuthService.authorize(authedUser, optionalArgs);
        return new SuccessResponseObject('success', salesforceRedirectUrl);
      case AppIds.SALESFORCE_USER:
        const salesforceUserRedirectUrl =
          await this.salesforceAuthService.authorizeUserIntegration(
            authedUser,
            optionalArgs,
          );
        return new SuccessResponseObject('success', salesforceUserRedirectUrl);
      case AppIds.OFFICE365:
        const redirectUrl = await this.office365Service.authorize(authedUser);
        return new SuccessResponseObject('success', redirectUrl);
      default:
        throw new NotFoundException('Not implemented yet');
    }
  }

  async getIntegrationsApps(
    userId: number,
    tenantId: number,
  ): Promise<Integration[]> {
    const integrationsByUser =
      await this.integrationRepository.getIntegrationsWithStateByUser(userId);
    const integrationsByTenant =
      await this.integrationRepository.getIntegrationsWithStateByTenant(
        tenantId,
      );

    const allIntegrations = [...integrationsByUser, ...integrationsByTenant];

    return allIntegrations.map((integration) => {
      integration.applicationStatus = integration.integratedApps?.some(
        (app) => {
          return app.userId === userId || app.tenantId === tenantId;
        },
      )
        ? APPLICATION_STATUS.INSTALLED
        : APPLICATION_STATUS.NOT_INSTALLED;
      delete integration.integratedApps;
      return integration;
    });
  }

  async getIntegration(applicationId: AppIds) {
    const integration = await this.integrationRepository.findOne({
      where: { applicationId },
    });
    return integration;
  }

  async upgradeUserToTenantOwner(
    userId: number,
    contactInfo: ContactInfoDto,
    orgName: string,
  ) {
    const user = await this.userService.findOne({ userId: userId });
    if (user.userType !== UserType.TENANT_USER && !user.tenantId) {
      const tenant = await this.tenantService.create(
        {
          tenantName: orgName,
          billingContactInfo: contactInfo,
          contactInfo: contactInfo,
          ownerName: '',
          ownerEmail: '',
        },
        user,
      );
      await this.userService.update(userId, {
        tenantId: tenant.tenantId,
        userType: UserType.TENANT_USER,
      });
      return { tenantId: tenant.tenantId };
    }
    return { tenantId: user.tenantId };
  }

  async getIntegrationWithInstallStatus(
    applicationId: AppIds,
    userId: number,
    tenantId: number,
  ): Promise<Integration> {
    const integrationByUser =
      await this.integrationRepository.getOneIntegrationWithStateByUser(
        userId,
        applicationId,
      );
    const integrationByTenant =
      await this.integrationRepository.getOneIntegrationWithStateByTenant(
        tenantId,
        applicationId,
      );

    const integration =
      integrationByUser == null ? integrationByTenant : integrationByUser;
    if (!integration) throw new NotFoundException('Not integrated app yet');

    integration.applicationStatus = integration.integratedApps?.some(
      (app) => app.userId === userId || app.tenantId === tenantId,
    )
      ? APPLICATION_STATUS.INSTALLED
      : APPLICATION_STATUS.NOT_INSTALLED;
    delete integration.integratedApps;
    return integration;
  }

  async uninstall(
    appId: AppIds,
    userId: number,
    tenantId: number,
  ): Promise<void> {
    const integrationByUser =
      await this.integrationRepository.getOneIntegrationWithStateByUser(
        userId,
        appId,
      );

    const integrationByTenant =
      await this.integrationRepository.getOneIntegrationWithStateByTenant(
        tenantId,
        appId,
      );

    const integration =
      integrationByUser == null ? integrationByTenant : integrationByUser;

    if (
      !integration ||
      !integration?.integratedApps ||
      !integration?.integratedApps[0].id
    ) {
      throw new NotFoundException('Not integrated app yet');
    }

    await this.integrationStateRepository.delete(
      integration?.integratedApps[0].id,
    );

    const dataSource = await this.dataSourceRepository.findOne({
      where: { integrationId: integration.applicationId },
    });

    if (!dataSource) {
      return;
    }

    const whereConditions = { dataSourceId: dataSource.dataSourceId };

    if (dataSource.type === 'tenant') {
      whereConditions['tenantId'] = tenantId;
    } else {
      whereConditions['userId'] = userId;
    }

    const dataMigration = await this.dataMigrationRepository.findOne({
      where: whereConditions,
    });

    if (!dataMigration) {
      return;
    }

    await this.sqsMessageProducerService.sendDataMigrationRemovalQueueMessage({
      migrationId: dataMigration.dataMigrationId,
      userOrTenantId:
        dataSource.type === 'tenant' ? tenantId.toString() : userId.toString(),
      dataSourceId: dataSource.dataSourceId,
    });
  }
}
