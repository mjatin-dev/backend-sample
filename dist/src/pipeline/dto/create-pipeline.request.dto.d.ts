import { PipelineDocument } from '../entities/pipelineDocument.entity';
import { PipelineStage } from '../entities/pipelineStage.entity';
import { User } from '@/user/entities/user.entity';
import { Product } from '@/product/entities/product.entity';
export declare class CreatepipelineRequestDto {
    pipelineName: string;
    pipelineDescription: string;
    productIds: number[];
    pipelineStages: PipelineStage[];
    pipelineDocuments: PipelineDocument[];
    pipelineProducts: Product[];
    pipelineUsers: User[];
}
