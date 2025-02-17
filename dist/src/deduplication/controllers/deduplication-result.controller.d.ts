import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DeduplicationResultByIdsRequestDto } from '../dto/deduplication-result.response.dto';
import { DeduplicationResultService } from '../services/deduplication-result.service';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { MergeDuplicatedRecordsRequest, UpdateDeduplicationResultStatusRequest } from '../dto/update-deduplication-result-status.dto';
import { SalesforceMergeService } from '@/core/lib/salesforce/salesforce-merge.service';
export declare class DeduplicationResultController {
    private readonly deduplicationResultService;
    private readonly dataMigrationService;
    private readonly salesforceMergeService;
    constructor(deduplicationResultService: DeduplicationResultService, dataMigrationService: DataMigrationService, salesforceMergeService: SalesforceMergeService);
    getDeduplicationResult(authedUser: IAuthedUser, migrationId: string, tables: string | string[], limit?: string): Promise<SuccessResponseObject>;
    getDeduplicationResultByIds(authedUser: IAuthedUser, migrationId: string, body: DeduplicationResultByIdsRequestDto): Promise<SuccessResponseObject>;
    updateDeduplicationResultStatus(authedUser: IAuthedUser, migrationId: string, body: UpdateDeduplicationResultStatusRequest): Promise<SuccessResponseObject>;
    mergeRecords(authedUser: IAuthedUser, migrationId: string, body: MergeDuplicatedRecordsRequest): Promise<SuccessResponseObject>;
    checkMigrationReference(migrationId: string, tenantId: number, options?: {
        relationships?: string[];
    }): Promise<import("../../data-migration/entities/dataMigration.entity").DataMigration>;
}
