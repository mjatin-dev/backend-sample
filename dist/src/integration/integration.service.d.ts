import { ICallbackQueryParams } from '@/core/types';
import { Integration } from './integration.entity';
import { IntegrationRepository } from './integration.repository';
import { IntegrationStateRepository } from './integrationState.repository';
import { UserService } from '@/user/services/user.service';
import { TenantService } from '@/tenant/services/tenant.service';
import { AppIds } from '@/core/types';
import { ContactInfoDto } from '@/user/dto/create-contactInfo.request.dto';
import { IAuthedUser } from '@/auth/types';
import { GoogleAuthService } from '@/core/lib/google/google-auth.service';
import { SalesforceAuthService } from '@/core/lib/salesforce/salesforce-auth.service';
import { SuccessResponseObject } from '@/common/http';
import { DataSourceRepository } from '../data-source/dataSource.repository';
import { DataMigrationRepository } from '../data-migration/repositories/dataMigration.repository';
import { SQSMessageProducerService } from '../core/lib/aws/sqs/sqs-message-producer.service';
import { Office365Service } from '../core/lib/office365/office365.service';
export declare class IntegrationService {
    private readonly integrationRepository;
    private readonly integrationStateRepository;
    private readonly dataSourceRepository;
    private readonly dataMigrationRepository;
    private readonly sqsMessageProducerService;
    private readonly office365Service;
    private readonly userService;
    private readonly tenantService;
    private googleAuthService;
    private salesforceAuthService;
    constructor(integrationRepository: IntegrationRepository, integrationStateRepository: IntegrationStateRepository, dataSourceRepository: DataSourceRepository, dataMigrationRepository: DataMigrationRepository, sqsMessageProducerService: SQSMessageProducerService, office365Service: Office365Service, userService: UserService, tenantService: TenantService, googleAuthService: GoogleAuthService, salesforceAuthService: SalesforceAuthService);
    handleAuthCallBack(authedUser: IAuthedUser, appId: AppIds, query: ICallbackQueryParams): Promise<void>;
    handleAuthorize(authedUser: IAuthedUser, appId: AppIds, optionalArgs: any): Promise<SuccessResponseObject>;
    getIntegrationsApps(userId: number, tenantId: number): Promise<Integration[]>;
    getIntegration(applicationId: AppIds): Promise<Integration>;
    upgradeUserToTenantOwner(userId: number, contactInfo: ContactInfoDto, orgName: string): Promise<{
        tenantId: number;
    }>;
    getIntegrationWithInstallStatus(applicationId: AppIds, userId: number, tenantId: number): Promise<Integration>;
    uninstall(appId: AppIds, userId: number, tenantId: number): Promise<void>;
}
