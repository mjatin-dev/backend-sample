import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DataMigrationEventBusIntegration } from '../entities/dataMigrationEventBusIntegration.entity';

@EntityRepository(DataMigrationEventBusIntegration)
export class DataMigrationEventBusIntegrationRepository extends BaseRepository<DataMigrationEventBusIntegration> {}
