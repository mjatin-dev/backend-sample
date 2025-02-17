import { DataMigrationSchemaObjectType } from '../types';
import { DataMigration } from './dataMigration.entity';
export declare class DataMigrationSchemaObject {
    id: string;
    migrationId: string;
    type: DataMigrationSchemaObjectType;
    definition: string;
    name: string;
    MigrationObject: DataMigration;
}
