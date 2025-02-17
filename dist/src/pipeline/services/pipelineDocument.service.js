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
exports.PipelineDocumentService = void 0;
const common_1 = require("@nestjs/common");
const pipelineDocument_repository_1 = require("../repositories/pipelineDocument.repository");
let PipelineDocumentService = class PipelineDocumentService {
    constructor(pipelineDocumentRepository) {
        this.pipelineDocumentRepository = pipelineDocumentRepository;
    }
    async create(data) {
        const saved = await this.pipelineDocumentRepository.save(Object.assign({}, data));
        return saved;
    }
    async update(pipelineDocumentId, data) {
        const document = await this.pipelineDocumentRepository.findOne({
            pipelineDocumentId,
        });
        const updated = this.pipelineDocumentRepository.save(Object.assign(Object.assign({}, document), data));
        return updated;
    }
};
PipelineDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pipelineDocument_repository_1.PipelineDocumentRepository])
], PipelineDocumentService);
exports.PipelineDocumentService = PipelineDocumentService;
//# sourceMappingURL=pipelineDocument.service.js.map