import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class SalesforceConfigurationObjects {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { nullable: true, unique: true })
  objectFields: {
    id: string;
    name: string;
  }[];

  @Column({ default: 100 })
  totalWeight: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Date;
}
