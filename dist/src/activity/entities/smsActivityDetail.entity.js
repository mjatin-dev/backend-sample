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
exports.SmsActivityDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let SmsActivityDetail = class SmsActivityDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { smsActivityDetailId: { required: true, type: () => Number }, activityId: { required: true, type: () => Number }, smsDate: { required: true, type: () => Date }, smsTime: { required: true, type: () => Date }, smsTitle: { required: true, type: () => String }, smsText: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SmsActivityDetail.prototype, "smsActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SmsActivityDetail.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], SmsActivityDetail.prototype, "smsDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], SmsActivityDetail.prototype, "smsTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsActivityDetail.prototype, "smsTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SmsActivityDetail.prototype, "smsText", void 0);
SmsActivityDetail = __decorate([
    (0, typeorm_1.Entity)()
], SmsActivityDetail);
exports.SmsActivityDetail = SmsActivityDetail;
//# sourceMappingURL=smsActivityDetail.entity.js.map