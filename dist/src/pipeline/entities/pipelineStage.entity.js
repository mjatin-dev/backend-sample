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
exports.PipelineStage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const pipeline_entity_1 = require("./pipeline.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let PipelineStage = class PipelineStage {
    static _OPENAPI_METADATA_FACTORY() {
        return { pipelineStageId: { required: true, type: () => Number }, pipelineStageName: { required: true, type: () => String }, pipelineStageDescription: { required: true, type: () => String }, pipeline: { required: true, type: () => require("./pipeline.entity").Pipeline }, order: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, type: () => String }, pipelineStageOwners: { required: true, type: () => [require("../../user/entities/user.entity").User] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PipelineStage.prototype, "pipelineStageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PipelineStage.prototype, "pipelineStageName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "pipelineStageDescription", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pipeline_entity_1.Pipeline, (pipeline) => pipeline.pipelineStages, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'pipeline_id',
        referencedColumnName: 'pipelineId',
    }),
    __metadata("design:type", pipeline_entity_1.Pipeline)
], PipelineStage.prototype, "pipeline", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PipelineStage.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => user_entity_1.User, (user) => user, {
        cascade: ['insert', 'remove'],
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], PipelineStage.prototype, "pipelineStageOwners", void 0);
PipelineStage = __decorate([
    (0, typeorm_1.Entity)()
], PipelineStage);
exports.PipelineStage = PipelineStage;
//# sourceMappingURL=pipelineStage.entity.js.map