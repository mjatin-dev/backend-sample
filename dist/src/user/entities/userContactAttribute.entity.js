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
exports.UserContactAttribute = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let UserContactAttribute = class UserContactAttribute {
    static _OPENAPI_METADATA_FACTORY() {
        return { UserContactAttributeId: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, attributeTitle: { required: true, type: () => String }, attributeText: { required: true, type: () => String }, createdDate: { required: true, type: () => Date }, tenantId: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserContactAttribute.prototype, "UserContactAttributeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserContactAttribute.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserContactAttribute.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserContactAttribute.prototype, "attributeTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserContactAttribute.prototype, "attributeText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], UserContactAttribute.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserContactAttribute.prototype, "tenantId", void 0);
UserContactAttribute = __decorate([
    (0, typeorm_1.Entity)()
], UserContactAttribute);
exports.UserContactAttribute = UserContactAttribute;
//# sourceMappingURL=userContactAttribute.entity.js.map