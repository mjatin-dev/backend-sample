import { DataSourceService } from './data-source.service';
import { SuccessResponseObject } from '@/common/http';
import { IAuthedUser } from '@/auth/types';
export declare class DataSourceController {
    private readonly dataSourceService;
    constructor(dataSourceService: DataSourceService);
    getAllDataSources(): Promise<SuccessResponseObject>;
    getIntegratedDataSources(authedUser: IAuthedUser): Promise<SuccessResponseObject>;
    getDataSourceFromIntegrationId(integrationId: string): Promise<SuccessResponseObject>;
}
