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
exports.ContactContactInformation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const types_1 = require("../../user/types");
const contact_entity_1 = require("./contact.entity");
let ContactContactInformation = class ContactContactInformation {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactContInfoId: { required: true, type: () => Number }, contactId: { required: false, type: () => Number }, addressType: { required: false, enum: require("../../user/types").AddressType }, isCurrent: { required: false, type: () => Boolean }, startValidDate: { required: false, type: () => Date }, endValidDate: { required: false, type: () => Date }, phoneNumber: { required: true, type: () => String }, mobileNumber: { required: false, type: () => String }, country: { required: true, type: () => String }, zip: { required: true, type: () => String }, addressState: { required: true, type: () => String }, city: { required: true, type: () => String }, street: { required: true, type: () => String }, email: { required: true, type: () => String }, contact: { required: true, type: () => require("./contact.entity").Contact } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContactContactInformation.prototype, "contactContInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ContactContactInformation.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.AddressType.MAILING }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "addressType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ContactContactInformation.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], ContactContactInformation.prototype, "startValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ContactContactInformation.prototype, "endValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "addressState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactContactInformation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contact_entity_1.Contact, (contact) => contact.contactInfo, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'contact_id', referencedColumnName: 'contactId' }),
    __metadata("design:type", contact_entity_1.Contact)
], ContactContactInformation.prototype, "contact", void 0);
ContactContactInformation = __decorate([
    (0, typeorm_1.Entity)()
], ContactContactInformation);
exports.ContactContactInformation = ContactContactInformation;
//# sourceMappingURL=contactContactInformation.entity.js.map