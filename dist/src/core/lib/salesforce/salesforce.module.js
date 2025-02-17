"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceModule = void 0;
const integration_repository_1 = require("../../../integration/integration.repository");
const integrationState_repository_1 = require("../../../integration/integrationState.repository");
const user_repository_1 = require("../../../user/repositories/user.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const salesforce_auth_service_1 = require("./salesforce-auth.service");
const salesforce_merge_service_1 = require("./salesforce-merge.service");
const salesforce_schema_service_1 = require("./salesforce-schema.service");
const kms_module_1 = require("../aws/kms/kms.module");
const integration_module_1 = require("../../../integration/integration.module");
let SalesforceModule = class SalesforceModule {
};
SalesforceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_repository_1.UserRepository,
                integration_repository_1.IntegrationRepository,
                integrationState_repository_1.IntegrationStateRepository,
            ]),
            kms_module_1.KmsModule,
            (0, common_1.forwardRef)(() => integration_module_1.IntegrationModule),
        ],
        providers: [
            salesforce_auth_service_1.SalesforceAuthService,
            salesforce_merge_service_1.SalesforceMergeService,
            salesforce_schema_service_1.SalesforceSchemaService,
        ],
        exports: [
            salesforce_auth_service_1.SalesforceAuthService,
            salesforce_merge_service_1.SalesforceMergeService,
            salesforce_schema_service_1.SalesforceSchemaService,
        ],
    })
], SalesforceModule);
exports.SalesforceModule = SalesforceModule;
//# sourceMappingURL=salesforce.module.js.map