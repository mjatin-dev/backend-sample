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
exports.CreateActivityRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const types_1 = require("../types");
const emailActivityDetail_dto_1 = require("./emailActivityDetail.dto");
class CreateActivityRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { salePhaseId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, activityTypeId: { required: true, enum: require("../types").ACTIVITY_TYPE_ID }, status: { required: true, type: () => String }, contactStageId: { required: true, type: () => Number }, emailActivityDetail: { required: true, type: () => require("./emailActivityDetail.dto").EmailActivityDetailDto } };
    }
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "salePhaseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "dealId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "contactId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "activityTypeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityRequestDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateActivityRequestDto.prototype, "contactStageId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => emailActivityDetail_dto_1.EmailActivityDetailDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", emailActivityDetail_dto_1.EmailActivityDetailDto)
], CreateActivityRequestDto.prototype, "emailActivityDetail", void 0);
exports.CreateActivityRequestDto = CreateActivityRequestDto;
//# sourceMappingURL=create-activity.request.dto.js.map