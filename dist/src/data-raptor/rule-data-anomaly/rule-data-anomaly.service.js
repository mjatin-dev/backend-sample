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
exports.RuleDataAnomalyService = void 0;
const common_1 = require("@nestjs/common");
const rule_data_anomaly_repository_1 = require("./rule-data-anomaly.repository");
let RuleDataAnomalyService = class RuleDataAnomalyService {
    constructor(ruleDataAnomalyRepository) {
        this.ruleDataAnomalyRepository = ruleDataAnomalyRepository;
    }
    async getDataAnomalies({ tenantId, dataSourceId, tableName, recordId, ruleIds, }) {
        return this.ruleDataAnomalyRepository.getDataAnomalies({
            tenantId,
            dataSourceId,
            tableName,
            recordId,
            ruleIds,
        });
    }
};
RuleDataAnomalyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rule_data_anomaly_repository_1.RuleDataAnomalyRepository])
], RuleDataAnomalyService);
exports.RuleDataAnomalyService = RuleDataAnomalyService;
//# sourceMappingURL=rule-data-anomaly.service.js.map