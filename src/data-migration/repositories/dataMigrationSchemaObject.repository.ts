import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DataMigrationSchemaObject } from '../entities/dataMigrationSchemaObject.entity';

@EntityRepository(DataMigrationSchemaObject)
export class DataMigrationSchemaObjectRepository extends BaseRepository<DataMigrationSchemaObject> {}
