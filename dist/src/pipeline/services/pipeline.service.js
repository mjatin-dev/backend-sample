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
exports.pipelineService = void 0;
const common_1 = require("@nestjs/common");
const pipeline_repository_1 = require("../repositories/pipeline.repository");
const pipelineDocument_service_1 = require("./pipelineDocument.service");
const pipelineStage_service_1 = require("./pipelineStage.service");
let pipelineService = class pipelineService {
    constructor(pipelineRepository, pipelineStageService, pipelineDocumentService) {
        this.pipelineRepository = pipelineRepository;
        this.pipelineStageService = pipelineStageService;
        this.pipelineDocumentService = pipelineDocumentService;
    }
    async create(data, ownerId) {
        const newPipeline = Object.assign({ pipelineId: 0, tenantId: ownerId, creatorTenantUserId: ownerId, isActive: true, createDate: undefined, startDate: undefined, endDate: undefined }, data);
        const pipeline = this.pipelineRepository.create(newPipeline);
        const savedpipeline = await this.pipelineRepository.save(pipeline);
        for (const pipelineStage of data.pipelineStages) {
            await this.pipelineStageService.create(Object.assign(Object.assign({}, pipelineStage), { pipeline: savedpipeline }));
        }
        for (const pipelineDocument of data.pipelineDocuments) {
            await this.pipelineDocumentService.create(Object.assign(Object.assign({}, pipelineDocument), { pipeline: savedpipeline }));
        }
        return savedpipeline;
    }
    async findOne(id, ownerId) {
        const pipeline = await this.pipelineRepository.findOne(id);
        if (!pipeline) {
            throw new common_1.NotFoundException('Pipeline not found!');
        }
        return null;
    }
    async update(id, data, ownerId) {
        const pipeline = await this.pipelineRepository.findOne(id);
        if (!pipeline) {
            throw new common_1.NotFoundException('Pipeline not found!');
        }
        const updated = Object.assign(Object.assign({}, pipeline), data);
        const savedpipeline = await this.pipelineRepository.save(updated);
        for (const pipelineStage of data.pipelineStages) {
            const stage = Object.assign(Object.assign({}, pipelineStage), { pipeline: savedpipeline });
            await this.pipelineStageService.update(pipelineStage.pipelineStageId, stage);
        }
        for (const pipelineDocument of data.pipelineDocuments) {
            const document = Object.assign(Object.assign({}, pipelineDocument), { pipeline: savedpipeline });
            await this.pipelineDocumentService.update(pipelineDocument.pipelineDocumentId, document);
        }
        return savedpipeline;
    }
    async findAll(userId) {
        const pipelineResponse = await this.pipelineRepository.find({
            where: { creatorTenantUserId: userId },
            relations: [
                'pipelineStages',
                'pipelineDocuments',
                'pipelineProducts',
                'pipelineUsers',
                'pipelineStages.pipelineStageOwners',
            ],
        });
        return pipelineResponse;
    }
    async delete(id, ownerId) {
        const pipeline = await this.pipelineRepository.findOne(id);
        if (!pipeline) {
            throw new common_1.NotFoundException('Pipeline not found!');
        }
        await this.pipelineRepository.remove([pipeline]);
    }
};
pipelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pipeline_repository_1.PipelineRepository,
        pipelineStage_service_1.pipelineStageService,
        pipelineDocument_service_1.PipelineDocumentService])
], pipelineService);
exports.pipelineService = pipelineService;
//# sourceMappingURL=pipeline.service.js.map