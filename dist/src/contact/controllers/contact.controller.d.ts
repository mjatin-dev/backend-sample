import { ContactService } from '../services/contact.service';
import { CreateContactRequestDto } from '../dto/contact/create-contact.request.dto';
import { UpdateContactRequestDto } from '../dto/contact/update-contact.request.dto';
import { SuccessResponseObject } from '../../common/http';
import { IAuthedUser } from '@/auth/types';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    createContact(authedUser: IAuthedUser, body: CreateContactRequestDto): Promise<SuccessResponseObject>;
    updateContact(authedUser: IAuthedUser, id: number, body: UpdateContactRequestDto): Promise<SuccessResponseObject>;
    getContacts(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getContact(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteContact(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
