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
exports.DataRaptorRuleRiskController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rule_risk_service_1 = require("./rule-risk.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const http_1 = require("../../common/http");
let DataRaptorRuleRiskController = class DataRaptorRuleRiskController {
    constructor(ruleRiskService) {
        this.ruleRiskService = ruleRiskService;
    }
    async getRulesByMigrationAndTableName() {
        const risks = await this.ruleRiskService.findMany({});
        return new http_1.SuccessResponseObject('Rule risks retrieved Successfully', risks);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all rule risk',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataRaptorRuleRiskController.prototype, "getRulesByMigrationAndTableName", null);
DataRaptorRuleRiskController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRuleRisk'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('data-raptor-rule-risk'),
    __metadata("design:paramtypes", [rule_risk_service_1.RuleRiskService])
], DataRaptorRuleRiskController);
exports.DataRaptorRuleRiskController = DataRaptorRuleRiskController;
//# sourceMappingURL=data-raptor-rule-risk.controller.js.map