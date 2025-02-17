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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const contact_entity_1 = require("../../contact/entities/contact.entity");
const integrationState_entity_1 = require("../../integration/integrationState.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const jobRoleForTenantUser_entity_1 = require("../../tenantUserJobRole/entities/jobRoleForTenantUser.entity");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const userContactInformation_entity_1 = require("./userContactInformation.entity");
const userPermission_entity_1 = require("./userPermission.entity");
const dataMigration_entity_1 = require("../../data-migration/entities/dataMigration.entity");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, userName: { required: true, type: () => String }, userEmail: { required: true, type: () => String }, userPassword: { required: false, type: () => String }, userType: { required: true, enum: require("../types").UserType }, userCognitoId: { required: true, type: () => String }, userCreatedBy: { required: false, type: () => Number }, userModifiedBy: { required: false, type: () => Number }, userCreatedAt: { required: true, type: () => Date }, userUpdatedAt: { required: true, type: () => Date }, userActive: { required: true, type: () => Boolean }, tenantId: { required: false, type: () => Number }, tenant: { required: false, type: () => require("../../tenant/entities/tenant.entity").Tenant }, contactInfo: { required: false, type: () => require("./userContactInformation.entity").UserContactInformation }, userPermissions: { required: false, type: () => [require("./userPermission.entity").UserPermission] }, integratedApps: { required: false, type: () => [require("../../integration/integrationState.entity").IntegrationState] }, jobRoleForTenantUsers: { required: false, type: () => [require("../../tenantUserJobRole/entities/jobRoleForTenantUser.entity").JobRoleForTenantUser] }, createdAccounts: { required: false, type: () => [require("../../account/entities/account.entity").Account] }, ownedAccounts: { required: false, type: () => [require("../../account/entities/account.entity").Account] }, createdContacts: { required: false, type: () => [require("../../contact/entities/contact.entity").Contact] }, ownedContacts: { required: false, type: () => [require("../../contact/entities/contact.entity").Contact] }, createdProducts: { required: false, type: () => [require("../../product/entities/product.entity").Product] }, dataMigrations: { required: false, type: () => [require("../../data-migration/entities/dataMigration.entity").DataMigration] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "userPassword", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "userCognitoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "userCreatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "userModifiedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], User.prototype, "userCreatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], User.prototype, "userUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "userActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.users, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id', referencedColumnName: 'tenantId' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], User.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userContactInformation_entity_1.UserContactInformation, (contactInfo) => contactInfo.user, { nullable: true }),
    __metadata("design:type", userContactInformation_entity_1.UserContactInformation)
], User.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPermission_entity_1.UserPermission, (userPermission) => userPermission.permission),
    __metadata("design:type", Array)
], User.prototype, "userPermissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => integrationState_entity_1.IntegrationState, (integratedApp) => integratedApp.user),
    __metadata("design:type", Array)
], User.prototype, "integratedApps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobRoleForTenantUser_entity_1.JobRoleForTenantUser, (jobRoleForTenantUser) => jobRoleForTenantUser.user),
    __metadata("design:type", Array)
], User.prototype, "jobRoleForTenantUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, (account) => account.accountCreater),
    __metadata("design:type", Array)
], User.prototype, "createdAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, (account) => account.tenantUser),
    __metadata("design:type", Array)
], User.prototype, "ownedAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (contact) => contact.contactCreator),
    __metadata("design:type", Array)
], User.prototype, "createdContacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (contact) => contact.tenantUser),
    __metadata("design:type", Array)
], User.prototype, "ownedContacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.productCreator),
    __metadata("design:type", Array)
], User.prototype, "createdProducts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dataMigration_entity_1.DataMigration, (dataMigration) => dataMigration.user),
    __metadata("design:type", Array)
], User.prototype, "dataMigrations", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map