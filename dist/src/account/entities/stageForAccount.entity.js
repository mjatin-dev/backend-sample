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
exports.StageForAccount = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let StageForAccount = class StageForAccount {
    static _OPENAPI_METADATA_FACTORY() {
        return { stageForAccountId: { required: true, type: () => Number }, accountStageId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, isCurrentStage: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: false, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StageForAccount.prototype, "stageForAccountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StageForAccount.prototype, "accountStageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StageForAccount.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], StageForAccount.prototype, "isCurrentStage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], StageForAccount.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], StageForAccount.prototype, "endDate", void 0);
StageForAccount = __decorate([
    (0, typeorm_1.Entity)()
], StageForAccount);
exports.StageForAccount = StageForAccount;
//# sourceMappingURL=stageForAccount.entity.js.map