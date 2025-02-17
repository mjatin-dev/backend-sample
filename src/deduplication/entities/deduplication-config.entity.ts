import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['migrationId', 'tableName'])
export class DeDuplicationConfig {
  @PrimaryGeneratedColumn('uuid')
  DeDuplicationConfigId: string;

  @Column()
  migrationId: string;

  @Column()
  tableName: string;

  @Column({ array: true, type: 'text' })
  fields: string[];

  @ManyToOne(
    () => DataMigration,
    (dataMigration) => dataMigration.dataMigrationId,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'migration_id',
    referencedColumnName: 'dataMigrationId',
  })
  migrationObject?: DataMigration;
}
