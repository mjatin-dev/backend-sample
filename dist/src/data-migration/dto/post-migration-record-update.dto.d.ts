declare enum updateTypeEnum {
    INSERT = "insert",
    UPDATE = "update",
    DELETE = "delete"
}
export declare class RecordUpdate {
    table: string;
    type: updateTypeEnum;
    data: any[];
}
export declare class PostMigrationRecordUpdateDto {
    updates: RecordUpdate[];
}
export declare class PostTableRecordUpdateDto {
    updates: any[];
}
export {};
