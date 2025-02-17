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
exports.RuleObjectTemplateRef = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const dataSource_entity_1 = require("../../data-source/dataSource.entity");
let RuleObjectTemplateRef = class RuleObjectTemplateRef {
    static _OPENAPI_METADATA_FACTORY() {
        return { ruleObjectTemplateRefId: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, type: () => String }, tableName: { required: true, type: () => String }, fieldName: { required: true, type: () => String }, context: { required: true, type: () => String }, dataSourceName: { required: true, type: () => String }, DataSourceObject: { required: true, type: () => require("../../data-source/dataSource.entity").DataSource } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "ruleObjectTemplateRefId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        enum: types_1.RuleObjectTemplateRefType,
    }),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "tableName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "context", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text', default: 'Salesforce' }),
    __metadata("design:type", String)
], RuleObjectTemplateRef.prototype, "dataSourceName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataSource_entity_1.DataSource, (DataSource) => DataSource.dataSourceId),
    (0, typeorm_1.JoinColumn)({ name: 'data_source_name', referencedColumnName: 'name' }),
    __metadata("design:type", dataSource_entity_1.DataSource)
], RuleObjectTemplateRef.prototype, "DataSourceObject", void 0);
RuleObjectTemplateRef = __decorate([
    (0, typeorm_1.Entity)()
], RuleObjectTemplateRef);
exports.RuleObjectTemplateRef = RuleObjectTemplateRef;
//# sourceMappingURL=rule-object-template-ref.entity.js.map