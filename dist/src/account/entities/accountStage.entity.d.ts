import { Account } from './account.entity';
export declare class AccountStage {
    accountStageId: number;
    accountStageName: string;
    description: string;
    account?: Account[];
}
