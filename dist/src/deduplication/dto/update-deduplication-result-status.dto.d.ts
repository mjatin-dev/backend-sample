export declare enum DeduplicationResultStatus {
    ACTIVE = "A",
    IGNORED = "I"
}
export declare class UpdateDeduplicationResultStatusRequest {
    status: DeduplicationResultStatus;
    resultIds: string[];
}
export declare class MergeDuplicatedRecordsRequest {
    masterRecordId: string;
    duplicateRecordIds: string[];
    overWriteValues: Record<string, any>;
    objectType: string;
}
