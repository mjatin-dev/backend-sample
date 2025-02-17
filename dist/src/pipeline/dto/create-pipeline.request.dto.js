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
exports.CreatepipelineRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatepipelineRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pipelineName: { required: true, type: () => String }, pipelineDescription: { required: true, type: () => String }, productIds: { required: true, type: () => [Number] }, pipelineStages: { required: true, type: () => [require("../entities/pipelineStage.entity").PipelineStage] }, pipelineDocuments: { required: true, type: () => [require("../entities/pipelineDocument.entity").PipelineDocument] }, pipelineProducts: { required: true, type: () => [require("../../product/entities/product.entity").Product] }, pipelineUsers: { required: true, type: () => [require("../../user/entities/user.entity").User] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatepipelineRequestDto.prototype, "pipelineName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatepipelineRequestDto.prototype, "pipelineDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatepipelineRequestDto.prototype, "productIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatepipelineRequestDto.prototype, "pipelineStages", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatepipelineRequestDto.prototype, "pipelineDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatepipelineRequestDto.prototype, "pipelineProducts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatepipelineRequestDto.prototype, "pipelineUsers", void 0);
exports.CreatepipelineRequestDto = CreatepipelineRequestDto;
//# sourceMappingURL=create-pipeline.request.dto.js.map