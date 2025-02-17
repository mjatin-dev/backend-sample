import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';
import { OAuth2 } from 'jsforce';
export declare class SalesforceSchemaService {
    #private;
    private readonly integrationRepository;
    private readonly integrationStateRepository;
    private readonly kmsManagerService;
    constructor(integrationRepository: IntegrationRepository, integrationStateRepository: IntegrationStateRepository, kmsManagerService: KmsManagerService);
    get oAuth2Client(): OAuth2;
    get oAuth2SandboxClient(): OAuth2;
    private getFrontendRedirectUrl;
    private getIntegrationData;
    getFieldPickListValues(authedUser: IAuthedUser, objectName: string, fieldName: string): Promise<string[]>;
    createRecord(authedUser: IAuthedUser, objectName: string, record: any): Promise<import("jsforce").RecordResult>;
    updateObjectRecord(authedUser: IAuthedUser, objectName: string, recordId: string, values: Record<string, any>): Promise<void>;
    private getSalesforceConnection;
}
