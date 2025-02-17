import { CreateContactStageRequestDto } from '../dto/contactStage/create-contactStage.request.dto';
import { ContactStageResponseDto } from '../dto/contactStage/contactStage.response.dto';
import { UpdateContactStageRequestDto } from '../dto/contactStage/update-contactStage.request.dto';
import { ContactStageRepository } from '../repositories/contactStage.repository';
export declare class ContactStageService {
    private readonly contactStageRepository;
    constructor(contactStageRepository: ContactStageRepository);
    create(data: CreateContactStageRequestDto, ownerId: number): Promise<ContactStageResponseDto>;
    findOne(id: number): Promise<ContactStageResponseDto>;
    update(id: number, data: UpdateContactStageRequestDto, ownerId: number): Promise<ContactStageResponseDto>;
    findAll(): Promise<ContactStageResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
