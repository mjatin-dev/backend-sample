import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataMigrationSchemaObjectType } from '../types';
import { DataMigration } from './dataMigration.entity';

@Entity()
export class DataMigrationSchemaObject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'uuid' })
  migrationId: string;

  @Column({
    nullable: false,
    enum: DataMigrationSchemaObjectType,
    default: DataMigrationSchemaObjectType.table,
  })
  type: DataMigrationSchemaObjectType;

  @Column({ nullable: false, type: 'text' })
  definition: string;

  @Column({ nullable: false, type: 'text' })
  name: string;

  @ManyToOne(
    () => DataMigration,
    (dataMigration) => dataMigration.dataMigrationId,
  )
  @JoinColumn({
    name: 'migration_id',
    referencedColumnName: 'dataMigrationId',
  })
  MigrationObject: DataMigration;
}
