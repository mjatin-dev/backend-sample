"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const google_module_1 = require("../core/lib/google/google.module");
const salesforce_module_1 = require("../core/lib/salesforce/salesforce.module");
const office365_module_1 = require("../core/lib/office365/office365.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const integrationState_repository_1 = require("./integrationState.repository");
const integration_controller_1 = require("./integration.controller");
const integration_repository_1 = require("./integration.repository");
const integration_service_1 = require("./integration.service");
const user_repository_1 = require("../user/repositories/user.repository");
const tenant_module_1 = require("../tenant/tenant.module");
const user_module_1 = require("../user/user.module");
const tenant_repository_1 = require("../tenant/repositories/tenant.repository");
const dataSource_repository_1 = require("../data-source/dataSource.repository");
const dataMigration_repository_1 = require("../data-migration/repositories/dataMigration.repository");
const sqs_module_1 = require("../core/lib/aws/sqs/sqs.module");
let IntegrationModule = class IntegrationModule {
};
IntegrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_repository_1.UserRepository,
                integration_repository_1.IntegrationRepository,
                integrationState_repository_1.IntegrationStateRepository,
                tenant_repository_1.TenantRepository,
                dataSource_repository_1.DataSourceRepository,
                dataMigration_repository_1.DataMigrationRepository,
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            google_module_1.GoogleModule,
            tenant_module_1.TenantModule,
            (0, common_1.forwardRef)(() => salesforce_module_1.SalesforceModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            sqs_module_1.SqsModule,
            office365_module_1.Office365Module,
        ],
        providers: [integration_service_1.IntegrationService],
        controllers: [integration_controller_1.IntegrationController],
        exports: [integration_service_1.IntegrationService],
    })
], IntegrationModule);
exports.IntegrationModule = IntegrationModule;
//# sourceMappingURL=integration.module.js.map