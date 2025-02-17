import { AddressType } from '@/user/types';
import { Tenant } from './tenant.entity';
export declare class TenantContactInformation {
    tenantContInfoId: number;
    tenantId: number;
    addressType: AddressType;
    isCurrent: boolean;
    startValidDate: Date;
    endValidDate?: Date;
    phoneNumber?: string;
    mobileNumber?: string;
    country?: string;
    zip?: string;
    addressState?: string;
    city?: string;
    street?: string;
    email?: string;
    tenant?: Tenant;
}
