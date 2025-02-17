import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { RuleDepartment } from '../rule-department/rule-department.entity';
import { RuleDepartmentEnum, RuleRiskLevelEnum, RuleTypeEnum } from '../types';
import { DataSource } from '@/data-source/dataSource.entity';
import { RuleObjectTemplateRef } from './rule-object-template-ref.entity';
import { Exclude } from 'class-transformer';
import { RuleType } from '../rule-type/rule-type.entity';
import { RuleRisk } from '../rule-risk/rule-risk.entity';

@Entity()
@Unique(['name'])
export class RuleTemplate {
  @PrimaryGeneratedColumn('uuid')
  ruleTemplateId: string;

  @Column({ nullable: false, type: 'text', unique: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  table: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: false })
  ruleBody: any;

  @Column({ type: 'json', nullable: true })
  frontEndRuleBody: any;

  @Column({ type: 'text', nullable: false, default: '' })
  context: string;

  @Column({ nullable: false, precision: 3, type: 'decimal', default: 0 })
  violationScore: number;

  @Column({ type: 'text', nullable: false, default: RuleDepartmentEnum.Others })
  department: string;

  @Column({
    type: 'text',
    nullable: false,
    default: RuleTypeEnum.DataValidation,
  })
  type: string;

  @Column({ type: 'text', nullable: false, default: RuleRiskLevelEnum.Low })
  risk: string;

  @Column({ nullable: false, type: 'text', default: 'Salesforce' })
  dataSourceName: string;

  @ManyToOne(() => RuleDepartment, (RuleDepartment) => RuleDepartment.name)
  @JoinColumn({ name: 'department', referencedColumnName: 'name' })
  DepartmentObject: RuleDepartment;

  @ManyToOne(() => RuleRisk, (RuleRisk) => RuleRisk.name)
  @JoinColumn({ name: 'risk', referencedColumnName: 'name' })
  RiskObject: RuleRisk;

  @ManyToOne(() => DataSource, (DataSource) => DataSource.dataSourceId)
  @JoinColumn({ name: 'data_source_name', referencedColumnName: 'name' })
  DataSourceObject: DataSource;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => RuleObjectTemplateRef)
  @JoinTable()
  ObjectReferences: RuleObjectTemplateRef[];

  @ManyToOne(() => RuleType, (RuleType) => RuleType.name)
  @JoinColumn({ name: 'type', referencedColumnName: 'name' })
  TypeObject: RuleType;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;
}
