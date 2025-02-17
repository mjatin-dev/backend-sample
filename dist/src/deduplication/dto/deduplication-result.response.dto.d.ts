export declare class DeduplicationResultDto {
    id: string;
    record_a_id: string;
    record_b_id: string;
    record_a_table: string;
    record_b_table: string;
    result: object;
    ai_recommendation: object;
    duplication_score: number;
    master_record_id: string;
}
export declare class DeduplicationResultByIdsRequestDto {
    ids: string[];
}
