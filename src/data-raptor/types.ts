export enum RuleStatus {
  REQUESTED = 'requested',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum RuleTypeEnum {
  DuplicateDetection = 'duplicate-detection',
  DataValidation = 'data-validation',
  AnomalyDetection = 'anomaly-detection',
}

export enum RuleRiskLevelEnum {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum RuleDepartmentEnum {
  Sales = 'sales',
  Marketing = 'marketing',
  Finance = 'finance',
  Customer_Success = 'customer-success',
  Others = 'others',
}

export enum RuleObjectTemplateRefType {
  table = 'table',
  field = 'field',
}
