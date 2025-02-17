import { CreateAccountStageRequestDto } from '../dto/accountStage/create-accountStage.request.dto';
import { AccountStageResponseDto } from '../dto/accountStage/accountStage.response.dto';
import { UpdateAccountStageRequestDto } from '../dto/accountStage/update-accountStage.request.dto';
import { AccountStageRepository } from '../repositories/accountStage.repository';
export declare class AccountStageService {
    private readonly accountStageRepository;
    constructor(accountStageRepository: AccountStageRepository);
    create(data: CreateAccountStageRequestDto, ownerId: number): Promise<AccountStageResponseDto>;
    findOne(id: number): Promise<AccountStageResponseDto>;
    update(id: number, data: UpdateAccountStageRequestDto, ownerId: number): Promise<AccountStageResponseDto>;
    findAll(): Promise<AccountStageResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
