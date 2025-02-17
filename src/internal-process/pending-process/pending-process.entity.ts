import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PendingProcess {
  @PrimaryGeneratedColumn('uuid')
  pendingProcessId: string;

  @Column({ nullable: false, type: 'text' })
  definedProcessName: string;

  @Column({ nullable: true, type: 'text' })
  tenantId: string;

  @Column({ nullable: true, type: 'jsonb' })
  params: any;
}
