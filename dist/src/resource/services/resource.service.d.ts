import { CreateResourceRequestDto } from '../dto/create-resource.request.dto';
import { ResourceResponseDto } from '../dto/resource.response.dto';
import { UpdateResourceRequestDto } from '../dto/update-resource.request.dto';
import { ResourceRepository } from '../repositories/resource.repository';
export declare class ResourceService {
    private readonly resourceRepository;
    constructor(resourceRepository: ResourceRepository);
    create(data: CreateResourceRequestDto, ownerId: number): Promise<ResourceResponseDto>;
    findAll(userId: number, pipelineId: number): Promise<ResourceResponseDto[]>;
    delete(id: number): Promise<void>;
    update(id: number, data: UpdateResourceRequestDto, ownerId: number): Promise<{
        name: string;
        type: string;
        description: string;
        dataType: string;
        id: number;
        pipelineId: number;
        createdBy: number;
        isActive: boolean;
        createDate: Date;
    } & import("../entities/resource.entity").Resource>;
}
