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
exports.DataRaptorRuleTypeController = void 0;
const openapi = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rule_type_entity_1 = require("./rule-type.entity");
const rule_type_service_1 = require("./rule-type.service");
const http_1 = require("../../common/http");
let DataRaptorRuleTypeController = class DataRaptorRuleTypeController {
    constructor(ruleTypeService) {
        this.ruleTypeService = ruleTypeService;
    }
    async getRuleTypes() {
        const types = await this.ruleTypeService.getRuleTypes();
        return new http_1.SuccessResponseObject('Rule types retrieved Successfully', types);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ description: 'get All Rule Types', type: [rule_type_entity_1.RuleType] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataRaptorRuleTypeController.prototype, "getRuleTypes", null);
DataRaptorRuleTypeController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('DataRaptorRuleType'),
    (0, common_1.Controller)('data-raptor-rule-type'),
    __metadata("design:paramtypes", [rule_type_service_1.RuleTypeService])
], DataRaptorRuleTypeController);
exports.DataRaptorRuleTypeController = DataRaptorRuleTypeController;
//# sourceMappingURL=data-raptor-rule-type.controller.js.map