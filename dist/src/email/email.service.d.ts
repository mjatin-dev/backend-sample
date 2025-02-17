import { CreateEmailRequestDto } from './dto/create-email.request.dto';
import { EmailResponseDto } from './dto/email.response.dto';
import { EmailRepository } from './email.repository';
import { GmailService } from '@/core/lib/google/gmail.service';
export declare class EmailService {
    private readonly emailRepository;
    private readonly gmailService;
    constructor(emailRepository: EmailRepository, gmailService: GmailService);
    create(data: CreateEmailRequestDto, ownerId: number): Promise<EmailResponseDto>;
    findOne(id: number): Promise<EmailResponseDto>;
    findAll(): Promise<EmailResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
    getGmailAccount(ownerId: number): Promise<string>;
}
