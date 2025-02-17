import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RuleValidationPatternReturnValue } from './rule-validation-pattern.dto';

enum ValidationPatternType {
  REGEX = 'REGEX',
  SERVICE = 'SERVICE',
}

enum ValidationPatternValidityService {
  DATA_VALIDATION_SERVICE = 'DATA_VALIDATION_SERVICE',
}

enum ValidationPatternCategory {
  EMAIL_FORMAT = 'EMAIL_FORMAT',
  EMAIL_VALIDITY = 'EMAIL_VALIDITY',
  PHONE_FORMAT = 'PHONE_FORMAT',
  PHONE_VALIDITY = 'PHONE_VALIDITY',
}

enum ValidationDataType {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

@Entity()
export class ValidationPattern {
  @PrimaryGeneratedColumn('uuid')
  validationPatternId: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: true })
  expression: string;

  @Column({ nullable: true })
  example: string;

  @Column({ nullable: false, enum: ValidationDataType })
  dataType: ValidationDataType;

  @Column({
    default: ValidationPatternType.REGEX,
    enum: ValidationPatternType,
    nullable: false,
  })
  type: ValidationPatternType;

  @Column({
    default: ValidationPatternCategory.EMAIL_FORMAT,
    enum: ValidationPatternCategory,
    nullable: false,
  })
  category: ValidationPatternCategory;

  @Column({ type: 'json', nullable: true })
  returnValueSchema: RuleValidationPatternReturnValue;

  @Column({
    enum: ValidationPatternValidityService,
    nullable: true,
  })
  serviceName: ValidationPatternValidityService;
}
