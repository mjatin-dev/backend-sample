import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  Column,
  Unique,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class RuleType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  ruleTypeId: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'text' })
  name: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'text' })
  label: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'text' })
  color?: string;

  @Exclude()
  @ApiProperty()
  @DeleteDateColumn()
  public deletedAt: Date;
}
