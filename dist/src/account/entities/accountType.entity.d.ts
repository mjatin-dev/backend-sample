import { Account } from './account.entity';
export declare class AccountType {
    accountTypeId: number;
    accountTypeName: string;
    description: string;
    account?: Account[];
}
