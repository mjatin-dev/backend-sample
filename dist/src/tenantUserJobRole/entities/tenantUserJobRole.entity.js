"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantUserJobRole = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const jobRoleForTenantUser_entity_1 = require("./jobRoleForTenantUser.entity");
let TenantUserJobRole = class TenantUserJobRole {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantUserJobRoleId: { required: true, type: () => Number }, title: { required: true, type: () => String }, code: { required: true, type: () => String }, description: { required: true, type: () => String }, jobRoleForTenantUsers: { required: false, type: () => [require("./jobRoleForTenantUser.entity").JobRoleForTenantUser] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TenantUserJobRole.prototype, "tenantUserJobRoleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TenantUserJobRole.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TenantUserJobRole.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TenantUserJobRole.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobRoleForTenantUser_entity_1.JobRoleForTenantUser, (jobRoleForTenantUser) => jobRoleForTenantUser.tenantUserJobRole),
    __metadata("design:type", Array)
], TenantUserJobRole.prototype, "jobRoleForTenantUsers", void 0);
TenantUserJobRole = __decorate([
    (0, typeorm_1.Entity)()
], TenantUserJobRole);
exports.TenantUserJobRole = TenantUserJobRole;
//# sourceMappingURL=tenantUserJobRole.entity.js.map