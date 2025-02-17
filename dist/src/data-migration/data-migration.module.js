"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMigrationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dataMigration_repository_1 = require("./repositories/dataMigration.repository");
const dataMigrationSchema_repository_1 = require("./repositories/dataMigrationSchema.repository");
const dataMigrationSchemaObject_repository_1 = require("./repositories/dataMigrationSchemaObject.repository");
const dataMigrationEventBusIntegration_repository_1 = require("./repositories/dataMigrationEventBusIntegration.repository");
const data_migration_controller_1 = require("./data-migration.controller");
const data_migration_service_1 = require("./services/data-migration.service");
const data_source_module_1 = require("../data-source/data-source.module");
const sqs_module_1 = require("../core/lib/aws/sqs/sqs.module");
const data_migration_schema_service_1 = require("./services/data-migration-schema.service");
const salesforce_module_1 = require("../core/lib/salesforce/salesforce.module");
let DataMigrationModule = class DataMigrationModule {
};
DataMigrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            data_source_module_1.DataSourceModule,
            typeorm_1.TypeOrmModule.forFeature([
                dataMigration_repository_1.DataMigrationRepository,
                dataMigrationSchemaObject_repository_1.DataMigrationSchemaObjectRepository,
                dataMigrationEventBusIntegration_repository_1.DataMigrationEventBusIntegrationRepository,
            ]),
            sqs_module_1.SqsModule,
            salesforce_module_1.SalesforceModule,
        ],
        controllers: [data_migration_controller_1.DataMigrationController],
        providers: [
            data_migration_service_1.DataMigrationService,
            data_migration_schema_service_1.DataMigrationSchemaService,
            dataMigrationSchema_repository_1.DataMigrationSchemaRepository,
        ],
        exports: [
            data_migration_service_1.DataMigrationService,
            data_migration_schema_service_1.DataMigrationSchemaService,
            dataMigrationSchema_repository_1.DataMigrationSchemaRepository,
        ],
    })
], DataMigrationModule);
exports.DataMigrationModule = DataMigrationModule;
//# sourceMappingURL=data-migration.module.js.map