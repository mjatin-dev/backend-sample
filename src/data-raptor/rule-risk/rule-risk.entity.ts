import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class RuleRisk {
  @PrimaryGeneratedColumn('uuid')
  ruleRiskId: string;

  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: false, type: 'text' })
  label: string;

  @Column({ nullable: false, type: 'text' })
  description: string;
}
