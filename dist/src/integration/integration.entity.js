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
exports.Integration = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../core/types");
const typeorm_1 = require("typeorm");
const integrationState_entity_1 = require("./integrationState.entity");
const dataSource_entity_1 = require("../data-source/dataSource.entity");
const types_2 = require("../core/types");
let Integration = class Integration {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, applicationId: { required: true, enum: require("../core/types").AppIds }, applicationName: { required: true, type: () => String }, applicationDescription: { required: false, type: () => String }, applicationStatus: { required: false, enum: require("../core/types").APPLICATION_STATUS }, applicationIcon: { required: true, type: () => String }, providerName: { required: true, type: () => String }, providerLink: { required: true, type: () => String }, totalInstalls: { required: true, type: () => String }, categories: { required: true, type: () => [String] }, features: { required: true, type: () => [String] }, languages: { required: true, type: () => String }, requirementPermissions: { required: true, type: () => [String] }, subscriptionTitle: { required: true, type: () => String }, subscriptions: { required: true, type: () => String }, subscriptionLink: { required: true, type: () => String }, sort: { required: true, type: () => Number }, type: { required: true, type: () => String }, integratedApps: { required: true, type: () => [require("./integrationState.entity").IntegrationState] }, dataSource: { required: true, type: () => require("../data-source/dataSource.entity").DataSource } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Integration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Integration.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Integration.prototype, "applicationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Integration.prototype, "applicationDescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integration.prototype, "applicationIcon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integration.prototype, "providerName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integration.prototype, "providerLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", String)
], Integration.prototype, "totalInstalls", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'character varying', array: true }),
    __metadata("design:type", Array)
], Integration.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'character varying', array: true }),
    __metadata("design:type", Array)
], Integration.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integration.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'character varying', array: true, nullable: true }),
    __metadata("design:type", Array)
], Integration.prototype, "requirementPermissions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integration.prototype, "subscriptionTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Integration.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Integration.prototype, "subscriptionLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Integration.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: types_2.IntegrationType, default: types_2.IntegrationType.USER }),
    __metadata("design:type", String)
], Integration.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => integrationState_entity_1.IntegrationState, (integratedApp) => integratedApp.integration),
    __metadata("design:type", Array)
], Integration.prototype, "integratedApps", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => dataSource_entity_1.DataSource, (dataSource) => dataSource.integration),
    __metadata("design:type", dataSource_entity_1.DataSource)
], Integration.prototype, "dataSource", void 0);
Integration = __decorate([
    (0, typeorm_1.Entity)()
], Integration);
exports.Integration = Integration;
//# sourceMappingURL=integration.entity.js.map