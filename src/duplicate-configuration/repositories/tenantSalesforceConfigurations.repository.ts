import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TenantSalesforceConfigurations } from '../entities/tenantSalesforceConfigurations.entity';

@EntityRepository(TenantSalesforceConfigurations)
export class TenantSalesforceConfigurationsRepository extends BaseRepository<TenantSalesforceConfigurations> {}
