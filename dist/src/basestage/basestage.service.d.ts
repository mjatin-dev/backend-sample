import { baseStageResponseDto } from './dto/basestage.response.dto';
import { BaseStageRepository } from './repositories/baseStage.repository';
export declare class baseStageService {
    private readonly baseStageRepository;
    constructor(baseStageRepository: BaseStageRepository);
    findOne(id: number): Promise<baseStageResponseDto>;
    findAll(): Promise<baseStageResponseDto[]>;
}
