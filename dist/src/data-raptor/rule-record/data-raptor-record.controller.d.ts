import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { UpdateDuplicatedDetectionDto } from './dto/update-record-duplicate-detection';
import { UpdateDataValidationDto } from './dto/update-record-data-validation';
export declare class DataRaptorRecordController {
    private readonly dataMigrationService;
    constructor(dataMigrationService: DataMigrationService);
    getRecordReport(authedUser: IAuthedUser, migrationId: string): Promise<SuccessResponseObject>;
    updateDuplicateDetection(authedUser: IAuthedUser, body: UpdateDuplicatedDetectionDto, migrationId: string): Promise<SuccessResponseObject>;
    updateDataValidation(authedUser: IAuthedUser, body: UpdateDataValidationDto, migrationId: string): Promise<SuccessResponseObject>;
}
