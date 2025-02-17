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
exports.DealProduct = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let DealProduct = class DealProduct {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealProductId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, productId: { required: true, type: () => Number }, productPriceBookId: { required: true, type: () => Number }, creatorTenantUserId: { required: true, type: () => Number }, quantity: { required: true, type: () => Number }, totalPrice: { required: true, type: () => Number }, unitPrice: { required: true, type: () => Number }, createdDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "dealProductId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "productPriceBookId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "creatorTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealProduct.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], DealProduct.prototype, "createdDate", void 0);
DealProduct = __decorate([
    (0, typeorm_1.Entity)()
], DealProduct);
exports.DealProduct = DealProduct;
//# sourceMappingURL=dealProduct.entity.js.map