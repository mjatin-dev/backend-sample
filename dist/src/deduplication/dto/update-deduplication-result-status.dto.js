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
exports.MergeDuplicatedRecordsRequest = exports.UpdateDeduplicationResultStatusRequest = exports.DeduplicationResultStatus = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var DeduplicationResultStatus;
(function (DeduplicationResultStatus) {
    DeduplicationResultStatus["ACTIVE"] = "A";
    DeduplicationResultStatus["IGNORED"] = "I";
})(DeduplicationResultStatus = exports.DeduplicationResultStatus || (exports.DeduplicationResultStatus = {}));
class UpdateDeduplicationResultStatusRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, enum: require("./update-deduplication-result-status.dto").DeduplicationResultStatus }, resultIds: { required: true, type: () => [String] } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(DeduplicationResultStatus),
    __metadata("design:type", String)
], UpdateDeduplicationResultStatusRequest.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], UpdateDeduplicationResultStatusRequest.prototype, "resultIds", void 0);
exports.UpdateDeduplicationResultStatusRequest = UpdateDeduplicationResultStatusRequest;
class MergeDuplicatedRecordsRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { masterRecordId: { required: true, type: () => String }, duplicateRecordIds: { required: true, type: () => [String] }, overWriteValues: { required: true, type: () => Object }, objectType: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MergeDuplicatedRecordsRequest.prototype, "masterRecordId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], MergeDuplicatedRecordsRequest.prototype, "duplicateRecordIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], MergeDuplicatedRecordsRequest.prototype, "overWriteValues", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MergeDuplicatedRecordsRequest.prototype, "objectType", void 0);
exports.MergeDuplicatedRecordsRequest = MergeDuplicatedRecordsRequest;
//# sourceMappingURL=update-deduplication-result-status.dto.js.map