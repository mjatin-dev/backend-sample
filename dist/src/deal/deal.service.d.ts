import { CreateDealRequestDto } from './dto/create-deal.request.dto';
import { DealResponseDto } from './dto/deal.response.dto';
import { UpdateDealRequestDto } from './dto/update-deal.request.dto';
import { DealRepository } from './repositories/deal.repository';
export declare class DealService {
    private readonly dealRepository;
    constructor(dealRepository: DealRepository);
    create(data: CreateDealRequestDto, userId: number): Promise<DealResponseDto>;
    findOne(id: number, ownerId: number): Promise<DealResponseDto>;
    update(id: number, data: UpdateDealRequestDto, ownerId: number): Promise<DealResponseDto>;
    findAll(ownerId: any): Promise<DealResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
