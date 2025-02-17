"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceType = exports.IntegrationType = exports.DataMigrationStatus = exports.DataSourceNames = exports.AppIds = exports.INTEGRATION_SESSION_ID = exports.APPLICATION_STATUS = void 0;
var APPLICATION_STATUS;
(function (APPLICATION_STATUS) {
    APPLICATION_STATUS["INSTALLED"] = "installed";
    APPLICATION_STATUS["NOT_INSTALLED"] = "not-installed";
})(APPLICATION_STATUS = exports.APPLICATION_STATUS || (exports.APPLICATION_STATUS = {}));
var INTEGRATION_SESSION_ID;
(function (INTEGRATION_SESSION_ID) {
    INTEGRATION_SESSION_ID["GOOGLE"] = "google-sessions";
})(INTEGRATION_SESSION_ID = exports.INTEGRATION_SESSION_ID || (exports.INTEGRATION_SESSION_ID = {}));
var AppIds;
(function (AppIds) {
    AppIds["GMAIL"] = "gmail";
    AppIds["GOOGLE_CALENDAR"] = "google-calendar";
    AppIds["SALESFORCE"] = "salesforce";
    AppIds["SALESFORCE_USER"] = "salesforce-user";
    AppIds["OFFICE365"] = "office365";
    AppIds["HUBSPOT"] = "hubspot";
})(AppIds = exports.AppIds || (exports.AppIds = {}));
var DataSourceNames;
(function (DataSourceNames) {
    DataSourceNames["SALESFORCE"] = "Salesforce";
})(DataSourceNames = exports.DataSourceNames || (exports.DataSourceNames = {}));
var DataMigrationStatus;
(function (DataMigrationStatus) {
    DataMigrationStatus["REQUESTED"] = "requested";
    DataMigrationStatus["DATA_SCHEMA_STARTED"] = "schema-started";
    DataMigrationStatus["DATA_SCHEMA_COMPLETED"] = "schema-completed";
    DataMigrationStatus["DATA_SCHEMA_FAILED"] = "schema-failed";
    DataMigrationStatus["DATA_MIGRATION_STARTED"] = "migration-started";
    DataMigrationStatus["DATA_MIGRATION_COMPLETED"] = "migration-completed";
    DataMigrationStatus["DATA_MIGRATION_FAILED"] = "migration-failed";
})(DataMigrationStatus = exports.DataMigrationStatus || (exports.DataMigrationStatus = {}));
var IntegrationType;
(function (IntegrationType) {
    IntegrationType["USER"] = "user";
    IntegrationType["TENANT"] = "tenant";
})(IntegrationType = exports.IntegrationType || (exports.IntegrationType = {}));
var DataSourceType;
(function (DataSourceType) {
    DataSourceType["USER"] = "user";
    DataSourceType["TENANT"] = "tenant";
})(DataSourceType = exports.DataSourceType || (exports.DataSourceType = {}));
//# sourceMappingURL=types.js.map