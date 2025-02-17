import { PipelineStage } from '../entities/pipelineStage.entity';
import { PipelineDocument } from '../entities/pipelineDocument.entity';
import { User } from '@/user/entities/user.entity';
import { Product } from '@/product/entities/product.entity';
export declare class UpdatepipelineRequestDto {
    pipelineName: string;
    pipelineDescription: string;
    productIds: number[];
    pipelineStages: PipelineStage[];
    pipelineDocuments: PipelineDocument[];
    pipelineProducts: Product[];
    pipelineUsers: User[];
}
