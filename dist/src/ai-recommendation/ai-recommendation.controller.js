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
exports.AiRecommendationController = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const data_migration_service_1 = require("../data-migration/services/data-migration.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const update_recommendation_feedback_dto_1 = require("./dto/update-recommendation-feedback.dto");
const ai_recommendation_service_1 = require("./ai-recommendation.service");
const http_1 = require("../common/http");
const salesforce_schema_service_1 = require("../core/lib/salesforce/salesforce-schema.service");
let AiRecommendationController = class AiRecommendationController {
    constructor(dataMigrationService, aiRecommendationService, salesforceSchemaService) {
        this.dataMigrationService = dataMigrationService;
        this.aiRecommendationService = aiRecommendationService;
        this.salesforceSchemaService = salesforceSchemaService;
    }
    async updateFeedback(authedUser, body, migrationId) {
        const { tenantId } = authedUser;
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        await this.aiRecommendationService.updateAiRecommendationFeedBack(tenantId, migration.dataSourceId, body.id, body.liked);
        return new http_1.SuccessResponseObject('Feedback updated');
    }
    async applyAction(authedUser, body, migrationId) {
        const { tenantId } = authedUser;
        const { action, fieldName, recommendationId, value } = body;
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const recommendations = await this.aiRecommendationService.getAiRecommendationById(tenantId, migration.dataSourceId, recommendationId);
        const recommendation = recommendations[0];
        if (!recommendation) {
            throw new common_1.BadRequestException('Recommendation not found!');
        }
        if (action === 'accept') {
            await this.salesforceSchemaService.updateObjectRecord(authedUser, recommendation.table_name, recommendation.record_id, { [fieldName]: value });
        }
        else {
            throw new common_1.BadRequestException('Invalid action');
        }
        return new http_1.SuccessResponseObject('Action applied');
    }
};
__decorate([
    (0, common_1.Put)('migration/:migrationId/feedback'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_recommendation_feedback_dto_1.UpdateRecommendationFeedbackDto, String]),
    __metadata("design:returntype", Promise)
], AiRecommendationController.prototype, "updateFeedback", null);
__decorate([
    (0, common_1.Put)('migration/:migrationId/action'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_recommendation_feedback_dto_1.RecommendationActionDto, String]),
    __metadata("design:returntype", Promise)
], AiRecommendationController.prototype, "applyAction", null);
AiRecommendationController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRule'),
    (0, common_1.Controller)('ai-recommendation'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [data_migration_service_1.DataMigrationService,
        ai_recommendation_service_1.AiRecommendationService,
        salesforce_schema_service_1.SalesforceSchemaService])
], AiRecommendationController);
exports.AiRecommendationController = AiRecommendationController;
//# sourceMappingURL=ai-recommendation.controller.js.map