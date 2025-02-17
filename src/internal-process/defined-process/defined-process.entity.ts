import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DefinedProcess {
  @PrimaryGeneratedColumn('uuid')
  definedProcessId: string;

  @Column({ nullable: false, type: 'text', unique: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'jsonb' })
  params: any;
}
