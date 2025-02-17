import { RecordUpdate } from '../../../../../data-migration/dto/post-migration-record-update.dto';
export declare class DataSynchronizerSqsMessageDto {
    userId: number;
    tenantId: number;
    migrationId: string;
    dataSourceId: string;
    updates: RecordUpdate[];
}
