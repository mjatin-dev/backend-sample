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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const http_1 = require("../common/http");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const data_migration_service_1 = require("../data-migration/services/data-migration.service");
const data_migration_schema_service_1 = require("../data-migration/services/data-migration-schema.service");
const open_ai_service_1 = require("./open-ai.service");
const ai_summary_request_dto_1 = require("./dto/ai-summary.request.dto");
const rule_service_1 = require("../data-raptor/rule/rule.service");
const types_1 = require("../data-raptor/types");
const Enums_1 = require("../data-raptor/rule/dto/Enums");
let OpenAIController = class OpenAIController {
    constructor(openAIService, dataMigrationService, dataMigrationSchemaService, ruleService) {
        this.openAIService = openAIService;
        this.dataMigrationService = dataMigrationService;
        this.dataMigrationSchemaService = dataMigrationSchemaService;
        this.ruleService = ruleService;
    }
    async getOpenAISummary(authedUser, body) {
        const { migrationId, tableName: tableId } = body;
        try {
            const migration = await this.dataMigrationService.findOne({
                where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            });
            const totalCount = await this.dataMigrationSchemaService.getSchemaDataTotalCount(migration.tenantId, migration.dataSourceId, tableId);
            const rules = await this.ruleService.findMany({
                where: { dataMigrationId: migration.dataMigrationId, table: tableId },
            });
            const ruleIds = rules.map((item) => item.ruleId);
            const shortlistCompressedData = totalCount
                .filter((item) => {
                if (item.confidence_score !== 0) {
                    const ruleIds = Object.keys(item.rules_applied);
                    if (ruleIds.some((ruleId) => {
                        const index = rules.findIndex((rule) => rule.ruleId === ruleId);
                        if (index > -1) {
                            if (rules[index].type === types_1.RuleTypeEnum.DataValidation) {
                                return true;
                            }
                        }
                        return false;
                    })) {
                        return true;
                    }
                }
                return false;
            })
                .map((item) => {
                const temp = {};
                ruleIds.forEach((ruleId) => {
                    const rule = rules.find((rule) => rule.ruleId === ruleId);
                    const columns = rule.rule.where
                        .filter((where) => where.type === Enums_1.RuleComponentType.ROOT_CONDITIONAL)
                        .map((item) => item.field);
                    columns.forEach((column) => {
                        temp[column] = item[column];
                    });
                });
                return temp;
            });
            let dataText = JSON.stringify(shortlistCompressedData);
            if (dataText.length > 4000) {
                dataText = dataText.slice(0, 4000);
            }
            const plainText = `ChatBot, 
            provide an overview of the data validation errors like incorrect data types, formats, missing data, and values
             from ${dataText}. 
             Also, indicate the violated rules from ${rules
                .map((rule) => JSON.stringify(rule.rule))
                .join('\n')}.
              Do not discuss the data or its structure. 
              Instead, identify the field with the most errors and the most frequently violated rule. 
              Suggest corrective actions to fix the data issues from an end-user standpoint, focusing only on what should be done.
            `;
            const choice = await this.openAIService.generateAISummary(plainText);
            return new http_1.SuccessResponseObject('GPT response', choice);
        }
        catch (e) {
            throw new common_1.HttpException('openai api call failed', common_1.HttpStatus.CONFLICT);
        }
    }
};
__decorate([
    (0, common_1.Post)('/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get ai summary from chatGPT' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ai_summary_request_dto_1.AISummaryRequestDto]),
    __metadata("design:returntype", Promise)
], OpenAIController.prototype, "getOpenAISummary", null);
OpenAIController = __decorate([
    (0, swagger_1.ApiTags)('OpenAI'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('OpenAI'),
    __metadata("design:paramtypes", [open_ai_service_1.OpenAIService,
        data_migration_service_1.DataMigrationService,
        data_migration_schema_service_1.DataMigrationSchemaService,
        rule_service_1.RuleService])
], OpenAIController);
exports.OpenAIController = OpenAIController;
//# sourceMappingURL=open-ai.controller.js.map