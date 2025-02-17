"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRecommendationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AiRecommendationService = class AiRecommendationService {
    getAiRecommendationByIds(tenantId, dataSourceId, ids, recordUpdatedAt) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        let conditionalRecordUpdatedAt = '';
        try {
            if (recordUpdatedAt && recordUpdatedAt.toISOString()) {
                conditionalRecordUpdatedAt = `and "created_at" >= '${recordUpdatedAt.toISOString()}'`;
            }
        }
        catch (e) {
            console.log('Error converting to ISO string date', e);
        }
        console.log({
            conditionalRecordUpdatedAt,
            recordUpdatedAt,
            type: typeof recordUpdatedAt,
        });
        const query = `
    SELECT *
    FROM "${schemaName}".cc_ai_recommendation
    WHERE "Id" = ANY($1) ${conditionalRecordUpdatedAt}
  `;
        return (0, typeorm_1.getConnection)().query(query, [ids]);
    }
    getAiRecommendationById(tenantId, dataSourceId, id) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const query = `
    SELECT *
    FROM "${schemaName}".cc_ai_recommendation
    WHERE "Id" = $1
  `;
        return (0, typeorm_1.getConnection)().query(query, [id]);
    }
    async updateAiRecommendationFeedBack(tenantId, dataSourceId, id, feedback) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const query = `
    UPDATE "${schemaName}".cc_ai_recommendation
    SET "feedback" = $1
    WHERE "Id" = $2
  `;
        return (0, typeorm_1.getConnection)().query(query, [feedback, id]);
    }
};
AiRecommendationService = __decorate([
    (0, common_1.Injectable)()
], AiRecommendationService);
exports.AiRecommendationService = AiRecommendationService;
//# sourceMappingURL=ai-recommendation.service.js.map