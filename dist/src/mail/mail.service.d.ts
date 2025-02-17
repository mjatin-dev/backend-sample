import { SendMailData, WelcomeTemplateData, PasswordResetTemplateData, SendHtmlMail } from './types';
export declare class MailService {
    constructor();
    sendEmail<T>(mailData: SendMailData<T>): Promise<void>;
    sendHtmlEmail<T>(mailData: SendHtmlMail): Promise<void>;
    sendWelcomeEmail(to: string, data: WelcomeTemplateData, from?: string): Promise<void>;
    sendVerificationEmail(to: string, htmlContent: string, from?: string): Promise<void>;
    sendPasswordResetEmail(to: string, data: PasswordResetTemplateData, from?: string): Promise<void>;
}
