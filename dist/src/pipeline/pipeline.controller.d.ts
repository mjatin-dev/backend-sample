import { pipelineService } from './services/pipeline.service';
import { CreatepipelineRequestDto } from './dto/create-pipeline.request.dto';
import { UpdatepipelineRequestDto } from './dto/update-pipeline.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
import { PipelineRepository } from './repositories/pipeline.repository';
export declare class pipelineController {
    private readonly pipelineService;
    private readonly pipelineRepository;
    constructor(pipelineService: pipelineService, pipelineRepository: PipelineRepository);
    createpipeline(authedUser: IAuthedUser, body: CreatepipelineRequestDto): Promise<SuccessResponseObject>;
    updatepipeline(authedUser: IAuthedUser, id: number, body: UpdatepipelineRequestDto): Promise<SuccessResponseObject>;
    getpipelines(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getpipeline(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    deletepipeline(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    getAllResources(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
}
