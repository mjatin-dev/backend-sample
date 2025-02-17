import { AccountContactService } from '../services/accountContact.service';
import { CreateAccountContactRequestDto } from '../dto/accountContact/create-accountContact.request.dto';
import { UpdateAccountContactRequestDto } from '../dto/accountContact/update-accountContact.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class AccountContactController {
    private readonly accountContactService;
    constructor(accountContactService: AccountContactService);
    createAccountContact(authedUser: IAuthedUser, body: CreateAccountContactRequestDto): Promise<SuccessResponseObject>;
    updateAccountContact(authedUser: IAuthedUser, id: number, body: UpdateAccountContactRequestDto): Promise<SuccessResponseObject>;
    getAccountContacts(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getAccountContact(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    getContactsByAccountId(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    getAccountsByContactId(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteAccountContact(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
