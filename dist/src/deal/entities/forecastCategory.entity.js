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
exports.ForecastCategory = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let ForecastCategory = class ForecastCategory {
    static _OPENAPI_METADATA_FACTORY() {
        return { forecastCategoryId: { required: true, type: () => Number }, forecastCategoryName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ForecastCategory.prototype, "forecastCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ForecastCategory.prototype, "forecastCategoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ForecastCategory.prototype, "description", void 0);
ForecastCategory = __decorate([
    (0, typeorm_1.Entity)()
], ForecastCategory);
exports.ForecastCategory = ForecastCategory;
//# sourceMappingURL=forecastCategory.entity.js.map