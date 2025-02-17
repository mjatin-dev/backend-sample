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
exports.pipelineStageService = void 0;
const common_1 = require("@nestjs/common");
const pipelineStage_repository_1 = require("../repositories/pipelineStage.repository");
let pipelineStageService = class pipelineStageService {
    constructor(pipelineStageRepository) {
        this.pipelineStageRepository = pipelineStageRepository;
    }
    async create(data) {
        const savedpipelineStage = this.pipelineStageRepository.create(Object.assign({}, data));
        const r = await this.pipelineStageRepository.save(savedpipelineStage);
        return r;
    }
    async update(pipelineStageId, data) {
        const pipelineStage = await this.pipelineStageRepository.findOne({
            pipelineStageId,
        });
        const updated = this.pipelineStageRepository.save(Object.assign(Object.assign({}, pipelineStage), data));
        return updated;
    }
};
pipelineStageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pipelineStage_repository_1.PipelineStageRepository])
], pipelineStageService);
exports.pipelineStageService = pipelineStageService;
//# sourceMappingURL=pipelineStage.service.js.map