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
exports.MeetingActivityDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let MeetingActivityDetail = class MeetingActivityDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { meetingActivityDetailId: { required: true, type: () => Number }, activityId: { required: true, type: () => Number }, meetingDate: { required: true, type: () => Date }, meetingTime: { required: true, type: () => Date }, subject: { required: true, type: () => String }, durationInMinutes: { required: true, type: () => Number }, description: { required: true, type: () => String }, meetingRecord: { required: true, type: () => String }, dueDate: { required: true, type: () => Date }, status: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MeetingActivityDetail.prototype, "meetingActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MeetingActivityDetail.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], MeetingActivityDetail.prototype, "meetingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], MeetingActivityDetail.prototype, "meetingTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MeetingActivityDetail.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MeetingActivityDetail.prototype, "durationInMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MeetingActivityDetail.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MeetingActivityDetail.prototype, "meetingRecord", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MeetingActivityDetail.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MeetingActivityDetail.prototype, "status", void 0);
MeetingActivityDetail = __decorate([
    (0, typeorm_1.Entity)()
], MeetingActivityDetail);
exports.MeetingActivityDetail = MeetingActivityDetail;
//# sourceMappingURL=meetingActivityDetail.entity.js.map