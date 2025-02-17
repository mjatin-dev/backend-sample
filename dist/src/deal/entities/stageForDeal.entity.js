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
exports.StageForDeal = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let StageForDeal = class StageForDeal {
    static _OPENAPI_METADATA_FACTORY() {
        return { stageForDealId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, dealStageId: { required: true, type: () => Number }, isCurrent: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StageForDeal.prototype, "stageForDealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StageForDeal.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StageForDeal.prototype, "dealStageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], StageForDeal.prototype, "isCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], StageForDeal.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], StageForDeal.prototype, "endDate", void 0);
StageForDeal = __decorate([
    (0, typeorm_1.Entity)()
], StageForDeal);
exports.StageForDeal = StageForDeal;
//# sourceMappingURL=stageForDeal.entity.js.map