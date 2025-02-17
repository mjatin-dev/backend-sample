import { ContactStatusService } from '../services/contactStatus.service';
import { CreateContactStatusRequestDto } from '../dto/contactStatus/create-contactStatus.request.dto';
import { UpdateContactStatusRequestDto } from '../dto/contactStatus/update-contactStatus.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class ContactStatusController {
    private readonly contactStatusService;
    constructor(contactStatusService: ContactStatusService);
    createContactStatus(authedUser: IAuthedUser, body: CreateContactStatusRequestDto): Promise<SuccessResponseObject>;
    updateContactStatus(authedUser: IAuthedUser, id: number, body: UpdateContactStatusRequestDto): Promise<SuccessResponseObject>;
    getContactStatuss(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getContactStatus(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteContactStatus(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
