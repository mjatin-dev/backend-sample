"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const open_ai_controller_1 = require("./open-ai.controller");
const open_ai_service_1 = require("./open-ai.service");
const data_migration_module_1 = require("../data-migration/data-migration.module");
const dataMigration_repository_1 = require("../data-migration/repositories/dataMigration.repository");
const data_raptor_module_1 = require("../data-raptor/data-raptor.module");
const rule_service_1 = require("../data-raptor/rule/rule.service");
const rule_repository_1 = require("../data-raptor/rule/rule.repository");
let OpenAIModule = class OpenAIModule {
};
OpenAIModule = __decorate([
    (0, common_1.Module)({
        imports: [
            data_migration_module_1.DataMigrationModule,
            typeorm_1.TypeOrmModule.forFeature([dataMigration_repository_1.DataMigrationRepository]),
            typeorm_1.TypeOrmModule.forFeature([rule_repository_1.RuleRepository]),
            data_raptor_module_1.DataRaptorModule,
        ],
        controllers: [open_ai_controller_1.OpenAIController],
        providers: [open_ai_service_1.OpenAIService, rule_service_1.RuleService],
        exports: [open_ai_service_1.OpenAIService],
    })
], OpenAIModule);
exports.OpenAIModule = OpenAIModule;
//# sourceMappingURL=open-ai.module.js.map