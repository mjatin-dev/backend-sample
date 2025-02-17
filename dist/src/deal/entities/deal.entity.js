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
exports.Deal = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const contact_entity_1 = require("../../contact/entities/contact.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const typeorm_1 = require("typeorm");
let Deal = class Deal {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealId: { required: true, type: () => Number }, dealName: { required: true, type: () => String }, description: { required: true, type: () => String }, pipelineId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, tenantUserId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, campaignId: { required: true, type: () => Number }, createdBy: { required: true, type: () => Number }, totalAmount: { required: true, type: () => Number }, currency: { required: true, type: () => String }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date }, createdDate: { required: true, type: () => Date }, updateDate: { required: true, type: () => Date }, account: { required: false, type: () => require("../../account/entities/account.entity").Account }, contact: { required: false, type: () => require("../../contact/entities/contact.entity").Contact }, tenant: { required: false, type: () => require("../../tenant/entities/tenant.entity").Tenant } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Deal.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Deal.prototype, "dealName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Deal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "pipelineId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "tenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "campaignId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Deal.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], Deal.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Deal.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Deal.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Deal.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Deal.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Deal.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.deals, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'account_id',
        referencedColumnName: 'accountId',
    }),
    __metadata("design:type", account_entity_1.Account)
], Deal.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contact_entity_1.Contact, (contact) => contact.deals, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'contact_id',
        referencedColumnName: 'contactId',
    }),
    __metadata("design:type", contact_entity_1.Contact)
], Deal.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.deals, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'tenant_id',
        referencedColumnName: 'tenantId',
    }),
    __metadata("design:type", tenant_entity_1.Tenant)
], Deal.prototype, "tenant", void 0);
Deal = __decorate([
    (0, typeorm_1.Entity)()
], Deal);
exports.Deal = Deal;
//# sourceMappingURL=deal.entity.js.map