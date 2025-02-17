import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';
import { OAuth2 } from 'jsforce';
export declare class SalesforceMergeService {
    #private;
    private readonly integrationRepository;
    private readonly integrationStateRepository;
    private readonly kmsManagerService;
    constructor(integrationRepository: IntegrationRepository, integrationStateRepository: IntegrationStateRepository, kmsManagerService: KmsManagerService);
    get oAuth2Client(): OAuth2;
    get oAuth2SandboxClient(): OAuth2;
    private getFrontendRedirectUrl;
    private getIntegrationData;
    mergeRecords(authedUser: IAuthedUser, masterRecordId: string, duplicateRecordIds: string[], overWriteValues: Record<string, any>, objectType: string): Promise<void>;
    private executeMergeProcess;
}
