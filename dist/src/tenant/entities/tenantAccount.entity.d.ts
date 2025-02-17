import { Account } from '@/account/entities/account.entity';
import { Tenant } from './tenant.entity';
export declare class TenantAccount {
    tenantAccountId: number;
    tenantId: number;
    accountId: number;
    isActive: boolean;
    startDate: Date;
    endDate?: Date;
    tenant?: Tenant;
    account?: Account;
}
