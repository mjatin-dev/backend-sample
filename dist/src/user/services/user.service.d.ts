import { FindConditions } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user.response.dto';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { CreateUserRequestDto } from '../dto/create-user.request.dto';
import { AuthService } from '@/auth/auth.service';
import { MailService } from '@/mail/mail.service';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';
import { UserContactInformationService } from './userContactInformation.service';
export declare class UserService {
    private readonly userRepository;
    private readonly authService;
    private readonly userContactInfoService;
    private readonly mailService;
    constructor(userRepository: UserRepository, authService: AuthService, userContactInfoService: UserContactInformationService, mailService: MailService);
    create(data: CreateUserRequestDto, creatorId?: number): Promise<CreateUserResponseDto>;
    findOne(where: FindConditions<User>, ownerId?: number): Promise<UserResponseDto>;
    findAll(tenantId: number): Promise<UserResponseDto[]>;
    update(id: number, data: UpdateUserRequestDto & {
        companyId?: number;
    }, ownerId?: number): Promise<void>;
    delete(id: number, ownerId?: number): Promise<void>;
    inactivate(id: number, userId: number, companyId: number): Promise<void>;
    reactivate(id: number, userId: number, companyId: number): Promise<void>;
}
