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
exports.UserContactInformation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const user_entity_1 = require("./user.entity");
let UserContactInformation = class UserContactInformation {
    static _OPENAPI_METADATA_FACTORY() {
        return { userContInfoId: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, addressType: { required: true, enum: require("../types").AddressType }, isCurrent: { required: true, type: () => Boolean }, startValidDate: { required: true, type: () => Date }, endValidDate: { required: false, type: () => Date }, phoneNumber: { required: false, type: () => String }, mobileNumber: { required: false, type: () => String }, country: { required: false, type: () => String }, zip: { required: false, type: () => String }, addressState: { required: false, type: () => String }, city: { required: false, type: () => String }, street: { required: false, type: () => String }, email: { required: false, type: () => String }, user: { required: true, type: () => require("./user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserContactInformation.prototype, "userContInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserContactInformation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.AddressType.MAILING }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "addressType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserContactInformation.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], UserContactInformation.prototype, "startValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserContactInformation.prototype, "endValidDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "addressState", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContactInformation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.contactInfo, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], UserContactInformation.prototype, "user", void 0);
UserContactInformation = __decorate([
    (0, typeorm_1.Entity)()
], UserContactInformation);
exports.UserContactInformation = UserContactInformation;
//# sourceMappingURL=userContactInformation.entity.js.map