import { CreateAccountTypeRequestDto } from '../dto/accountType/create-accountType.request.dto';
import { AccountTypeResponseDto } from '../dto/accountType/accountType.response.dto';
import { UpdateAccountTypeRequestDto } from '../dto/accountType/update-accountType.request.dto';
import { AccountTypeRepository } from '../repositories/accountType.repository';
export declare class AccountTypeService {
    private readonly accountTypeRepository;
    constructor(accountTypeRepository: AccountTypeRepository);
    create(data: CreateAccountTypeRequestDto, ownerId: number): Promise<AccountTypeResponseDto>;
    findOne(id: number): Promise<AccountTypeResponseDto>;
    update(id: number, data: UpdateAccountTypeRequestDto, ownerId: number): Promise<AccountTypeResponseDto>;
    findAll(): Promise<AccountTypeResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
