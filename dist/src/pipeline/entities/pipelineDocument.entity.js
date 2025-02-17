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
exports.PipelineDocument = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const pipeline_entity_1 = require("./pipeline.entity");
let PipelineDocument = class PipelineDocument {
    static _OPENAPI_METADATA_FACTORY() {
        return { pipelineDocumentId: { required: true, type: () => Number }, pipeline: { required: true, type: () => require("./pipeline.entity").Pipeline }, name: { required: true, type: () => String }, location: { required: true, type: () => String }, extention: { required: true, type: () => String }, size: { required: true, type: () => Number }, type: { required: true, type: () => String }, fileKey: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PipelineDocument.prototype, "pipelineDocumentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pipeline_entity_1.Pipeline, (pipeline) => pipeline.pipelineDocuments, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'pipeline_id',
        referencedColumnName: 'pipelineId',
    }),
    __metadata("design:type", pipeline_entity_1.Pipeline)
], PipelineDocument.prototype, "pipeline", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PipelineDocument.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PipelineDocument.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PipelineDocument.prototype, "extention", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PipelineDocument.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PipelineDocument.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PipelineDocument.prototype, "fileKey", void 0);
PipelineDocument = __decorate([
    (0, typeorm_1.Entity)()
], PipelineDocument);
exports.PipelineDocument = PipelineDocument;
//# sourceMappingURL=pipelineDocument.entity.js.map