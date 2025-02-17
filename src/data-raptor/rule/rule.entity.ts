import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Migration,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  RuleDepartmentEnum,
  RuleRiskLevelEnum,
  RuleStatus,
  RuleTypeEnum,
} from '../types';
import { RuleDto } from './dto/rule.dto';
import { FrontEndRuleDto } from './dto/front-end-rule.dto';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { Exclude } from 'class-transformer';
import { RuleRisk } from '../rule-risk/rule-risk.entity';
import { RuleType } from '../rule-type/rule-type.entity';
import { RuleDepartment } from '../rule-department/rule-department.entity';
import { RuleTemplate } from '../rule-template/rule-template.entity';
import { FormattedRuleDto } from './dto/formatted-rule.dto';
import { RuleTempTable } from '../rule-temp-table/rule-temp-table.entity';

@Entity()
@Unique(['dataMigrationId', 'table', 'name'])
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  ruleId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  table: string;

  @Column({ type: 'json', nullable: false })
  rule: RuleDto;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Exclude()
  @Column({ type: 'json', nullable: true })
  formattedRule: FormattedRuleDto;

  @Exclude()
  @Column({ type: 'json', nullable: true })
  previousFormattedRule: FormattedRuleDto;

  @Column({ type: 'json', nullable: true })
  frontEndObject: FrontEndRuleDto;

  @Column({ nullable: false })
  dataMigrationId: string;

  @ManyToOne(() => DataMigration, (dataMigration) => dataMigration.rules, {
    nullable: true,
  })
  @JoinColumn({
    name: 'migration_id',
    referencedColumnName: 'dataMigrationId',
  })
  migration?: Migration;

  @Column({ nullable: false, precision: 3, type: 'decimal' })
  violationScore: number;

  @Column({ default: RuleStatus.REQUESTED })
  status: RuleStatus;

  @Column({
    type: 'text',
    nullable: false,
    default: RuleTypeEnum.DataValidation,
  })
  type: string;

  @Column({ type: 'text', nullable: false, default: RuleRiskLevelEnum.Low })
  risk: string;

  @Column({ type: 'text', nullable: false, default: RuleDepartmentEnum.Sales })
  department: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  statusDate: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @Column({ array: true, type: 'text', nullable: true })
  tableDependencies: string[];

  @Column({ type: 'integer', nullable: false, default: 0 })
  violatedRowCount: number;

  @Column({ type: 'uuid', nullable: true })
  ruleTemplateId?: string;

  @ManyToOne(() => RuleTemplate, (RuleTemplate) => RuleTemplate.ruleTemplateId)
  @JoinColumn({
    name: 'rule_template_id',
    referencedColumnName: 'ruleTemplateId',
  })
  RuleTemplateObject: RuleTemplate;

  @ManyToOne(() => RuleRisk, (RuleRisk) => RuleRisk.name)
  @JoinColumn({ name: 'risk', referencedColumnName: 'name' })
  RiskObject: RuleRisk;

  @ManyToOne(() => RuleType, (RuleType) => RuleType.name)
  @JoinColumn({ name: 'type', referencedColumnName: 'name' })
  TypeObject: RuleType;

  @ManyToOne(() => RuleDepartment, (RuleDepartment) => RuleDepartment.name)
  @JoinColumn({ name: 'department', referencedColumnName: 'name' })
  DepartmentObject: RuleDepartment;

  @ManyToMany(() => RuleTempTable, { cascade: true })
  @JoinTable({
    joinColumn: { name: 'ruleId' },
    inverseJoinColumn: { name: 'ruleTempTableId' },
    name: 'rule_temp_table_dependency',
  })
  tempTables: RuleTempTable[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
