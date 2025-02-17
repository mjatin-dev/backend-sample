import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from '@/tenant/entities/tenant.entity';
import { DataSource } from '../../data-source/dataSource.entity';
import { DataMigrationStatus } from '@/core/types';
import { User } from '@/user/entities/user.entity';
import { Rule } from '@/data-raptor/rule/rule.entity';
import { MigrationDetail } from '../types';
import { DeDuplicationConfig } from '@/deduplication/entities/deduplication-config.entity';
import { RuleTempTable } from '@/data-raptor/rule-temp-table/rule-temp-table.entity';

@Entity()
export class DataMigration {
  @PrimaryGeneratedColumn('uuid')
  dataMigrationId: string;

  @Column({ nullable: true })
  tenantId?: number;

  @Column({ nullable: true })
  userId?: number;

  @Column()
  dataSourceId: string;

  @Column({ default: DataMigrationStatus.REQUESTED })
  status: DataMigrationStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  statusDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  syncedAt: Date;

  @Column({ nullable: true, type: 'json' })
  detail: MigrationDetail;

  @ManyToOne(() => Tenant, (tenant) => tenant.dataMigrations)
  @JoinColumn({ name: 'tenant_id', referencedColumnName: 'tenantId' })
  tenant: Tenant;

  @ManyToOne(() => User, (user) => user.dataMigrations)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.userDataMigrations)
  @JoinColumn({ name: 'data_source_id', referencedColumnName: 'dataSourceId' })
  dataSource: DataSource;

  @OneToMany(
    () => DeDuplicationConfig,
    (deDuplicationConfig) => deDuplicationConfig.migrationObject,
  )
  deduplicationConfigs?: DeDuplicationConfig[];

  @OneToMany(() => Rule, (rule) => rule.migration)
  rules?: Rule[];

  @OneToMany(() => RuleTempTable, (tempTable) => tempTable.migration)
  tempTables?: RuleTempTable[];
}
