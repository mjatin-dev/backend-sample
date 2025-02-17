import { UpdateResult } from 'typeorm';
import { DeduplicationResultDto } from '../dto/deduplication-result.response.dto';
import { DeduplicationResultStatus } from '../dto/update-deduplication-result-status.dto';
export interface DeduplicationQueryOption {
    limit: number;
    tables?: string[];
}
export declare class DeduplicationResultRepository {
    getDeduplicationResultData(tenantId: number, dataSourceId: string, queryOption: DeduplicationQueryOption): Promise<DeduplicationResultDto[]>;
    getDeduplicationResultDataByIds(tenantId: number, dataSourceId: string, ids: string[]): Promise<DeduplicationResultDto[]>;
    updateDeduplicationResultStatus(tenantId: number, dataSourceId: string, newStatus: DeduplicationResultStatus, ids: string[]): Promise<UpdateResult>;
}
