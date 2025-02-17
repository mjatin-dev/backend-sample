import { Account } from '@/account/entities/account.entity';
import { Contact } from '@/contact/entities/contact.entity';
import { Tenant } from '@/tenant/entities/tenant.entity';
export declare class Deal {
    dealId: number;
    dealName: string;
    description: string;
    pipelineId: number;
    tenantId: number;
    tenantUserId: number;
    accountId: number;
    contactId: number;
    campaignId: number;
    createdBy: number;
    totalAmount: number;
    currency: string;
    startDate: Date;
    endDate: Date;
    createdDate: Date;
    updateDate: Date;
    account?: Account;
    contact?: Contact;
    tenant?: Tenant;
}
