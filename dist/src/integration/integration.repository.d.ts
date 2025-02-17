import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Integration } from './integration.entity';
export declare class IntegrationRepository extends BaseRepository<Integration> {
    getIntegrationsWithStateByUser(userId: number): Promise<Integration[]>;
    getIntegrationsWithStateByTenant(tenantId: number): Promise<Integration[]>;
    getOneIntegrationWithStateByUser(userId: number, applicationId: string): Promise<Integration>;
    getOneIntegrationWithStateByTenant(tenantId: number, applicationId: string): Promise<Integration>;
}
