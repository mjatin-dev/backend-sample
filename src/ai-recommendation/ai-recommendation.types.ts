export interface AIRecommendation {
  Id: string;
  table_name: string;
  record_id: string;
  aux_compose_key: string;
  type: AI_RECOMMENDATION;
  payload: any;
  created_at: string;
}

export enum AI_RECOMMENDATION {
  DATA_ANOMALY = 'data_anomaly',
  DATA_VALIDATION = 'data_validation',
}
