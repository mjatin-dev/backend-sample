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
exports.Rule = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const rule_dto_1 = require("./dto/rule.dto");
const dataMigration_entity_1 = require("../../data-migration/entities/dataMigration.entity");
const class_transformer_1 = require("class-transformer");
const rule_risk_entity_1 = require("../rule-risk/rule-risk.entity");
const rule_type_entity_1 = require("../rule-type/rule-type.entity");
const rule_department_entity_1 = require("../rule-department/rule-department.entity");
const rule_template_entity_1 = require("../rule-template/rule-template.entity");
const formatted_rule_dto_1 = require("./dto/formatted-rule.dto");
const rule_temp_table_entity_1 = require("../rule-temp-table/rule-temp-table.entity");
let Rule = class Rule {
    static _OPENAPI_METADATA_FACTORY() {
        return { ruleId: { required: true, type: () => String }, name: { required: true, type: () => String }, table: { required: true, type: () => String }, rule: { required: true, type: () => require("./dto/rule.dto").RuleDto }, description: { required: true, type: () => String }, formattedRule: { required: true, type: () => require("./dto/formatted-rule.dto").FormattedRuleDto }, previousFormattedRule: { required: true, type: () => require("./dto/formatted-rule.dto").FormattedRuleDto }, frontEndObject: { required: true, type: () => Object }, dataMigrationId: { required: true, type: () => String }, migration: { required: false, type: () => require("typeorm/migration/Migration").Migration }, violationScore: { required: true, type: () => Number }, status: { required: true, enum: require("../types").RuleStatus }, type: { required: true, type: () => String }, risk: { required: true, type: () => String }, department: { required: true, type: () => String }, statusDate: { required: true, type: () => Date }, active: { required: true, type: () => Boolean }, deletedAt: { required: true, type: () => Date }, tableDependencies: { required: true, type: () => [String] }, violatedRowCount: { required: true, type: () => Number }, ruleTemplateId: { required: false, type: () => String }, RuleTemplateObject: { required: true, type: () => require("../rule-template/rule-template.entity").RuleTemplate }, RiskObject: { required: true, type: () => require("../rule-risk/rule-risk.entity").RuleRisk }, TypeObject: { required: true, type: () => require("../rule-type/rule-type.entity").RuleType }, DepartmentObject: { required: true, type: () => require("../rule-department/rule-department.entity").RuleDepartment }, tempTables: { required: true, type: () => [require("../rule-temp-table/rule-temp-table.entity").RuleTempTable] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rule.prototype, "ruleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Rule.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Rule.prototype, "table", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: false }),
    __metadata("design:type", rule_dto_1.RuleDto)
], Rule.prototype, "rule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Rule.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", formatted_rule_dto_1.FormattedRuleDto)
], Rule.prototype, "formattedRule", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", formatted_rule_dto_1.FormattedRuleDto)
], Rule.prototype, "previousFormattedRule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Rule.prototype, "frontEndObject", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Rule.prototype, "dataMigrationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataMigration_entity_1.DataMigration, (dataMigration) => dataMigration.rules, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'migration_id',
        referencedColumnName: 'dataMigrationId',
    }),
    __metadata("design:type", typeorm_1.Migration)
], Rule.prototype, "migration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, precision: 3, type: 'decimal' }),
    __metadata("design:type", Number)
], Rule.prototype, "violationScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.RuleStatus.REQUESTED }),
    __metadata("design:type", String)
], Rule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
        default: types_1.RuleTypeEnum.DataValidation,
    }),
    __metadata("design:type", String)
], Rule.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: types_1.RuleRiskLevelEnum.Low }),
    __metadata("design:type", String)
], Rule.prototype, "risk", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: types_1.RuleDepartmentEnum.Sales }),
    __metadata("design:type", String)
], Rule.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], Rule.prototype, "statusDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Rule.prototype, "active", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Rule.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ array: true, type: 'text', nullable: true }),
    __metadata("design:type", Array)
], Rule.prototype, "tableDependencies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Rule.prototype, "violatedRowCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Rule.prototype, "ruleTemplateId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_template_entity_1.RuleTemplate, (RuleTemplate) => RuleTemplate.ruleTemplateId),
    (0, typeorm_1.JoinColumn)({
        name: 'rule_template_id',
        referencedColumnName: 'ruleTemplateId',
    }),
    __metadata("design:type", rule_template_entity_1.RuleTemplate)
], Rule.prototype, "RuleTemplateObject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_risk_entity_1.RuleRisk, (RuleRisk) => RuleRisk.name),
    (0, typeorm_1.JoinColumn)({ name: 'risk', referencedColumnName: 'name' }),
    __metadata("design:type", rule_risk_entity_1.RuleRisk)
], Rule.prototype, "RiskObject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_type_entity_1.RuleType, (RuleType) => RuleType.name),
    (0, typeorm_1.JoinColumn)({ name: 'type', referencedColumnName: 'name' }),
    __metadata("design:type", rule_type_entity_1.RuleType)
], Rule.prototype, "TypeObject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_department_entity_1.RuleDepartment, (RuleDepartment) => RuleDepartment.name),
    (0, typeorm_1.JoinColumn)({ name: 'department', referencedColumnName: 'name' }),
    __metadata("design:type", rule_department_entity_1.RuleDepartment)
], Rule.prototype, "DepartmentObject", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => rule_temp_table_entity_1.RuleTempTable, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        joinColumn: { name: 'ruleId' },
        inverseJoinColumn: { name: 'ruleTempTableId' },
        name: 'rule_temp_table_dependency',
    }),
    __metadata("design:type", Array)
], Rule.prototype, "tempTables", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Rule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Rule.prototype, "updatedAt", void 0);
Rule = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['dataMigrationId', 'table', 'name'])
], Rule);
exports.Rule = Rule;
//# sourceMappingURL=rule.entity.js.map