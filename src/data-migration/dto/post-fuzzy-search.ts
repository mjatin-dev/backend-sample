export enum FuzzySearchLogicConnector {
  or = 'OR',
  and = 'AND',
}

export class FuzzySearchCondition {
  fieldName: string;
  value: string;
}

export class FuzzySearchDto {
  limit?: number;
  skip?: number;
  fallBackSearchField?: string[];
  minPercentage?: number;
  condition: FuzzySearchCondition;
}
