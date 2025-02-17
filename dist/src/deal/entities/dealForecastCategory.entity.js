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
exports.DealForecastCategory = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let DealForecastCategory = class DealForecastCategory {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealForecastCategoryId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, forecastCategoryId: { required: true, type: () => Number }, percentage: { required: true, type: () => Number }, isCurrent: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DealForecastCategory.prototype, "dealForecastCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealForecastCategory.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealForecastCategory.prototype, "forecastCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], DealForecastCategory.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], DealForecastCategory.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DealForecastCategory.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DealForecastCategory.prototype, "endDate", void 0);
DealForecastCategory = __decorate([
    (0, typeorm_1.Entity)()
], DealForecastCategory);
exports.DealForecastCategory = DealForecastCategory;
//# sourceMappingURL=dealForecastCategory.entity.js.map