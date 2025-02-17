import { AccountService } from '../services/account.service';
import { CreateAccountRequestDto } from '../dto/account/create-account.request.dto';
import { UpdateAccountRequestDto } from '../dto/account/update-account.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    createAccount(authedUser: IAuthedUser, body: CreateAccountRequestDto): Promise<SuccessResponseObject>;
    updateAccount(authedUser: IAuthedUser, id: number, body: UpdateAccountRequestDto): Promise<SuccessResponseObject>;
    getAccounts(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getAccount(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteAccount(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
