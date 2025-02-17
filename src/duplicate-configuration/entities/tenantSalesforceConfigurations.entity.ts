import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { SalesforceConfigurationObjects } from './salesforceConfigurationObjects.entity';

export class TenantSalesforceConfigurations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tenantId: number;

  @ManyToOne(() => SalesforceConfigurationObjects, {
    eager: true,
    cascade: true,
  })
  object: SalesforceConfigurationObjects;

  @Column('json', { nullable: true, unique: true })
  configurationFields: {
    id: string;
    configurationField: string;
    weightValue: number;
  }[];

  @Column('int', { default: 0 })
  threshold: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Date;
}
