export interface paginationOptions {
    skip: number;
    take: number;
}
export interface MigrationDetail {
    neptuneBulkLoaderId?: string;
}
export declare enum DataMigrationSchemaObjectType {
    table = "table",
    constraint = "constraint"
}
