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
exports.ValidationPattern = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
var ValidationPatternType;
(function (ValidationPatternType) {
    ValidationPatternType["REGEX"] = "REGEX";
    ValidationPatternType["SERVICE"] = "SERVICE";
})(ValidationPatternType || (ValidationPatternType = {}));
var ValidationPatternValidityService;
(function (ValidationPatternValidityService) {
    ValidationPatternValidityService["DATA_VALIDATION_SERVICE"] = "DATA_VALIDATION_SERVICE";
})(ValidationPatternValidityService || (ValidationPatternValidityService = {}));
var ValidationPatternCategory;
(function (ValidationPatternCategory) {
    ValidationPatternCategory["EMAIL_FORMAT"] = "EMAIL_FORMAT";
    ValidationPatternCategory["EMAIL_VALIDITY"] = "EMAIL_VALIDITY";
    ValidationPatternCategory["PHONE_FORMAT"] = "PHONE_FORMAT";
    ValidationPatternCategory["PHONE_VALIDITY"] = "PHONE_VALIDITY";
})(ValidationPatternCategory || (ValidationPatternCategory = {}));
var ValidationDataType;
(function (ValidationDataType) {
    ValidationDataType["EMAIL"] = "EMAIL";
    ValidationDataType["PHONE"] = "PHONE";
})(ValidationDataType || (ValidationDataType = {}));
let ValidationPattern = class ValidationPattern {
    static _OPENAPI_METADATA_FACTORY() {
        return { validationPatternId: { required: true, type: () => Number }, description: { required: true, type: () => String }, label: { required: true, type: () => String }, expression: { required: true, type: () => String }, example: { required: true, type: () => String }, dataType: { required: true, enum: ValidationDataType }, type: { required: true, enum: ValidationPatternType }, category: { required: true, enum: ValidationPatternCategory }, returnValueSchema: { required: true, type: () => Object }, serviceName: { required: true, type: () => String, enum: ValidationPatternValidityService } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], ValidationPattern.prototype, "validationPatternId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "expression", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "example", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, enum: ValidationDataType }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: ValidationPatternType.REGEX,
        enum: ValidationPatternType,
        nullable: false,
    }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: ValidationPatternCategory.EMAIL_FORMAT,
        enum: ValidationPatternCategory,
        nullable: false,
    }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ValidationPattern.prototype, "returnValueSchema", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: ValidationPatternValidityService,
        nullable: true,
    }),
    __metadata("design:type", String)
], ValidationPattern.prototype, "serviceName", void 0);
ValidationPattern = __decorate([
    (0, typeorm_1.Entity)()
], ValidationPattern);
exports.ValidationPattern = ValidationPattern;
//# sourceMappingURL=rule-validation-pattern.entity.js.map