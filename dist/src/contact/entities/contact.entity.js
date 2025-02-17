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
exports.Contact = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const deal_entity_1 = require("../../deal/entities/deal.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const contactContactInformation_entity_1 = require("./contactContactInformation.entity");
const contactSource_entity_1 = require("./contactSource.entity");
const contactStage_entity_1 = require("./contactStage.entity");
const contactStatus_entity_1 = require("./contactStatus.entity");
let Contact = class Contact {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactId: { required: true, type: () => Number }, ssid: { required: true, type: () => String }, firstName: { required: true, type: () => String }, middleName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, title: { required: true, type: () => String }, image: { required: true, type: () => String }, createDate: { required: true, type: () => Date }, updateDate: { required: true, type: () => Date }, workDepartmentId: { required: true, type: () => Number }, reportsTo: { required: true, type: () => Number }, contactStageId: { required: true, type: () => Number }, contactStatusId: { required: true, type: () => Number }, contactSourceId: { required: true, type: () => Number }, contactType: { required: true, enum: require("../types").ContactType }, createdBy: { required: true, type: () => Number }, tenantUserId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, account: { required: false, type: () => require("../../account/entities/account.entity").Account }, deals: { required: false, type: () => [require("../../deal/entities/deal.entity").Deal] }, contactCreator: { required: false, type: () => require("../../user/entities/user.entity").User }, tenantUser: { required: false, type: () => require("../../user/entities/user.entity").User }, contactInfo: { required: true, type: () => require("./contactContactInformation.entity").ContactContactInformation }, contactStage: { required: false, type: () => require("./contactStage.entity").ContactStage }, contactStatus: { required: false, type: () => require("./contactStatus.entity").ContactStatus }, contactSource: { required: false, type: () => require("./contactSource.entity").ContactSource } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contact.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "ssid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contact.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Contact.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Contact.prototype, "updateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "workDepartmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "reportsTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "contactStageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "contactStatusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "contactSourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.ContactType.ACTIVE }),
    __metadata("design:type", String)
], Contact.prototype, "contactType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Contact.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "tenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Contact.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.contacts, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'account_id',
        referencedColumnName: 'accountId',
    }),
    __metadata("design:type", account_entity_1.Account)
], Contact.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deal_entity_1.Deal, (deal) => deal.contact),
    __metadata("design:type", Array)
], Contact.prototype, "deals", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (creater) => creater.createdContacts),
    (0, typeorm_1.JoinColumn)({
        name: 'created_by',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], Contact.prototype, "contactCreator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (tenantUser) => tenantUser.ownedContacts),
    (0, typeorm_1.JoinColumn)({
        name: 'tenant_user_id',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], Contact.prototype, "tenantUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contactContactInformation_entity_1.ContactContactInformation, (contactContactInformation) => contactContactInformation.contact),
    __metadata("design:type", contactContactInformation_entity_1.ContactContactInformation)
], Contact.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contactStage_entity_1.ContactStage, (contactStage) => contactStage.contact, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'contact_stage_id',
        referencedColumnName: 'contactStageId',
    }),
    __metadata("design:type", contactStage_entity_1.ContactStage)
], Contact.prototype, "contactStage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contactStatus_entity_1.ContactStatus, (contactStatus) => contactStatus.contact, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'contact_status_id',
        referencedColumnName: 'contactStatusId',
    }),
    __metadata("design:type", contactStatus_entity_1.ContactStatus)
], Contact.prototype, "contactStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contactSource_entity_1.ContactSource, (contactSource) => contactSource.contact, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'contact_source_id',
        referencedColumnName: 'contactSourceId',
    }),
    __metadata("design:type", contactSource_entity_1.ContactSource)
], Contact.prototype, "contactSource", void 0);
Contact = __decorate([
    (0, typeorm_1.Entity)()
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map