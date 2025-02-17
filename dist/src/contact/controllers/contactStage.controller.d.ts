import { ContactStageService } from '../services/contactStage.service';
import { CreateContactStageRequestDto } from '../dto/contactStage/create-contactStage.request.dto';
import { UpdateContactStageRequestDto } from '../dto/contactStage/update-contactStage.request.dto';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class ContactStageController {
    private readonly contactStageService;
    constructor(contactStageService: ContactStageService);
    createContactStage(authedUser: IAuthedUser, body: CreateContactStageRequestDto): Promise<SuccessResponseObject>;
    updateContactStage(authedUser: IAuthedUser, id: number, body: UpdateContactStageRequestDto): Promise<SuccessResponseObject>;
    getContactStages(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getContactStage(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deleteContactStage(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
