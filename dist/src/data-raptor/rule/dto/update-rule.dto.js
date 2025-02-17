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
exports.UpdateRuleDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const rule_dto_1 = require("./rule.dto");
const class_validator_1 = require("class-validator");
const formatted_rule_dto_1 = require("./formatted-rule.dto");
class UpdateRuleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { table: { required: false, type: () => String }, name: { required: false, type: () => String }, rule: { required: false, type: () => require("./rule.dto").RuleDto }, violationScore: { required: false, type: () => Number }, formattedRule: { required: false, type: () => require("./formatted-rule.dto").FormattedRuleDto }, active: { required: false, type: () => Boolean }, description: { required: false, type: () => String }, type: { required: false, type: () => String }, risk: { required: false, type: () => String }, department: { required: false, type: () => String }, frontEndObject: { required: false, type: () => Object }, previousFormattedRule: { required: false, type: () => require("./formatted-rule.dto").FormattedRuleDto }, tableDependencies: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleDto.prototype, "table", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => rule_dto_1.RuleDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", rule_dto_1.RuleDto)
], UpdateRuleDto.prototype, "rule", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRuleDto.prototype, "violationScore", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", formatted_rule_dto_1.FormattedRuleDto)
], UpdateRuleDto.prototype, "formattedRule", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateRuleDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleDto.prototype, "risk", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleDto.prototype, "department", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateRuleDto.prototype, "frontEndObject", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", formatted_rule_dto_1.FormattedRuleDto)
], UpdateRuleDto.prototype, "previousFormattedRule", void 0);
exports.UpdateRuleDto = UpdateRuleDto;
//# sourceMappingURL=update-rule.dto.js.map