import { EmailService } from './email.service';
import { CreateEmailRequestDto } from './dto/create-email.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    createEmail(authedUser: IAuthedUser, body: CreateEmailRequestDto): Promise<SuccessResponseObject>;
    getEmails(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getEmail(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteEmail(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    getGmailAccount(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
}
