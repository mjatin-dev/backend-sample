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
exports.RecommendationActionDto = exports.RecommendationActionEnum = exports.UpdateRecommendationFeedbackDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateRecommendationFeedbackDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, liked: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], UpdateRecommendationFeedbackDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Boolean)
], UpdateRecommendationFeedbackDto.prototype, "liked", void 0);
exports.UpdateRecommendationFeedbackDto = UpdateRecommendationFeedbackDto;
var RecommendationActionEnum;
(function (RecommendationActionEnum) {
    RecommendationActionEnum["ACCEPT"] = "accept";
    RecommendationActionEnum["IGNORE"] = "reject";
})(RecommendationActionEnum = exports.RecommendationActionEnum || (exports.RecommendationActionEnum = {}));
class RecommendationActionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { recommendationId: { required: true, type: () => String }, fieldName: { required: true, type: () => String }, action: { required: true, type: () => String }, value: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], RecommendationActionDto.prototype, "recommendationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], RecommendationActionDto.prototype, "fieldName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(RecommendationActionEnum),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecommendationActionDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", String)
], RecommendationActionDto.prototype, "value", void 0);
exports.RecommendationActionDto = RecommendationActionDto;
//# sourceMappingURL=update-recommendation-feedback.dto.js.map