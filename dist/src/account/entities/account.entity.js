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
var Account_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const openapi = require("@nestjs/swagger");
const contact_entity_1 = require("../../contact/entities/contact.entity");
const deal_entity_1 = require("../../deal/entities/deal.entity");
const industry_entity_1 = require("../../industry/industry.entity");
const tenantAccount_entity_1 = require("../../tenant/entities/tenantAccount.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const accountStage_entity_1 = require("./accountStage.entity");
const accounttContactInformation_entity_1 = require("./accounttContactInformation.entity");
const accountType_entity_1 = require("./accountType.entity");
let Account = Account_1 = class Account {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountId: { required: true, type: () => Number }, accountName: { required: true, type: () => String }, description: { required: true, type: () => String }, company: { required: true, type: () => String }, webURL: { required: true, type: () => String }, industryId: { required: true, type: () => Number }, foundedDate: { required: true, type: () => Date }, employeesNumber: { required: true, type: () => Number }, revenuePerYear: { required: true, type: () => Number }, childOf: { required: true, type: () => Number }, createDate: { required: true, type: () => Date }, updateDate: { required: true, type: () => Date }, createdBy: { required: true, type: () => Number }, tenantUserId: { required: false, type: () => Number }, accountTypeId: { required: true, type: () => Number }, accountStageId: { required: true, type: () => Number }, accountStatus: { required: true, type: () => Boolean }, contacts: { required: false, type: () => [require("../../contact/entities/contact.entity").Contact] }, deals: { required: false, type: () => [require("../../deal/entities/deal.entity").Deal] }, industry: { required: false, type: () => require("../../industry/industry.entity").Industry }, parent: { required: false, type: () => require("./account.entity").Account }, childs: { required: false, type: () => [require("./account.entity").Account] }, accountCreater: { required: false, type: () => require("../../user/entities/user.entity").User }, accountType: { required: false, type: () => require("./accountType.entity").AccountType }, accountStage: { required: false, type: () => require("./accountStage.entity").AccountStage }, tenantUser: { required: false, type: () => require("../../user/entities/user.entity").User }, tenantAccounts: { required: false, type: () => [require("../../tenant/entities/tenantAccount.entity").TenantAccount] }, contactInfo: { required: false, type: () => require("./accounttContactInformation.entity").AccountContactInformation } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Account.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Account.prototype, "webURL", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "industryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Account.prototype, "foundedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "employeesNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "revenuePerYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "childOf", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Account.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Account.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "tenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "accountTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Account.prototype, "accountStageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "accountStatus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (contact) => contact.account),
    __metadata("design:type", Array)
], Account.prototype, "contacts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deal_entity_1.Deal, (deal) => deal.account, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Account.prototype, "deals", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => industry_entity_1.Industry, (industry) => industry.accounts, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'industry_id',
        referencedColumnName: 'industryId',
    }),
    __metadata("design:type", industry_entity_1.Industry)
], Account.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1, (parent) => parent.childs, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'child_of', referencedColumnName: 'accountId' }),
    __metadata("design:type", Account)
], Account.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Account_1, (child) => child.parent),
    __metadata("design:type", Array)
], Account.prototype, "childs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (creater) => creater.createdAccounts),
    (0, typeorm_1.JoinColumn)({
        name: 'created_by',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], Account.prototype, "accountCreater", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accountType_entity_1.AccountType, (accountType) => accountType.account, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'account_type_id',
        referencedColumnName: 'accountTypeId',
    }),
    __metadata("design:type", accountType_entity_1.AccountType)
], Account.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accountStage_entity_1.AccountStage, (accountStage) => accountStage.account, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'account_stage_id',
        referencedColumnName: 'accountStageId',
    }),
    __metadata("design:type", accountStage_entity_1.AccountStage)
], Account.prototype, "accountStage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (tenantUser) => tenantUser.ownedAccounts, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'tenant_user_id',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], Account.prototype, "tenantUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tenantAccount_entity_1.TenantAccount, (tenantAccount) => tenantAccount.account, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Account.prototype, "tenantAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => accounttContactInformation_entity_1.AccountContactInformation, (contactInfo) => contactInfo.account, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", accounttContactInformation_entity_1.AccountContactInformation)
], Account.prototype, "contactInfo", void 0);
Account = Account_1 = __decorate([
    (0, typeorm_1.Entity)()
], Account);
exports.Account = Account;
//# sourceMappingURL=account.entity.js.map