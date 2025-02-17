import { ContactSourceService } from '../services/contactSource.service';
import { CreateContactSourceRequestDto } from '../dto/contactSource/create-contactSource.request.dto';
import { UpdateContactSourceRequestDto } from '../dto/contactSource/update-contactSource.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class ContactSourceController {
    private readonly contactSourceService;
    constructor(contactSourceService: ContactSourceService);
    createContactSource(authedUser: IAuthedUser, body: CreateContactSourceRequestDto): Promise<SuccessResponseObject>;
    updateContactSource(authedUser: IAuthedUser, id: number, body: UpdateContactSourceRequestDto): Promise<SuccessResponseObject>;
    getContactSources(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getContactSource(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteContactSource(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
