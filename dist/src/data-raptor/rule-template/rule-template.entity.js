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
exports.RuleTemplate = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const rule_department_entity_1 = require("../rule-department/rule-department.entity");
const types_1 = require("../types");
const dataSource_entity_1 = require("../../data-source/dataSource.entity");
const rule_object_template_ref_entity_1 = require("./rule-object-template-ref.entity");
const class_transformer_1 = require("class-transformer");
const rule_type_entity_1 = require("../rule-type/rule-type.entity");
const rule_risk_entity_1 = require("../rule-risk/rule-risk.entity");
let RuleTemplate = class RuleTemplate {
    static _OPENAPI_METADATA_FACTORY() {
        return { ruleTemplateId: { required: true, type: () => String }, name: { required: true, type: () => String }, table: { required: true, type: () => String }, description: { required: true, type: () => String }, ruleBody: { required: true, type: () => Object }, frontEndRuleBody: { required: true, type: () => Object }, context: { required: true, type: () => String }, violationScore: { required: true, type: () => Number }, department: { required: true, type: () => String }, type: { required: true, type: () => String }, risk: { required: true, type: () => String }, dataSourceName: { required: true, type: () => String }, DepartmentObject: { required: true, type: () => require("../rule-department/rule-department.entity").RuleDepartment }, RiskObject: { required: true, type: () => require("../rule-risk/rule-risk.entity").RuleRisk }, DataSourceObject: { required: true, type: () => require("../../data-source/dataSource.entity").DataSource }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, ObjectReferences: { required: true, type: () => [require("./rule-object-template-ref.entity").RuleObjectTemplateRef] }, TypeObject: { required: true, type: () => require("../rule-type/rule-type.entity").RuleType }, deletedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RuleTemplate.prototype, "ruleTemplateId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text', unique: true }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "table", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: false }),
    __metadata("design:type", Object)
], RuleTemplate.prototype, "ruleBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], RuleTemplate.prototype, "frontEndRuleBody", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: '' }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, precision: 3, type: 'decimal', default: 0 }),
    __metadata("design:type", Number)
], RuleTemplate.prototype, "violationScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: types_1.RuleDepartmentEnum.Others }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
        default: types_1.RuleTypeEnum.DataValidation,
    }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: types_1.RuleRiskLevelEnum.Low }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "risk", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text', default: 'Salesforce' }),
    __metadata("design:type", String)
], RuleTemplate.prototype, "dataSourceName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_department_entity_1.RuleDepartment, (RuleDepartment) => RuleDepartment.name),
    (0, typeorm_1.JoinColumn)({ name: 'department', referencedColumnName: 'name' }),
    __metadata("design:type", rule_department_entity_1.RuleDepartment)
], RuleTemplate.prototype, "DepartmentObject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_risk_entity_1.RuleRisk, (RuleRisk) => RuleRisk.name),
    (0, typeorm_1.JoinColumn)({ name: 'risk', referencedColumnName: 'name' }),
    __metadata("design:type", rule_risk_entity_1.RuleRisk)
], RuleTemplate.prototype, "RiskObject", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataSource_entity_1.DataSource, (DataSource) => DataSource.dataSourceId),
    (0, typeorm_1.JoinColumn)({ name: 'data_source_name', referencedColumnName: 'name' }),
    __metadata("design:type", dataSource_entity_1.DataSource)
], RuleTemplate.prototype, "DataSourceObject", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RuleTemplate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RuleTemplate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => rule_object_template_ref_entity_1.RuleObjectTemplateRef),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], RuleTemplate.prototype, "ObjectReferences", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rule_type_entity_1.RuleType, (RuleType) => RuleType.name),
    (0, typeorm_1.JoinColumn)({ name: 'type', referencedColumnName: 'name' }),
    __metadata("design:type", rule_type_entity_1.RuleType)
], RuleTemplate.prototype, "TypeObject", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], RuleTemplate.prototype, "deletedAt", void 0);
RuleTemplate = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name'])
], RuleTemplate);
exports.RuleTemplate = RuleTemplate;
//# sourceMappingURL=rule-template.entity.js.map