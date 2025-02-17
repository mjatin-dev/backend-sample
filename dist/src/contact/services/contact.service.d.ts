import { CreateContactRequestDto } from '../dto/contact/create-contact.request.dto';
import { ContactResponseDto } from '../dto/contact/contact.response.dto';
import { UpdateContactRequestDto } from '../dto/contact/update-contact.request.dto';
import { ContactRepository } from '../repositories/contact.repository';
import { ContactContactInformationService } from './contactContactInformation.service';
export declare class ContactService {
    private readonly contactRepository;
    private readonly contactContactInfoService;
    constructor(contactRepository: ContactRepository, contactContactInfoService: ContactContactInformationService);
    create(data: CreateContactRequestDto, ownerId: number): Promise<ContactResponseDto>;
    findOne(id: number, ownerId: number): Promise<ContactResponseDto>;
    update(id: number, data: UpdateContactRequestDto, ownerId: number): Promise<ContactResponseDto>;
    findAll(userId: number): Promise<ContactResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
