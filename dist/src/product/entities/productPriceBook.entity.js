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
exports.ProductPriceBook = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let ProductPriceBook = class ProductPriceBook {
    static _OPENAPI_METADATA_FACTORY() {
        return { productPriceBookId: { required: true, type: () => Number }, productId: { required: true, type: () => Number }, priceBookId: { required: true, type: () => Number }, price: { required: true, type: () => Number }, currency: { required: true, type: () => String }, isActive: { required: true, type: () => String }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductPriceBook.prototype, "productPriceBookId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductPriceBook.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductPriceBook.prototype, "priceBookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], ProductPriceBook.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductPriceBook.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductPriceBook.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductPriceBook.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ProductPriceBook.prototype, "endDate", void 0);
ProductPriceBook = __decorate([
    (0, typeorm_1.Entity)()
], ProductPriceBook);
exports.ProductPriceBook = ProductPriceBook;
//# sourceMappingURL=productPriceBook.entity.js.map