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
exports.DataRaptorRuleDepartmentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rule_department_service_1 = require("./rule-department.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const http_1 = require("../../common/http");
let DataRaptorRuleDepartmentController = class DataRaptorRuleDepartmentController {
    constructor(ruleDepartmentService) {
        this.ruleDepartmentService = ruleDepartmentService;
    }
    async getRulesByMigrationAndTableName() {
        const departments = await this.ruleDepartmentService.findMany({});
        return new http_1.SuccessResponseObject('Rule departments retrieved Successfully', departments);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all rule departments',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataRaptorRuleDepartmentController.prototype, "getRulesByMigrationAndTableName", null);
DataRaptorRuleDepartmentController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRuleDepartment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('data-raptor-rule-department'),
    __metadata("design:paramtypes", [rule_department_service_1.RuleDepartmentService])
], DataRaptorRuleDepartmentController);
exports.DataRaptorRuleDepartmentController = DataRaptorRuleDepartmentController;
//# sourceMappingURL=data-raptor-rule-department.controller.js.map