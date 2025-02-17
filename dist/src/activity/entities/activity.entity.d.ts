import { EmailActivityDetail } from './emailActivityDetail.entity';
export declare class Activity {
    activityId: number;
    salePhaseId: number;
    dealId: number;
    tenantId: number;
    tenantUserId: number;
    accountId: number;
    contactId: number;
    activityTypeId: number;
    startDate: Date;
    dueDate: Date;
    status: string;
    contactStageId: number;
    emailActivityThreadId: string;
    emailActivityDetails?: EmailActivityDetail[];
}
