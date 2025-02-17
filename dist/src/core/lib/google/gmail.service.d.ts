/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { AttachmentLike } from 'nodemailer/lib/mailer';
import { Readable } from 'stream';
import { GoogleAuthService } from './google-auth.service';
interface IEmailOptions {
    to: string;
    from: string;
    subject: string;
    text?: string | Buffer | Readable | AttachmentLike;
    html?: string | Buffer | Readable | AttachmentLike;
}
export declare class GmailService {
    private authService;
    constructor(authService: GoogleAuthService);
    private getAuthClient;
    private getAuthUserId;
    private getGmailApi;
    private encodeMessage;
    private createMessage;
    getAccount(ownerId: number): Promise<string>;
    getStatus(ownerId: number): Promise<boolean>;
    sendEmail(ownerId: number, options: IEmailOptions): Promise<import("googleapis").gmail_v1.Schema$Message>;
    createLabel(ownerId: number, labelName: string): Promise<import("googleapis").gmail_v1.Schema$Label>;
    getOrCreateCustomerCityLabel(ownerId: number, labelName?: string): Promise<string>;
    watchInbox(ownerId?: number): Promise<import("googleapis").gmail_v1.Schema$WatchResponse>;
    threads(ownerId: number): Promise<import("googleapis").gmail_v1.Schema$Thread[]>;
}
export {};
