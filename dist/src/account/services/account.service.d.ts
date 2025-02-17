import { CreateAccountRequestDto } from '../dto/account/create-account.request.dto';
import { AccountResponseDto } from '../dto/account/account.response.dto';
import { UpdateAccountRequestDto } from '../dto/account/update-account.request.dto';
import { AccountRepository } from '../repositories/account.repository';
import { AccountContactInformationService } from './accountContactInformation.service';
import { CreateAccountResponseDto } from '../dto/account/create-account.response.dto';
export declare class AccountService {
    private readonly accountRepository;
    private readonly accountContactInfoService;
    constructor(accountRepository: AccountRepository, accountContactInfoService: AccountContactInformationService);
    create(data: CreateAccountRequestDto, ownerId: number): Promise<CreateAccountResponseDto>;
    findOne(id: number, ownerId: number): Promise<AccountResponseDto>;
    update(id: number, data: UpdateAccountRequestDto, ownerId: number): Promise<AccountResponseDto>;
    findAll(ownerId: number): Promise<AccountResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
