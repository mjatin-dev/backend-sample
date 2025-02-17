import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DataSource } from './dataSource.entity';
import { GetIntegratedDataSourcesDto } from './dto/get-integrated-data-sources';
export declare class DataSourceRepository extends BaseRepository<DataSource> {
    getAvailableDataSources(userId: number, tenantId: number): Promise<GetIntegratedDataSourcesDto[]>;
}
