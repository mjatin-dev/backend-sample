"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantUserJobRoleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenantUserJobRole_service_1 = require("./tenantUserJobRole.service");
const tenantUserJobRole_controller_1 = require("./tenantUserJobRole.controller");
const tenantUserJobRole_repository_1 = require("./repositories/tenantUserJobRole.repository");
const jobRoleForTenantUser_repository_1 = require("./repositories/jobRoleForTenantUser.repository");
let TenantUserJobRoleModule = class TenantUserJobRoleModule {
};
TenantUserJobRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                tenantUserJobRole_repository_1.TenantUserJobRoleRepository,
                jobRoleForTenantUser_repository_1.JobRoleForTenantUserRepository,
            ]),
        ],
        providers: [tenantUserJobRole_service_1.TenantUserJobRoleService],
        controllers: [tenantUserJobRole_controller_1.TenantUserJobRoleController],
    })
], TenantUserJobRoleModule);
exports.TenantUserJobRoleModule = TenantUserJobRoleModule;
//# sourceMappingURL=tenantUserJobRole.module.js.map