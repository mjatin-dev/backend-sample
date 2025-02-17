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
exports.IntegrationState = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const integration_entity_1 = require("./integration.entity");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
let IntegrationState = class IntegrationState {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, tenantId: { required: false, type: () => Number }, userId: { required: false, type: () => Number }, user: { required: true, type: () => require("../user/entities/user.entity").User }, tenant: { required: true, type: () => require("../tenant/entities/tenant.entity").Tenant }, integration: { required: true, type: () => require("./integration.entity").Integration }, session: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IntegrationState.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], IntegrationState.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], IntegrationState.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.integratedApps, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], IntegrationState.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.dataMigrations),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id', referencedColumnName: 'tenantId' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], IntegrationState.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => integration_entity_1.Integration, (integration) => integration.integratedApps),
    __metadata("design:type", integration_entity_1.Integration)
], IntegrationState.prototype, "integration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], IntegrationState.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IntegrationState.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], IntegrationState.prototype, "updatedAt", void 0);
IntegrationState = __decorate([
    (0, typeorm_1.Entity)()
], IntegrationState);
exports.IntegrationState = IntegrationState;
//# sourceMappingURL=integrationState.entity.js.map