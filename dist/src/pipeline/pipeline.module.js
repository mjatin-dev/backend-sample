"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelineModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pipeline_service_1 = require("./services/pipeline.service");
const pipeline_controller_1 = require("./pipeline.controller");
const pipeline_repository_1 = require("./repositories/pipeline.repository");
const pipelineDocument_repository_1 = require("./repositories/pipelineDocument.repository");
const pipelineStage_repository_1 = require("./repositories/pipelineStage.repository");
const pipelineStage_service_1 = require("./services/pipelineStage.service");
const pipelineDocument_service_1 = require("./services/pipelineDocument.service");
let pipelineModule = class pipelineModule {
};
pipelineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                pipeline_repository_1.PipelineRepository,
                pipelineDocument_repository_1.PipelineDocumentRepository,
                pipelineStage_repository_1.PipelineStageRepository,
            ]),
        ],
        providers: [pipeline_service_1.pipelineService, pipelineStage_service_1.pipelineStageService, pipelineDocument_service_1.PipelineDocumentService],
        controllers: [pipeline_controller_1.pipelineController],
    })
], pipelineModule);
exports.pipelineModule = pipelineModule;
//# sourceMappingURL=pipeline.module.js.map