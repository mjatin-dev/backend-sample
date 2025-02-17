import { CreateContactStatusRequestDto } from '../dto/contactStatus/create-contactStatus.request.dto';
import { ContactStatusResponseDto } from '../dto/contactStatus/contactStatus.response.dto';
import { UpdateContactStatusRequestDto } from '../dto/contactStatus/update-contactStatus.request.dto';
import { ContactStatusRepository } from '../repositories/contactStatus.repository';
export declare class ContactStatusService {
    private readonly contactStatusRepository;
    constructor(contactStatusRepository: ContactStatusRepository);
    create(data: CreateContactStatusRequestDto, ownerId: number): Promise<ContactStatusResponseDto>;
    findOne(id: number): Promise<ContactStatusResponseDto>;
    update(id: number, data: UpdateContactStatusRequestDto, ownerId: number): Promise<ContactStatusResponseDto>;
    findAll(): Promise<ContactStatusResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
