import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { Connection, IdentityInfo, OAuth2, UserInfo } from 'jsforce';
import { AppIds, ICallbackQueryParams } from '../../types';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';
import { IntegrationService } from '@/integration/integration.service';
export declare class SalesforceAuthService {
    #private;
    private readonly integrationRepository;
    private readonly integrationStateRepository;
    private readonly kmsManagerService;
    private integrationService;
    constructor(integrationRepository: IntegrationRepository, integrationStateRepository: IntegrationStateRepository, kmsManagerService: KmsManagerService, integrationService: IntegrationService);
    private getFrontendRedirectUrl;
    private getIntegrationData;
    private saveUserSession;
    get oAuth2Client(): OAuth2;
    get oAuth2SandboxClient(): OAuth2;
    authorize(authedUser: IAuthedUser, optionalArgs: {
        env: 'prod' | 'test';
    }): Promise<string>;
    authorizeUserIntegration(authedUser: IAuthedUser, optionalArgs: {
        env: 'prod' | 'test';
    }): Promise<string>;
    authenticate(): Promise<string>;
    login(body: any): Promise<any>;
    getAppScopes(): string[];
    handleAuthCallback(query: ICallbackQueryParams, AppId: AppIds, authedUser: IAuthedUser): Promise<void>;
    validateIntegrationRoleRequirements: (connection: Connection, AppId: AppIds) => Promise<{
        profileRecord: {
            Id: string;
            Name: string;
        };
        userRecord: {
            Id: string;
            ProfileId: string;
        };
        userIdentity: IdentityInfo;
    }>;
    verifyCodeAndGetConnection: (code: string) => Promise<{
        connection: Connection;
        userInfo: UserInfo;
        isSandboxOrg: boolean;
    }>;
    encryptToken: (token: string) => Promise<string>;
}
