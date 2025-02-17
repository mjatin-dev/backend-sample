import { DataMigrationRepository } from '../repositories/dataMigration.repository';
import { DataMigration } from '../entities/dataMigration.entity';
import { FindOneOptions } from 'typeorm';
export declare class DataMigrationService {
    private readonly dataMigrationRepository;
    constructor(dataMigrationRepository: DataMigrationRepository);
    create(tenantId: number, dataSourceId: string): Promise<DataMigration>;
    findOne(findOneOptions: FindOneOptions<DataMigration>): Promise<DataMigration>;
    findAllByTenant(tenantId: number): Promise<DataMigration[]>;
    delete(id: string, tenantId: number): Promise<DataMigration[]>;
    validateIntegrationExists(userId: number, dataSourceId: string, tenantId?: number): Promise<any>;
    getMigrationByDataSourceName(userId: number, tenantId: number, dataSourceName: string): Promise<DataMigration>;
}
