import { Tenant } from '@/tenant/entities/tenant.entity';
import { DataSource } from '../../data-source/dataSource.entity';
import { DataMigrationStatus } from '@/core/types';
import { User } from '@/user/entities/user.entity';
import { Rule } from '@/data-raptor/rule/rule.entity';
import { MigrationDetail } from '../types';
import { DeDuplicationConfig } from '@/deduplication/entities/deduplication-config.entity';
import { RuleTempTable } from '@/data-raptor/rule-temp-table/rule-temp-table.entity';
export declare class DataMigration {
    dataMigrationId: string;
    tenantId?: number;
    userId?: number;
    dataSourceId: string;
    status: DataMigrationStatus;
    statusDate: Date;
    syncedAt: Date;
    detail: MigrationDetail;
    tenant: Tenant;
    user: User;
    dataSource: DataSource;
    deduplicationConfigs?: DeDuplicationConfig[];
    rules?: Rule[];
    tempTables?: RuleTempTable[];
}
