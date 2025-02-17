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
exports.TenantAccount = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("./tenant.entity");
let TenantAccount = class TenantAccount {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantAccountId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: false, type: () => Date }, tenant: { required: false, type: () => require("./tenant.entity").Tenant }, account: { required: false, type: () => require("../../account/entities/account.entity").Account } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TenantAccount.prototype, "tenantAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TenantAccount.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TenantAccount.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], TenantAccount.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], TenantAccount.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TenantAccount.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.tenantAccounts),
    (0, typeorm_1.JoinColumn)({
        name: 'tenant_id',
        referencedColumnName: 'tenantId',
    }),
    __metadata("design:type", tenant_entity_1.Tenant)
], TenantAccount.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.tenantAccounts),
    (0, typeorm_1.JoinColumn)({
        name: 'account_id',
        referencedColumnName: 'accountId',
    }),
    __metadata("design:type", account_entity_1.Account)
], TenantAccount.prototype, "account", void 0);
TenantAccount = __decorate([
    (0, typeorm_1.Entity)()
], TenantAccount);
exports.TenantAccount = TenantAccount;
//# sourceMappingURL=tenantAccount.entity.js.map