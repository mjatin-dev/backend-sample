import { AppIds } from '@/core/types';
import { APPLICATION_STATUS } from '@/core/types';
import { IntegrationState } from './integrationState.entity';
import { DataSource } from '@/data-source/dataSource.entity';
export declare class Integration {
    id: number;
    applicationId: AppIds;
    applicationName: string;
    applicationDescription?: string;
    applicationStatus?: APPLICATION_STATUS;
    applicationIcon: string;
    providerName: string;
    providerLink: string;
    totalInstalls: string;
    categories: string[];
    features: string[];
    languages: string;
    requirementPermissions: string[];
    subscriptionTitle: string;
    subscriptions: string;
    subscriptionLink: string;
    sort: number;
    type: string;
    integratedApps: IntegrationState[];
    dataSource: DataSource;
}
