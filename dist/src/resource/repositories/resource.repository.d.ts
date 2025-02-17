import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Resource } from '../entities/resource.entity';
export declare class ResourceRepository extends BaseRepository<Resource> {
    findAll(userId: any, pipelineId: any): Promise<Resource[]>;
}
