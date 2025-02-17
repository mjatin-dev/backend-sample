import { DataSourceRepository } from './dataSource.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DataSource } from './dataSource.entity';
import { GetIntegratedDataSourcesDto } from './dto/get-integrated-data-sources';
export declare class DataSourceService {
    private readonly dataSourceRepository;
    constructor(dataSourceRepository: DataSourceRepository);
    findAll(findManyOptions?: FindManyOptions<DataSource>): Promise<DataSource[]>;
    findOne(findConditions: FindOneOptions<DataSource>): Promise<DataSource>;
    getAvailableDataSources(userId: number, tenantId: number): Promise<GetIntegratedDataSourcesDto[]>;
}
