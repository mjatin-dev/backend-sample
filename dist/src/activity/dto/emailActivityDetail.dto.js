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
exports.EmailActivityDetailDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class EmailActivityDetailDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { emailFrom: { required: true, type: () => String }, emailTo: { required: true, type: () => String }, emailSubject: { required: true, type: () => String }, emailBody: { required: true, type: () => String }, emailDate: { required: true, type: () => Date }, emailTime: { required: true, type: () => Date }, hasAttachment: { required: true, type: () => Boolean }, email: { required: true, type: () => String }, replyToEmailId: { required: true, type: () => Number }, emailTypeId: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailActivityDetailDto.prototype, "emailFrom", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailActivityDetailDto.prototype, "emailTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailActivityDetailDto.prototype, "emailSubject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailActivityDetailDto.prototype, "emailBody", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EmailActivityDetailDto.prototype, "emailDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EmailActivityDetailDto.prototype, "emailTime", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], EmailActivityDetailDto.prototype, "hasAttachment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmailActivityDetailDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmailActivityDetailDto.prototype, "replyToEmailId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmailActivityDetailDto.prototype, "emailTypeId", void 0);
exports.EmailActivityDetailDto = EmailActivityDetailDto;
//# sourceMappingURL=emailActivityDetail.dto.js.map