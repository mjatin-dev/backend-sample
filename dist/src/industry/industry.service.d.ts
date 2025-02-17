import { CreateIndustryRequestDto } from './dto/create-industry.request.dto';
import { IndustryResponseDto } from './dto/industry.response.dto';
import { UpdateIndustryRequestDto } from './dto/update-industry.request.dto';
import { IndustryRepository } from './industry.repository';
export declare class IndustryService {
    private readonly industryRepository;
    constructor(industryRepository: IndustryRepository);
    create(data: CreateIndustryRequestDto, ownerId: number): Promise<IndustryResponseDto>;
    findOne(id: number): Promise<IndustryResponseDto>;
    update(id: number, data: UpdateIndustryRequestDto, ownerId: number): Promise<IndustryResponseDto>;
    findAll(): Promise<IndustryResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
