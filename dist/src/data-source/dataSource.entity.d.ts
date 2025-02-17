import { Integration } from '@/integration/integration.entity';
import { DataMigration } from '../data-migration/entities/dataMigration.entity';
export declare class DataSource {
    dataSourceId: string;
    name: string;
    integrationId?: number;
    type: string;
    integration?: Integration;
    userDataMigrations?: DataMigration[];
}
