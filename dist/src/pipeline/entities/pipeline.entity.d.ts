import { Product } from '@/product/entities/product.entity';
import { PipelineDocument } from './pipelineDocument.entity';
import { PipelineStage } from './pipelineStage.entity';
import { User } from '@/user/entities/user.entity';
export declare class Pipeline {
    pipelineId: number;
    pipelineName: string;
    pipelineDescription: string;
    tenantId: number;
    creatorTenantUserId: number;
    isActive: boolean;
    createDate: Date;
    startDate: Date;
    endDate: Date;
    pipelineStages: PipelineStage[];
    pipelineDocuments: PipelineDocument[];
    pipelineProducts: Product[];
    pipelineUsers: User[];
}
