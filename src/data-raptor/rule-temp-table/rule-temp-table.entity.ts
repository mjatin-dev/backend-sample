import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Migration,
  ManyToMany,
} from 'typeorm';
import { RuleDto } from '../rule/dto/rule.dto';
import { FormattedRuleDto } from '../rule/dto/formatted-rule.dto';
import { Rule } from '../rule/rule.entity';

@Entity()
@Unique(['dataMigrationId', 'name'])
export class RuleTempTable {
  @PrimaryGeneratedColumn('uuid')
  ruleTempTableId: string;

  @Column({ nullable: false, type: 'text' })
  table: string;

  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  formattedTableName: string;

  @Column({ nullable: false, type: 'jsonb' })
  definition: RuleDto;

  @Column({ nullable: true, type: 'jsonb' })
  formattedDefinition: FormattedRuleDto;

  @Column({ array: true, type: 'text', nullable: false, default: [] })
  sampleIds?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  dataMigrationId: string;
  @ManyToOne(() => DataMigration, (dataMigration) => dataMigration.tempTables, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'data_migration_id',
    referencedColumnName: 'dataMigrationId',
  })
  migration?: Migration;

  @ManyToMany(() => Rule, (rule) => rule.tempTables)
  rules: Rule[];
}
