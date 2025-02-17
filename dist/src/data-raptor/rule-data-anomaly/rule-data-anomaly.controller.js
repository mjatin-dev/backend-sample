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
exports.RuleDataAnomalyController = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
const http_1 = require("../../common/http");
const data_migration_schema_service_1 = require("../../data-migration/services/data-migration-schema.service");
const data_migration_service_1 = require("../../data-migration/services/data-migration.service");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const rule_data_anomaly_service_1 = require("./rule-data-anomaly.service");
const ai_recommendation_types_1 = require("../../ai-recommendation/ai-recommendation.types");
const ai_recommendation_service_1 = require("../../ai-recommendation/ai-recommendation.service");
const rule_service_1 = require("../rule/rule.service");
const DataAnomaliesBuilder_1 = require("./utils/DataAnomaliesBuilder");
const types_1 = require("../types");
let RuleDataAnomalyController = class RuleDataAnomalyController {
    constructor(dataMigrationSchemaService, dataMigrationService, ruleDataAnomalyService, aiRecommendationService, ruleService) {
        this.dataMigrationSchemaService = dataMigrationSchemaService;
        this.dataMigrationService = dataMigrationService;
        this.ruleDataAnomalyService = ruleDataAnomalyService;
        this.aiRecommendationService = aiRecommendationService;
        this.ruleService = ruleService;
    }
    async getRuleDataAnomaly(authedUser, migrationId, tableName, recordId) {
        const tenantId = authedUser.tenantId;
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const record = await this.dataMigrationSchemaService.getMigrationRecord(tenantId, migration.dataSourceId, tableName, recordId);
        if (!record) {
            throw new common_1.BadRequestException('Record not found!');
        }
        const rulesApplied = record.rules_applied;
        const ruleIds = Object.keys(rulesApplied || {});
        let dataAnomalies = [];
        let aiRecommendations = [];
        if (ruleIds.length > 0) {
            let dataQualityAnomalies = await this.ruleDataAnomalyService.getDataAnomalies({
                tenantId,
                dataSourceId: migration.dataSourceId,
                tableName,
                recordId,
                ruleIds,
            });
            dataQualityAnomalies = dataQualityAnomalies.map((anomaly) => (Object.assign(Object.assign({}, anomaly), { anomalyType: types_1.RuleTypeEnum.AnomalyDetection, ai_recommendation_type: ai_recommendation_types_1.AI_RECOMMENDATION.DATA_ANOMALY })));
            const dataQualityAnomaliesRuleIds = dataQualityAnomalies.map((anomaly) => anomaly.rule_id);
            const dataValidationRuleIds = ruleIds.filter((ruleId) => !dataQualityAnomaliesRuleIds.includes(ruleId));
            const rules = await this.ruleService.findMany({
                where: { ruleId: (0, typeorm_1.In)(dataValidationRuleIds) },
            });
            const dataValidationAnomalies = DataAnomaliesBuilder_1.DataAnomalyBuilder.buildFromRules(rules, record, record.Id);
            dataAnomalies = [...dataQualityAnomalies, ...dataValidationAnomalies];
            const keys = dataAnomalies.map((anomaly) => `${tableName}#${recordId}#${anomaly.rule_id}#${anomaly.ai_recommendation_type || ai_recommendation_types_1.AI_RECOMMENDATION.DATA_ANOMALY}`);
            aiRecommendations =
                await this.aiRecommendationService.getAiRecommendationByIds(tenantId, migration.dataSourceId, keys, record['LastModifiedDate'] || record['SystemModstamp'] || undefined);
        }
        return new http_1.SuccessResponseObject('Record Retrieved successfully', {
            anomalies: dataAnomalies || [],
            aiRecommendations: aiRecommendations || [],
        });
    }
};
__decorate([
    (0, common_1.Get)('/migration/:migrationId/table/:tableName/record/:recordId'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableName')),
    __param(3, (0, common_1.Param)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], RuleDataAnomalyController.prototype, "getRuleDataAnomaly", null);
RuleDataAnomalyController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRuleDataAnomaly'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('data-raptor-rule-data-anomaly'),
    __metadata("design:paramtypes", [data_migration_schema_service_1.DataMigrationSchemaService,
        data_migration_service_1.DataMigrationService,
        rule_data_anomaly_service_1.RuleDataAnomalyService,
        ai_recommendation_service_1.AiRecommendationService,
        rule_service_1.RuleService])
], RuleDataAnomalyController);
exports.RuleDataAnomalyController = RuleDataAnomalyController;
//# sourceMappingURL=rule-data-anomaly.controller.js.map