import { Deal } from '@/deal/entities/deal.entity';
import { User } from '@/user/entities/user.entity';
import { TenantAccount } from './tenantAccount.entity';
import { TenantContactInformation } from './tenantContactInformation.entity';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { IntegrationState } from '@/integration/integrationState.entity';
export declare class Tenant {
    tenantId: number;
    tenantName: string;
    industryId?: number;
    webURL?: string;
    employeesNumber?: string;
    suggestedDomain?: string;
    subscriptionDate?: Date;
    createDate: Date;
    ownerId: number;
    contactInfos?: TenantContactInformation[];
    owner: User;
    users: User[];
    tenantAccounts: TenantAccount[];
    deals?: Deal[];
    dataMigrations?: DataMigration[];
    integrationStates?: IntegrationState[];
}
