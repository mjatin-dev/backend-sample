import { RuleComponent } from './Enums';

export interface LogicalOperator extends RuleComponent {
  value: string;
}

export type Parenthesis = RuleComponent;

export interface RootCondition extends RuleComponent {
  field: ConditionalValue;
  operator: string;
  value: ConditionalValue;
}

export interface FrontEndRuleHavingCondition extends RuleComponent {
  field: string;
  fieldFunction: string;
  operator: string;
  value: any;
}

export interface LookUpValue extends RuleComponent {
  value: (LookUpTable | FieldReference)[];
}

export interface LookUpTable extends RuleComponent {
  table: string;
  relationShipName: string;
  referenceTable: string;
  joinField: string;
  referenceJoinField: string;
}

export interface FunctionValue extends RuleComponent {
  function: string;
  numberOfParams: number;
  value: ConditionalValue[];
}

export interface FieldReference extends RuleComponent {
  value: any;
}

export enum PrimitiveFormatEnum {
  TEXT = 'text',
  DATE = 'date',
  DATE_TIME = 'datetime-local',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  NULL = 'null',
}

export interface PrimitiveValue extends RuleComponent {
  value: string;
  format?: string;
}

export type ConditionalValue =
  | PrimitiveValue
  | FieldReference
  | LookUpValue
  | FunctionValue
  | SubQueryValue;

export interface SubQueryValue extends RuleComponent {
  subQueryId: string;
  value: string;
}

export type RuleWhereValue = RootCondition | LogicalOperator | Parenthesis;
export type RuleHavingValue = RootCondition | LogicalOperator | Parenthesis;

export type RuleWhereArray = (RootCondition | LogicalOperator | Parenthesis)[];
export type RuleHavingArray = (RootCondition | LogicalOperator | Parenthesis)[];

export interface SubQuery {
  tempId: string;
  alias: string;
  table: string;
  where: RuleWhereArray;
}

export interface FrontEndRuleDto {
  ruleName: string;
  violationScore: number;
  description: string;
  department: string;
  category: string;
  riskLevel: string;
  subQueries: SubQuery[];
  where: RuleWhereArray;
  having: RuleHavingArray;
}
