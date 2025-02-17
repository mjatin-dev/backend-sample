import { ACTIVITY_TYPE_ID } from '../types';
import { EmailActivityDetailDto } from './emailActivityDetail.dto';
export declare class CreateActivityRequestDto {
    salePhaseId: number;
    dealId: number;
    tenantId: number;
    accountId: number;
    contactId: number;
    activityTypeId: ACTIVITY_TYPE_ID;
    status: string;
    contactStageId: number;
    emailActivityDetail: EmailActivityDetailDto;
}
