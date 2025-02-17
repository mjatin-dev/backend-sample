export interface paginationOptions {
  skip: number;
  take: number;
}

export interface MigrationDetail {
  neptuneBulkLoaderId?: string;
}

export enum DataMigrationSchemaObjectType {
  table = 'table',
  constraint = 'constraint',
}
