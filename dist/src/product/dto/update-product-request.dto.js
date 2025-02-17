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
exports.UpdateProductRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const types_1 = require("../types");
class UpdateProductRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => Number }, productName: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, enum: require("../types").ProductCategory }, rateChargeType: { required: true, enum: require("../types").ProductRateChargeType }, currency: { required: true, type: () => String, enum: require("../types").ProductCurrency }, price: { required: true, type: () => Number }, createdBy: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, createDate: { required: true, type: () => Date } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductRequestDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductRequestDto.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductRequestDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ProductCategory),
    __metadata("design:type", String)
], UpdateProductRequestDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ProductRateChargeType),
    __metadata("design:type", String)
], UpdateProductRequestDto.prototype, "rateChargeType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.ProductCurrency),
    __metadata("design:type", String)
], UpdateProductRequestDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductRequestDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductRequestDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProductRequestDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], UpdateProductRequestDto.prototype, "createDate", void 0);
exports.UpdateProductRequestDto = UpdateProductRequestDto;
//# sourceMappingURL=update-product-request.dto.js.map