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
exports.CreateRuleTempTable = exports.UpdateRuleTempTableDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const rule_dto_1 = require("../rule/dto/rule.dto");
class UpdateRuleTempTableDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { table: { required: true, type: () => String }, name: { required: true, type: () => String }, definition: { required: true, type: () => require("../rule/dto/rule.dto").RuleDto } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleTempTableDto.prototype, "table", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRuleTempTableDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", rule_dto_1.RuleDto)
], UpdateRuleTempTableDto.prototype, "definition", void 0);
exports.UpdateRuleTempTableDto = UpdateRuleTempTableDto;
class CreateRuleTempTable {
    static _OPENAPI_METADATA_FACTORY() {
        return { table: { required: true, type: () => String }, name: { required: true, type: () => String }, definition: { required: true, type: () => require("../rule/dto/rule.dto").RuleDto } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRuleTempTable.prototype, "table", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRuleTempTable.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", rule_dto_1.RuleDto)
], CreateRuleTempTable.prototype, "definition", void 0);
exports.CreateRuleTempTable = CreateRuleTempTable;
//# sourceMappingURL=rule-temp-table.dto.js.map