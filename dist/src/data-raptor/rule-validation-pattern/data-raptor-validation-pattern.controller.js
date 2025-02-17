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
exports.DataRaptorValidationPatternController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const rule_validation_pattern_service_1 = require("./rule-validation-pattern.service");
const http_1 = require("../../common/http");
let DataRaptorValidationPatternController = class DataRaptorValidationPatternController {
    constructor(dataRaptorValidationPatternService) {
        this.dataRaptorValidationPatternService = dataRaptorValidationPatternService;
    }
    async getValidationPattern(validationPatternType) {
        const whereObject = {};
        if (!!validationPatternType) {
            whereObject['dataType'] = validationPatternType;
        }
        const patterns = await this.dataRaptorValidationPatternService.get(whereObject);
        return new http_1.SuccessResponseObject('Rules Validation Patterns retrieved Successfully', patterns);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataRaptorValidationPatternController.prototype, "getValidationPattern", null);
DataRaptorValidationPatternController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRuleValidationPattern'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('data-raptor-validation-pattern'),
    __metadata("design:paramtypes", [rule_validation_pattern_service_1.DataRaptorValidationPatternService])
], DataRaptorValidationPatternController);
exports.DataRaptorValidationPatternController = DataRaptorValidationPatternController;
//# sourceMappingURL=data-raptor-validation-pattern.controller.js.map