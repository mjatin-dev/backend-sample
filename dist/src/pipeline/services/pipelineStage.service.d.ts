import { PipelineStage } from '../entities/pipelineStage.entity';
import { PipelineStageRepository } from '../repositories/pipelineStage.repository';
export declare class pipelineStageService {
    private readonly pipelineStageRepository;
    constructor(pipelineStageRepository: PipelineStageRepository);
    create(data: PipelineStage): Promise<PipelineStage>;
    update(pipelineStageId: number, data: PipelineStage): Promise<PipelineStage>;
}
