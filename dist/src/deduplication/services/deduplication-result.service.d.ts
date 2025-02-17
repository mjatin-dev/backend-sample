import { DeduplicationQueryOption, DeduplicationResultRepository } from '../repositories/deduplication-result.repository';
import { DeduplicationResultStatus } from '../dto/update-deduplication-result-status.dto';
export declare class DeduplicationResultService {
    private readonly deduplicationResultRepository;
    constructor(deduplicationResultRepository: DeduplicationResultRepository);
    getDeduplicationResultData(tenantId: number, dataSourceId: string, queryOption: DeduplicationQueryOption): Promise<import("../dto/deduplication-result.response.dto").DeduplicationResultDto[]>;
    getDeduplicationResultDataByIds(tenantId: number, dataSourceId: string, ids: string[]): Promise<import("../dto/deduplication-result.response.dto").DeduplicationResultDto[]>;
    updateDeduplicationResultStatus(tenantId: number, dataSourceId: string, newStatus: DeduplicationResultStatus, ids: string[]): Promise<import("typeorm").UpdateResult>;
}
