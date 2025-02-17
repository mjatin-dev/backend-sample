"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ProductResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => Number }, productName: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, type: () => String }, rateChargeType: { required: true, type: () => String }, price: { required: true, type: () => Number }, currency: { required: true, type: () => String }, createdBy: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, createDate: { required: true, type: () => Date } };
    }
}
exports.ProductResponseDto = ProductResponseDto;
//# sourceMappingURL=product.response.dto.js.map