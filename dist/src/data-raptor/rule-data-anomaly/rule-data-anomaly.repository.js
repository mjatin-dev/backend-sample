"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDataAnomalyRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let RuleDataAnomalyRepository = class RuleDataAnomalyRepository {
    async getDataAnomalies({ tenantId, dataSourceId, tableName, recordId, ruleIds, }) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const anomalyIds = ruleIds.map((ruleId) => `${tableName}_${recordId}_${ruleId}`);
        const query = `
      SELECT *
      FROM "${schemaName}".cc_anomaly_result
      WHERE "id" = ANY($1)
    `;
        return (0, typeorm_1.getConnection)().query(query, [anomalyIds]);
    }
};
RuleDataAnomalyRepository = __decorate([
    (0, common_1.Injectable)()
], RuleDataAnomalyRepository);
exports.RuleDataAnomalyRepository = RuleDataAnomalyRepository;
//# sourceMappingURL=rule-data-anomaly.repository.js.map