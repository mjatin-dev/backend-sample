import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
export declare class CreateDeduplicationConfigResponseDto {
    DeDuplicationConfigId: string;
    migrationId: string;
    tableName: string;
    fields: string[];
    migrationObject?: DataMigration;
}
