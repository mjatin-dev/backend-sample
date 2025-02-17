import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SalesforceConfigurationFields {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { nullable: true, unique: true })
  fieldName: {
    id: string;
    name: string;
  }[];

  @Column({ type: 'timestamp', default: () => 'now()' })
  createDate: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  updateDate: Date;
}
