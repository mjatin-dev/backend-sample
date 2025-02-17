export declare class RecordReportDto {
    confidenceScore: number;
    rulesAppliedCount: number;
    lastUpdated: Date;
    confidenceScoreHistorical: ConfidenceScoreHistoricalDto[];
    duplicatedDetection?: DuplicatedDetectionDto;
    dataValidation?: DataValidationDto[];
}
export declare enum DataValidationState {
    DONE = "done",
    IGNORE = "ignore",
    INITIAL = "init"
}
export declare enum DuplicatedDetectionState {
    IGNORE = "not-duplicated",
    INITIAL = "init"
}
export declare class DuplicatedDetectionDto {
    analysisId: string;
    result: DuplicationDetectionResultDto[];
    recommendation?: string;
}
export declare class DuplicationDetectionResultDto {
    columns: string[];
    id: string;
    state: DuplicatedDetectionState;
    mergeUrl: string;
}
export declare class ConfidenceScoreHistoricalDto {
    score: number;
    timestamp: Date;
}
export declare class DataValidationDto {
    columnName: string;
    recommendation?: {
        textRecommendation?: string;
        valueRecommendation?: string;
    };
    state: DataValidationState;
}
