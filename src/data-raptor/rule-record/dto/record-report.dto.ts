import { ApiProperty } from '@nestjs/swagger';

export class RecordReportDto {
  confidenceScore: number;
  rulesAppliedCount: number;
  lastUpdated: Date;
  confidenceScoreHistorical: ConfidenceScoreHistoricalDto[];
  duplicatedDetection?: DuplicatedDetectionDto;
  dataValidation?: DataValidationDto[];
}

export enum DataValidationState {
  DONE = 'done',
  IGNORE = 'ignore',
  INITIAL = 'init',
}

export enum DuplicatedDetectionState {
  IGNORE = 'not-duplicated',
  INITIAL = 'init',
}

export class DuplicatedDetectionDto {
  analysisId: string;
  result: DuplicationDetectionResultDto[];
  recommendation?: string;
}

export class DuplicationDetectionResultDto {
  columns: string[];
  id: string;
  state: DuplicatedDetectionState;
  @ApiProperty({
    example:
      'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/1/record/2',
  })
  mergeUrl: string;
}

export class ConfidenceScoreHistoricalDto {
  score: number;
  timestamp: Date;
}

export class DataValidationDto {
  columnName: string;
  recommendation?: {
    textRecommendation?: string;
    valueRecommendation?: string;
  };
  state: DataValidationState;
}
