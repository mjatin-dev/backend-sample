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
exports.DataValidationDto = exports.ConfidenceScoreHistoricalDto = exports.DuplicationDetectionResultDto = exports.DuplicatedDetectionDto = exports.DuplicatedDetectionState = exports.DataValidationState = exports.RecordReportDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class RecordReportDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { confidenceScore: { required: true, type: () => Number }, rulesAppliedCount: { required: true, type: () => Number }, lastUpdated: { required: true, type: () => Date }, confidenceScoreHistorical: { required: true, type: () => [require("./record-report.dto").ConfidenceScoreHistoricalDto] }, duplicatedDetection: { required: false, type: () => require("./record-report.dto").DuplicatedDetectionDto }, dataValidation: { required: false, type: () => [require("./record-report.dto").DataValidationDto] } };
    }
}
exports.RecordReportDto = RecordReportDto;
var DataValidationState;
(function (DataValidationState) {
    DataValidationState["DONE"] = "done";
    DataValidationState["IGNORE"] = "ignore";
    DataValidationState["INITIAL"] = "init";
})(DataValidationState = exports.DataValidationState || (exports.DataValidationState = {}));
var DuplicatedDetectionState;
(function (DuplicatedDetectionState) {
    DuplicatedDetectionState["IGNORE"] = "not-duplicated";
    DuplicatedDetectionState["INITIAL"] = "init";
})(DuplicatedDetectionState = exports.DuplicatedDetectionState || (exports.DuplicatedDetectionState = {}));
class DuplicatedDetectionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { analysisId: { required: true, type: () => String }, result: { required: true, type: () => [require("./record-report.dto").DuplicationDetectionResultDto] }, recommendation: { required: false, type: () => String } };
    }
}
exports.DuplicatedDetectionDto = DuplicatedDetectionDto;
class DuplicationDetectionResultDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { columns: { required: true, type: () => [String] }, id: { required: true, type: () => String }, state: { required: true, enum: require("./record-report.dto").DuplicatedDetectionState }, mergeUrl: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/1/record/2',
    }),
    __metadata("design:type", String)
], DuplicationDetectionResultDto.prototype, "mergeUrl", void 0);
exports.DuplicationDetectionResultDto = DuplicationDetectionResultDto;
class ConfidenceScoreHistoricalDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { score: { required: true, type: () => Number }, timestamp: { required: true, type: () => Date } };
    }
}
exports.ConfidenceScoreHistoricalDto = ConfidenceScoreHistoricalDto;
class DataValidationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { columnName: { required: true, type: () => String }, recommendation: { required: false, type: () => ({ textRecommendation: { required: false, type: () => String }, valueRecommendation: { required: false, type: () => String } }) }, state: { required: true, enum: require("./record-report.dto").DataValidationState } };
    }
}
exports.DataValidationDto = DataValidationDto;
//# sourceMappingURL=record-report.dto.js.map