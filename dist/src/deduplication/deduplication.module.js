"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeduplicationModule = void 0;
const common_1 = require("@nestjs/common");
const deduplication_config_controller_1 = require("./controllers/deduplication-config.controller");
const deduplication_config_service_1 = require("./services/deduplication-config.service");
const typeorm_1 = require("@nestjs/typeorm");
const deduplication_config_repository_1 = require("./repositories/deduplication-config.repository");
const data_migration_module_1 = require("../data-migration/data-migration.module");
const deduplication_result_controller_1 = require("./controllers/deduplication-result.controller");
const deduplication_result_service_1 = require("./services/deduplication-result.service");
const deduplication_result_repository_1 = require("./repositories/deduplication-result.repository");
const salesforce_module_1 = require("../core/lib/salesforce/salesforce.module");
let DeduplicationModule = class DeduplicationModule {
};
DeduplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([deduplication_config_repository_1.DeDuplicationConfigRepository]),
            data_migration_module_1.DataMigrationModule,
            salesforce_module_1.SalesforceModule,
        ],
        controllers: [deduplication_config_controller_1.DeduplicationConfigController, deduplication_result_controller_1.DeduplicationResultController],
        providers: [
            deduplication_config_service_1.DeduplicationConfigService,
            deduplication_result_service_1.DeduplicationResultService,
            deduplication_result_repository_1.DeduplicationResultRepository,
        ],
    })
], DeduplicationModule);
exports.DeduplicationModule = DeduplicationModule;
//# sourceMappingURL=deduplication.module.js.map