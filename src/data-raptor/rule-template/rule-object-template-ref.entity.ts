import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RuleObjectTemplateRefType } from '../types';
import { DataSource } from '@/data-source/dataSource.entity';

@Entity()
export class RuleObjectTemplateRef {
  @PrimaryGeneratedColumn('uuid')
  ruleObjectTemplateRefId: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({
    nullable: false,
    enum: RuleObjectTemplateRefType,
  })
  type: string;

  @Column({ nullable: false, type: 'text' })
  tableName: string;

  @Column({ nullable: true, type: 'text' })
  fieldName: string;

  @Column({ nullable: false, type: 'text' })
  context: string;

  @Column({ nullable: false, type: 'text', default: 'Salesforce' })
  dataSourceName: string;

  @ManyToOne(() => DataSource, (DataSource) => DataSource.dataSourceId)
  @JoinColumn({ name: 'data_source_name', referencedColumnName: 'name' })
  DataSourceObject: DataSource;
}
