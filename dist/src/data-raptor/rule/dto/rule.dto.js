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
exports.RuleDto = exports.JoinClause = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class JoinClause {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, type: () => String }, table: { required: true, type: () => String }, condition: { required: true, type: () => Object } };
    }
}
exports.JoinClause = JoinClause;
class RuleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { table: { required: true, type: () => String }, where: { required: true, type: () => [Object] }, join: { required: false, type: () => [require("./rule.dto").JoinClause] }, subQueries: { required: false, type: () => [Object] }, having: { required: false, type: () => [Object] }, groupBy: { required: false, type: () => [String] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RuleDto.prototype, "table", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RuleDto.prototype, "where", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RuleDto.prototype, "join", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RuleDto.prototype, "subQueries", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], RuleDto.prototype, "having", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], RuleDto.prototype, "groupBy", void 0);
exports.RuleDto = RuleDto;
//# sourceMappingURL=rule.dto.js.map