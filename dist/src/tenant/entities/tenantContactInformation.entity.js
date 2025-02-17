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
exports.TenantContactInformation = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../user/types");
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("./tenant.entity");
let TenantContactInformation = class TenantContactInformation {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantContInfoId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, addressType: { required: true, enum: require("../../user/types").AddressType }, isCurrent: { required: true, type: () => Boolean }, startValidDate: { required: true, type: () => Date }, endValidDate: { required: false, type: () => Date }, phoneNumber: { required: false, type: () => String }, mobileNumber: { required: false, type: () => String }, country: { required: false, type: () => String }, zip: { required: false, type: () => String }, addressState: { required: false, type: () => String }, city: { required: false, type: () => String }, street: { required: false, type: () => String }, email: { required: false, type: () => String }, tenant: { required: false, type: () => require("./tenant.entity").Tenant } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TenantContactInformation.prototype, "tenantContInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TenantContactInformation.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.AddressType.MAILING }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "addressType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], TenantContactInformation.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], TenantContactInformation.prototype, "startValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TenantContactInformation.prototype, "endValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "addressState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TenantContactInformation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.contactInfos, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'tenant_id',
        referencedColumnName: 'tenantId',
    }),
    __metadata("design:type", tenant_entity_1.Tenant)
], TenantContactInformation.prototype, "tenant", void 0);
TenantContactInformation = __decorate([
    (0, typeorm_1.Entity)()
], TenantContactInformation);
exports.TenantContactInformation = TenantContactInformation;
//# sourceMappingURL=tenantContactInformation.entity.js.map