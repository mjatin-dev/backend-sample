import { AccountTypeService } from '../services/accountType.service';
import { CreateAccountTypeRequestDto } from '../dto/accountType/create-accountType.request.dto';
import { UpdateAccountTypeRequestDto } from '../dto/accountType/update-accountType.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class AccountTypeController {
    private readonly accountTypeService;
    constructor(accountTypeService: AccountTypeService);
    createAccountType(authedUser: IAuthedUser, body: CreateAccountTypeRequestDto): Promise<SuccessResponseObject>;
    updateAccountType(authedUser: IAuthedUser, id: number, body: UpdateAccountTypeRequestDto): Promise<SuccessResponseObject>;
    getAccountTypes(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getAccountType(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteAccountType(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
