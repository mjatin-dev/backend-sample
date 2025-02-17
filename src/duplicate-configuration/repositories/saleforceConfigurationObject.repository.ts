import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SalesforceConfigurationObjects } from '../entities/salesforceConfigurationObjects.entity';

@EntityRepository(SalesforceConfigurationObjects)
export class SalesforceConfigurationObjectsRepository extends BaseRepository<SalesforceConfigurationObjects> {}
