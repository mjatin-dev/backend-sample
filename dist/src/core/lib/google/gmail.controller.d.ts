import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { GmailService } from './gmail.service';
export declare class GmailController {
    private readonly gmailService;
    constructor(gmailService: GmailService);
    status(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getAuthenticatedEmail(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    createLabel(authedUser: IAuthedUser, body: {
        labelName: string;
    }): Promise<SuccessResponseObject>;
    watch(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    list(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
}
