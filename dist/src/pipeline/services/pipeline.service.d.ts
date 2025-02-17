import { CreatepipelineRequestDto } from '../dto/create-pipeline.request.dto';
import { pipelineResponseDto } from '../dto/pipeline.response.dto';
import { UpdatepipelineRequestDto } from '../dto/update-pipeline.request.dto';
import { PipelineRepository } from '../repositories/pipeline.repository';
import { PipelineDocumentService } from './pipelineDocument.service';
import { pipelineStageService } from './pipelineStage.service';
export declare class pipelineService {
    private readonly pipelineRepository;
    private readonly pipelineStageService;
    private readonly pipelineDocumentService;
    constructor(pipelineRepository: PipelineRepository, pipelineStageService: pipelineStageService, pipelineDocumentService: PipelineDocumentService);
    create(data: CreatepipelineRequestDto, ownerId: number): Promise<pipelineResponseDto>;
    findOne(id: number, ownerId: number): Promise<pipelineResponseDto>;
    update(id: number, data: UpdatepipelineRequestDto, ownerId: number): Promise<pipelineResponseDto>;
    findAll(userId: number): Promise<pipelineResponseDto[]>;
    delete(id: number, ownerId: number): Promise<void>;
}
