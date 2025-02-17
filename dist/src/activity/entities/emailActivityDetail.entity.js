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
exports.EmailActivityDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const activity_entity_1 = require("./activity.entity");
const emailType_entity_1 = require("./emailType.entity");
let EmailActivityDetail = class EmailActivityDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { emailActivityDetailId: { required: true, type: () => Number }, activityId: { required: true, type: () => Number }, emailMessageId: { required: true, type: () => String }, emailFrom: { required: true, type: () => String }, emailTo: { required: true, type: () => String }, emailSubject: { required: true, type: () => String }, emailBody: { required: true, type: () => String }, emailDate: { required: true, type: () => Date }, hasAttachment: { required: true, type: () => Boolean }, email: { required: true, type: () => String }, replyToEmailId: { required: true, type: () => Number }, emailTypeId: { required: true, type: () => Number }, activity: { required: false, type: () => require("./activity.entity").Activity }, emailType: { required: false, type: () => require("./emailType.entity").EmailType } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmailActivityDetail.prototype, "emailActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmailActivityDetail.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], EmailActivityDetail.prototype, "emailMessageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailActivityDetail.prototype, "emailFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailActivityDetail.prototype, "emailTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailActivityDetail.prototype, "emailSubject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EmailActivityDetail.prototype, "emailBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], EmailActivityDetail.prototype, "emailDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], EmailActivityDetail.prototype, "hasAttachment", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailActivityDetail.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EmailActivityDetail.prototype, "replyToEmailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmailActivityDetail.prototype, "emailTypeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_entity_1.Activity, (activity) => activity.emailActivityDetails, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'activity_id',
        referencedColumnName: 'activityId',
    }),
    __metadata("design:type", activity_entity_1.Activity)
], EmailActivityDetail.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => emailType_entity_1.EmailType, (emailType) => emailType.emailActivityDetails, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'email_type_id',
        referencedColumnName: 'emailTypeId',
    }),
    __metadata("design:type", emailType_entity_1.EmailType)
], EmailActivityDetail.prototype, "emailType", void 0);
EmailActivityDetail = __decorate([
    (0, typeorm_1.Entity)()
], EmailActivityDetail);
exports.EmailActivityDetail = EmailActivityDetail;
//# sourceMappingURL=emailActivityDetail.entity.js.map