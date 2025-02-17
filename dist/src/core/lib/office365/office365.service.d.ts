import { ICallbackQueryParams } from '@/core/types';
import { IAuthedUser } from '@/auth/types';
import { OfficeSessionResponse } from './types';
import { KmsManagerService } from '../aws/kms/kms-manager.service';
import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
export declare class Office365Service {
    private readonly kmsManagerService;
    private readonly integrationRepository;
    private readonly integrationStateRepository;
    constructor(kmsManagerService: KmsManagerService, integrationRepository: IntegrationRepository, integrationStateRepository: IntegrationStateRepository);
    getTokenByCode: (code: string) => Promise<OfficeSessionResponse>;
    handleAuthCallback(query: ICallbackQueryParams, authedUser: IAuthedUser): Promise<void>;
    authorize(authedUser: IAuthedUser): Promise<string>;
    private getFrontendRedirectUrl;
    getScope(): string[];
    private saveUserSession;
    encryptToken: (token: string) => Promise<string>;
    private getIntegrationData;
}
