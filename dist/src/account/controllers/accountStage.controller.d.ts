import { AccountStageService } from '../services/accountStage.service';
import { CreateAccountStageRequestDto } from '../dto/accountStage/create-accountStage.request.dto';
import { UpdateAccountStageRequestDto } from '../dto/accountStage/update-accountStage.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class AccountStageController {
    private readonly accountStageService;
    constructor(accountStageService: AccountStageService);
    createAccountStage(authedUser: IAuthedUser, body: CreateAccountStageRequestDto): Promise<SuccessResponseObject>;
    updateAccountStage(authedUser: IAuthedUser, id: number, body: UpdateAccountStageRequestDto): Promise<SuccessResponseObject>;
    getAccountStages(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getAccountStage(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteAccountStage(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
