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
exports.UpdateTenantRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const update_contactInfo_request_dto_1 = require("../../user/dto/update-contactInfo.request.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateTenantRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantName: { required: true, type: () => String }, userName: { required: false, type: () => String }, userEmail: { required: false, type: () => String }, contactInfo: { required: true, type: () => require("../../user/dto/update-contactInfo.request.dto").UpdateContactInfoDto }, billingContactInfo: { required: true, type: () => require("../../user/dto/update-contactInfo.request.dto").UpdateContactInfoDto } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTenantRequestDto.prototype, "tenantName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTenantRequestDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTenantRequestDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => update_contactInfo_request_dto_1.UpdateContactInfoDto),
    __metadata("design:type", update_contactInfo_request_dto_1.UpdateContactInfoDto)
], UpdateTenantRequestDto.prototype, "contactInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => update_contactInfo_request_dto_1.UpdateContactInfoDto),
    __metadata("design:type", update_contactInfo_request_dto_1.UpdateContactInfoDto)
], UpdateTenantRequestDto.prototype, "billingContactInfo", void 0);
exports.UpdateTenantRequestDto = UpdateTenantRequestDto;
//# sourceMappingURL=update-tenant.request.dto.js.map