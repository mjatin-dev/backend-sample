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
exports.PostTableRecordUpdateDto = exports.PostMigrationRecordUpdateDto = exports.RecordUpdate = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var updateTypeEnum;
(function (updateTypeEnum) {
    updateTypeEnum["INSERT"] = "insert";
    updateTypeEnum["UPDATE"] = "update";
    updateTypeEnum["DELETE"] = "delete";
})(updateTypeEnum || (updateTypeEnum = {}));
class RecordUpdate {
    static _OPENAPI_METADATA_FACTORY() {
        return { table: { required: true, type: () => String }, type: { required: true, enum: updateTypeEnum }, data: { required: true, type: () => [Object] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordUpdate.prototype, "table", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(updateTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordUpdate.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], RecordUpdate.prototype, "data", void 0);
exports.RecordUpdate = RecordUpdate;
class PostMigrationRecordUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { updates: { required: true, type: () => [require("./post-migration-record-update.dto").RecordUpdate] } };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => RecordUpdate),
    __metadata("design:type", Array)
], PostMigrationRecordUpdateDto.prototype, "updates", void 0);
exports.PostMigrationRecordUpdateDto = PostMigrationRecordUpdateDto;
class PostTableRecordUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { updates: { required: true, type: () => [Object] } };
    }
}
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PostTableRecordUpdateDto.prototype, "updates", void 0);
exports.PostTableRecordUpdateDto = PostTableRecordUpdateDto;
//# sourceMappingURL=post-migration-record-update.dto.js.map