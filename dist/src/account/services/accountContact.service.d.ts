import { CreateAccountContactRequestDto } from '../dto/accountContact/create-accountContact.request.dto';
import { AccountContactResponseDto } from '../dto/accountContact/accountContact.response.dto';
import { UpdateAccountContactRequestDto } from '../dto/accountContact/update-accountContact.request.dto';
import { AccountContactRepository } from '../repositories/accountContact.repository';
export declare class AccountContactService {
    private readonly accountContactRepository;
    constructor(accountContactRepository: AccountContactRepository);
    create(data: CreateAccountContactRequestDto, ownerId: number): Promise<AccountContactResponseDto>;
    findOne(id: number): Promise<AccountContactResponseDto>;
    getContactsByAccountId(id: number): Promise<AccountContactResponseDto[]>;
    getAccountsByContactId(id: number): Promise<AccountContactResponseDto[]>;
    update(id: number, data: UpdateAccountContactRequestDto, ownerId: number): Promise<AccountContactResponseDto>;
    findAll(): Promise<AccountContactResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
