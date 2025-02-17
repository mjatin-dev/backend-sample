export declare enum APPLICATION_STATUS {
    INSTALLED = "installed",
    NOT_INSTALLED = "not-installed"
}
export declare enum INTEGRATION_SESSION_ID {
    GOOGLE = "google-sessions"
}
export interface IntegrationSession {
    applicationStatus?: APPLICATION_STATUS;
    tokens: string | Record<string, any>;
    email?: string;
    accounId?: string;
    meta?: Record<string, any>;
}
export declare enum AppIds {
    GMAIL = "gmail",
    GOOGLE_CALENDAR = "google-calendar",
    SALESFORCE = "salesforce",
    SALESFORCE_USER = "salesforce-user",
    OFFICE365 = "office365",
    HUBSPOT = "hubspot"
}
export declare enum DataSourceNames {
    SALESFORCE = "Salesforce"
}
export declare enum DataMigrationStatus {
    REQUESTED = "requested",
    DATA_SCHEMA_STARTED = "schema-started",
    DATA_SCHEMA_COMPLETED = "schema-completed",
    DATA_SCHEMA_FAILED = "schema-failed",
    DATA_MIGRATION_STARTED = "migration-started",
    DATA_MIGRATION_COMPLETED = "migration-completed",
    DATA_MIGRATION_FAILED = "migration-failed"
}
export declare enum IntegrationType {
    USER = "user",
    TENANT = "tenant"
}
export declare enum DataSourceType {
    USER = "user",
    TENANT = "tenant"
}
export interface ICallbackQueryParams {
    code?: string;
    scope?: string;
    state?: string;
}
