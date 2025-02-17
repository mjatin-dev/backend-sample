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
exports.DeduplicationResultByIdsRequestDto = exports.DeduplicationResultDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeduplicationResultDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, record_a_id: { required: true, type: () => String }, record_b_id: { required: true, type: () => String }, record_a_table: { required: true, type: () => String }, record_b_table: { required: true, type: () => String }, result: { required: true, type: () => Object }, ai_recommendation: { required: true, type: () => Object }, duplication_score: { required: true, type: () => Number }, master_record_id: { required: true, type: () => String } };
    }
}
exports.DeduplicationResultDto = DeduplicationResultDto;
class DeduplicationResultByIdsRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], DeduplicationResultByIdsRequestDto.prototype, "ids", void 0);
exports.DeduplicationResultByIdsRequestDto = DeduplicationResultByIdsRequestDto;
//# sourceMappingURL=deduplication-result.response.dto.js.map