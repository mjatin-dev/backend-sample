import { PipelineDocument } from '../entities/pipelineDocument.entity';
import { PipelineDocumentRepository } from '../repositories/pipelineDocument.repository';
export declare class PipelineDocumentService {
    private readonly pipelineDocumentRepository;
    constructor(pipelineDocumentRepository: PipelineDocumentRepository);
    create(data: PipelineDocument): Promise<PipelineDocument>;
    update(pipelineDocumentId: number, data: PipelineDocument): Promise<PipelineDocument>;
}
