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
exports.JobRoleForTenantUser = void 0;
const openapi = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const tenantUserJobRole_entity_1 = require("./tenantUserJobRole.entity");
let JobRoleForTenantUser = class JobRoleForTenantUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { jobRoleForTenantUserId: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, tenantUserJobRoleId: { required: true, type: () => Number }, isCurrent: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: false, type: () => Date }, user: { required: false, type: () => require("../../user/entities/user.entity").User }, tenantUserJobRole: { required: false, type: () => require("./tenantUserJobRole.entity").TenantUserJobRole } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobRoleForTenantUser.prototype, "jobRoleForTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JobRoleForTenantUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], JobRoleForTenantUser.prototype, "tenantUserJobRoleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], JobRoleForTenantUser.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], JobRoleForTenantUser.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], JobRoleForTenantUser.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.jobRoleForTenantUsers),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], JobRoleForTenantUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenantUserJobRole_entity_1.TenantUserJobRole, (tenantUserJobRole) => tenantUserJobRole.jobRoleForTenantUsers),
    (0, typeorm_1.JoinColumn)({
        name: 'tenantuserjobroleid',
        referencedColumnName: 'tenantUserJobRoleId',
    }),
    __metadata("design:type", tenantUserJobRole_entity_1.TenantUserJobRole)
], JobRoleForTenantUser.prototype, "tenantUserJobRole", void 0);
JobRoleForTenantUser = __decorate([
    (0, typeorm_1.Entity)()
], JobRoleForTenantUser);
exports.JobRoleForTenantUser = JobRoleForTenantUser;
//# sourceMappingURL=jobRoleForTenantUser.entity.js.map