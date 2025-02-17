import { Pipeline } from './pipeline.entity';
export declare class PipelineDocument {
    pipelineDocumentId: number;
    pipeline: Pipeline;
    name: string;
    location: string;
    extention: string;
    size: number;
    type: string;
    fileKey: string;
}
