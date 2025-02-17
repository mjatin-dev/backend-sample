import { CreateContactSourceRequestDto } from '../dto/contactSource/create-contactSource.request.dto';
import { ContactSourceResponseDto } from '../dto/contactSource/contactSource.response.dto';
import { UpdateContactSourceRequestDto } from '../dto/contactSource/update-contactSource.request.dto';
import { ContactSourceRepository } from '../repositories/contactSource.repository';
export declare class ContactSourceService {
    private readonly contactSourceRepository;
    constructor(contactSourceRepository: ContactSourceRepository);
    create(data: CreateContactSourceRequestDto, ownerId: number): Promise<ContactSourceResponseDto>;
    findOne(id: number): Promise<ContactSourceResponseDto>;
    update(id: number, data: UpdateContactSourceRequestDto, ownerId: number): Promise<ContactSourceResponseDto>;
    findAll(): Promise<ContactSourceResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
