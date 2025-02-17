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
exports.Pipeline = void 0;
const openapi = require("@nestjs/swagger");
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const pipelineDocument_entity_1 = require("./pipelineDocument.entity");
const pipelineStage_entity_1 = require("./pipelineStage.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Pipeline = class Pipeline {
    static _OPENAPI_METADATA_FACTORY() {
        return { pipelineId: { required: true, type: () => Number }, pipelineName: { required: true, type: () => String }, pipelineDescription: { required: true, type: () => String }, tenantId: { required: true, type: () => Number }, creatorTenantUserId: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, createDate: { required: true, type: () => Date }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date }, pipelineStages: { required: true, type: () => [require("./pipelineStage.entity").PipelineStage] }, pipelineDocuments: { required: true, type: () => [require("./pipelineDocument.entity").PipelineDocument] }, pipelineProducts: { required: true, type: () => [require("../../product/entities/product.entity").Product] }, pipelineUsers: { required: true, type: () => [require("../../user/entities/user.entity").User] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pipeline.prototype, "pipelineId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pipeline.prototype, "pipelineName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pipeline.prototype, "pipelineDescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pipeline.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pipeline.prototype, "creatorTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Pipeline.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Pipeline.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Pipeline.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Pipeline.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pipelineStage_entity_1.PipelineStage, (pipelinestage) => pipelinestage.pipeline, {
        nullable: true,
        onDelete: 'CASCADE',
        cascade: ['remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], Pipeline.prototype, "pipelineStages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pipelineDocument_entity_1.PipelineDocument, (pipelineDocument) => pipelineDocument.pipeline, {
        nullable: true,
        onDelete: 'CASCADE',
        cascade: ['remove'],
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], Pipeline.prototype, "pipelineDocuments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => product_entity_1.Product, (product) => product, {
        cascade: ['insert', 'remove'],
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Pipeline.prototype, "pipelineProducts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => user_entity_1.User, (user) => user, {
        cascade: ['insert', 'remove'],
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Pipeline.prototype, "pipelineUsers", void 0);
Pipeline = __decorate([
    (0, typeorm_1.Entity)()
], Pipeline);
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.entity.js.map