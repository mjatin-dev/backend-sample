import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DataMigrationEventBusIntegration {
  @PrimaryGeneratedColumn('uuid')
  dataMigrationBusIntegrationId: string;

  @Column({ nullable: false })
  dataMigrationId: string;

  @Column({ nullable: false })
  busId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
