import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class RuleDepartment {
  @PrimaryGeneratedColumn('uuid')
  ruleDepartmentId: string;

  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: false, type: 'text' })
  label: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'text' })
  color: string;
}
