"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_service_1 = require("./services/tenant.service");
const tenant_controller_1 = require("./tenant.controller");
const user_module_1 = require("../user/user.module");
const tenant_repository_1 = require("./repositories/tenant.repository");
const auth_module_1 = require("../auth/auth.module");
const tenantContactInformation_repository_1 = require("./repositories/tenantContactInformation.repository");
const tenantAccount_repository_1 = require("./repositories/tenantAccount.repository");
const tenantContactInformation_service_1 = require("./services/tenantContactInformation.service");
let TenantModule = class TenantModule {
};
TenantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tenant_repository_1.TenantRepository,
                tenantContactInformation_repository_1.TenantContactInformationRepository,
                tenantAccount_repository_1.TenantAccountRepository,
            ]),
            user_module_1.UserModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [tenant_service_1.TenantService, tenantContactInformation_service_1.TenantContactInformationService],
        controllers: [tenant_controller_1.TenantController],
        exports: [tenant_service_1.TenantService],
    })
], TenantModule);
exports.TenantModule = TenantModule;
//# sourceMappingURL=tenant.module.js.map