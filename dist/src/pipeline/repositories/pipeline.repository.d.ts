import { Resource } from '@/resource/entities/resource.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Pipeline } from '../entities/pipeline.entity';
export declare class PipelineRepository extends BaseRepository<Pipeline> {
    getAllResouces(userId: any, pipelineId: any): Promise<any[] | Resource[]>;
}
