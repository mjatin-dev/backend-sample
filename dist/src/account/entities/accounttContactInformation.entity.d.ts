import { AddressType } from '@/user/types';
import { Account } from './account.entity';
export declare class AccountContactInformation {
    accountContInfoId: number;
    accountId: number;
    addressType?: AddressType;
    isCurrent?: boolean;
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
    account?: Account;
}
