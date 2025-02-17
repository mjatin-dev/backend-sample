import { ResourceService } from './services/resource.service';
import { CreateResourceRequestDto } from './dto/create-resource.request.dto';
import { SuccessResponseObject } from '../common/http';
import { IAuthedUser } from '@/auth/types';
import { UpdateResourceRequestDto } from './dto/update-resource.request.dto';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    createResource(authedUser: IAuthedUser, body: CreateResourceRequestDto): Promise<SuccessResponseObject>;
    deleteResource(authedUser: IAuthedUser, id: number): Promise<SuccessResponseObject>;
    updatepipeline(authedUser: IAuthedUser, id: number, body: UpdateResourceRequestDto): Promise<SuccessResponseObject>;
}
