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
exports.CreateTenantRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const create_contactInfo_request_dto_1 = require("../../user/dto/create-contactInfo.request.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateTenantRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantName: { required: true, type: () => String }, contactInfo: { required: true, type: () => require("../../user/dto/create-contactInfo.request.dto").ContactInfoDto }, billingContactInfo: { required: true, type: () => require("../../user/dto/create-contactInfo.request.dto").ContactInfoDto }, ownerName: { required: true, type: () => String }, ownerEmail: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTenantRequestDto.prototype, "tenantName", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_contactInfo_request_dto_1.ContactInfoDto),
    __metadata("design:type", create_contactInfo_request_dto_1.ContactInfoDto)
], CreateTenantRequestDto.prototype, "contactInfo", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_contactInfo_request_dto_1.ContactInfoDto),
    __metadata("design:type", create_contactInfo_request_dto_1.ContactInfoDto)
], CreateTenantRequestDto.prototype, "billingContactInfo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTenantRequestDto.prototype, "ownerName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTenantRequestDto.prototype, "ownerEmail", void 0);
exports.CreateTenantRequestDto = CreateTenantRequestDto;
//# sourceMappingURL=create-tenant.request.dto.js.map