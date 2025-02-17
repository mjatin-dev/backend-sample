import { Pipeline } from './pipeline.entity';
import { User } from '@/user/entities/user.entity';
export declare class PipelineStage {
    pipelineStageId: number;
    pipelineStageName: string;
    pipelineStageDescription: string;
    pipeline: Pipeline;
    order: number;
    title: string;
    description: string;
    type: string;
    pipelineStageOwners: User[];
}
