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
exports.Tenant = void 0;
const openapi = require("@nestjs/swagger");
const deal_entity_1 = require("../../deal/entities/deal.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const tenantAccount_entity_1 = require("./tenantAccount.entity");
const tenantContactInformation_entity_1 = require("./tenantContactInformation.entity");
const dataMigration_entity_1 = require("../../data-migration/entities/dataMigration.entity");
const integrationState_entity_1 = require("../../integration/integrationState.entity");
let Tenant = class Tenant {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantId: { required: true, type: () => Number }, tenantName: { required: true, type: () => String }, industryId: { required: false, type: () => Number }, webURL: { required: false, type: () => String }, employeesNumber: { required: false, type: () => String }, suggestedDomain: { required: false, type: () => String }, subscriptionDate: { required: false, type: () => Date }, createDate: { required: true, type: () => Date }, ownerId: { required: true, type: () => Number }, contactInfos: { required: false, type: () => [require("./tenantContactInformation.entity").TenantContactInformation] }, owner: { required: true, type: () => require("../../user/entities/user.entity").User }, users: { required: true, type: () => [require("../../user/entities/user.entity").User] }, tenantAccounts: { required: true, type: () => [require("./tenantAccount.entity").TenantAccount] }, deals: { required: false, type: () => [require("../../deal/entities/deal.entity").Deal] }, dataMigrations: { required: false, type: () => [require("../../data-migration/entities/dataMigration.entity").DataMigration] }, integrationStates: { required: false, type: () => [require("../../integration/integrationState.entity").IntegrationState] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tenant.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "tenantName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tenant.prototype, "industryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "webURL", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "employeesNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "suggestedDomain", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Tenant.prototype, "subscriptionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Tenant.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tenant.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tenantContactInformation_entity_1.TenantContactInformation, (contactInfo) => contactInfo.tenant, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Tenant.prototype, "contactInfos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Tenant.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.tenant, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Tenant.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tenantAccount_entity_1.TenantAccount, (tenantAccount) => tenantAccount.tenant, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Tenant.prototype, "tenantAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deal_entity_1.Deal, (deal) => deal.contact),
    __metadata("design:type", Array)
], Tenant.prototype, "deals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dataMigration_entity_1.DataMigration, (dataMigration) => dataMigration.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "dataMigrations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => integrationState_entity_1.IntegrationState, (integrationState) => integrationState.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "integrationStates", void 0);
Tenant = __decorate([
    (0, typeorm_1.Entity)()
], Tenant);
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.entity.js.map