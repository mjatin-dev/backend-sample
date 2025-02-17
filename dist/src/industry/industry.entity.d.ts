import { Account } from '@/account/entities/account.entity';
export declare class Industry {
    industryId: number;
    title: string;
    code: string;
    description: string;
    accounts?: Account[];
}
