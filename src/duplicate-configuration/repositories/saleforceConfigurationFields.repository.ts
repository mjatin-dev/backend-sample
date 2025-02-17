import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SalesforceConfigurationFields } from '../entities/salesforceConfigurationFields.entity';

@EntityRepository(SalesforceConfigurationFields)
export class SalesforceConfigurationFieldsRepository extends BaseRepository<SalesforceConfigurationFields> {}
