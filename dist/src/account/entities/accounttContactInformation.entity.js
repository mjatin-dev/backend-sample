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
exports.AccountContactInformation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const types_1 = require("../../user/types");
const account_entity_1 = require("./account.entity");
let AccountContactInformation = class AccountContactInformation {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountContInfoId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, addressType: { required: false, enum: require("../../user/types").AddressType }, isCurrent: { required: false, type: () => Boolean }, startValidDate: { required: true, type: () => Date }, endValidDate: { required: false, type: () => Date }, phoneNumber: { required: false, type: () => String }, mobileNumber: { required: false, type: () => String }, country: { required: false, type: () => String }, zip: { required: false, type: () => String }, addressState: { required: false, type: () => String }, city: { required: false, type: () => String }, street: { required: false, type: () => String }, email: { required: false, type: () => String }, account: { required: false, type: () => require("./account.entity").Account } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccountContactInformation.prototype, "accountContInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AccountContactInformation.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.AddressType.MAILING }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "addressType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], AccountContactInformation.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], AccountContactInformation.prototype, "startValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AccountContactInformation.prototype, "endValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "addressState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountContactInformation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => account_entity_1.Account, (account) => account.contactInfo, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'account_id',
        referencedColumnName: 'accountId',
    }),
    __metadata("design:type", account_entity_1.Account)
], AccountContactInformation.prototype, "account", void 0);
AccountContactInformation = __decorate([
    (0, typeorm_1.Entity)()
], AccountContactInformation);
exports.AccountContactInformation = AccountContactInformation;
//# sourceMappingURL=accounttContactInformation.entity.js.map