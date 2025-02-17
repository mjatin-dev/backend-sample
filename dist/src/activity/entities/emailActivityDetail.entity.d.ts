import { Activity } from './activity.entity';
import { EmailType } from './emailType.entity';
export declare class EmailActivityDetail {
    emailActivityDetailId: number;
    activityId: number;
    emailMessageId: string;
    emailFrom: string;
    emailTo: string;
    emailSubject: string;
    emailBody: string;
    emailDate: Date;
    hasAttachment: boolean;
    email: string;
    replyToEmailId: number;
    emailTypeId: number;
    activity?: Activity;
    emailType?: EmailType;
}
