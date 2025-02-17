import { DataMigration } from '@/data-migration/entities/dataMigration.entity';

export class CreateDeduplicationConfigResponseDto {
  DeDuplicationConfigId: string;
  migrationId: string;
  tableName: string;
  fields: string[];
  migrationObject?: DataMigration;
}
