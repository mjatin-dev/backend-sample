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
exports.RuleType = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let RuleType = class RuleType {
    static _OPENAPI_METADATA_FACTORY() {
        return { ruleTypeId: { required: true, type: () => String }, name: { required: true, type: () => String }, label: { required: true, type: () => String }, description: { required: true, type: () => String }, color: { required: false, type: () => String }, deletedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RuleType.prototype, "ruleTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleType.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleType.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleType.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RuleType.prototype, "color", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], RuleType.prototype, "deletedAt", void 0);
RuleType = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name'])
], RuleType);
exports.RuleType = RuleType;
//# sourceMappingURL=rule-type.entity.js.map