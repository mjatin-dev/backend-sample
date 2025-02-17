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
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
let Product = class Product {
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => Number }, productName: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, enum: require("../types").ProductCategory }, rateChargeType: { required: true, enum: require("../types").ProductRateChargeType }, currency: { required: true, type: () => String, enum: require("../types").ProductCurrency }, price: { required: true, type: () => Number }, createdBy: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, createDate: { required: true, type: () => Date }, productCreator: { required: true, type: () => require("../../user/entities/user.entity").User } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "rateChargeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Product.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (tenantUser) => tenantUser.createdProducts),
    (0, typeorm_1.JoinColumn)({
        name: 'created_by',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "productCreator", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map