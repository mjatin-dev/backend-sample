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
exports.Activity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const emailActivityDetail_entity_1 = require("./emailActivityDetail.entity");
let Activity = class Activity {
    static _OPENAPI_METADATA_FACTORY() {
        return { activityId: { required: true, type: () => Number }, salePhaseId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, tenantUserId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, activityTypeId: { required: true, type: () => Number }, startDate: { required: true, type: () => Date }, dueDate: { required: true, type: () => Date }, status: { required: true, type: () => String }, contactStageId: { required: true, type: () => Number }, emailActivityThreadId: { required: true, type: () => String }, emailActivityDetails: { required: false, type: () => [require("./emailActivityDetail.entity").EmailActivityDetail] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Activity.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Activity.prototype, "salePhaseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Activity.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Activity.prototype, "tenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Activity.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Activity.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Activity.prototype, "activityTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Activity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Activity.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Activity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Activity.prototype, "contactStageId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Activity.prototype, "emailActivityThreadId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => emailActivityDetail_entity_1.EmailActivityDetail, (emailActivityDetail) => emailActivityDetail.activity),
    __metadata("design:type", Array)
], Activity.prototype, "emailActivityDetails", void 0);
Activity = __decorate([
    (0, typeorm_1.Entity)()
], Activity);
exports.Activity = Activity;
//# sourceMappingURL=activity.entity.js.map