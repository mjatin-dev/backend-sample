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
exports.RuleTempTable = void 0;
const openapi = require("@nestjs/swagger");
const dataMigration_entity_1 = require("../../data-migration/entities/dataMigration.entity");
const typeorm_1 = require("typeorm");
const rule_dto_1 = require("../rule/dto/rule.dto");
const formatted_rule_dto_1 = require("../rule/dto/formatted-rule.dto");
const rule_entity_1 = require("../rule/rule.entity");
let RuleTempTable = class RuleTempTable {
    static _OPENAPI_METADATA_FACTORY() {
        return { ruleTempTableId: { required: true, type: () => String }, table: { required: true, type: () => String }, name: { required: true, type: () => String }, formattedTableName: { required: true, type: () => String }, definition: { required: true, type: () => require("../rule/dto/rule.dto").RuleDto }, formattedDefinition: { required: true, type: () => require("../rule/dto/formatted-rule.dto").FormattedRuleDto }, sampleIds: { required: false, type: () => [String] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, dataMigrationId: { required: true, type: () => String }, migration: { required: false, type: () => require("typeorm/migration/Migration").Migration }, rules: { required: true, type: () => [require("../rule/rule.entity").Rule] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RuleTempTable.prototype, "ruleTempTableId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleTempTable.prototype, "table", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], RuleTempTable.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], RuleTempTable.prototype, "formattedTableName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'jsonb' }),
    __metadata("design:type", rule_dto_1.RuleDto)
], RuleTempTable.prototype, "definition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", formatted_rule_dto_1.FormattedRuleDto)
], RuleTempTable.prototype, "formattedDefinition", void 0);
__decorate([
    (0, typeorm_1.Column)({ array: true, type: 'text', nullable: false, default: [] }),
    __metadata("design:type", Array)
], RuleTempTable.prototype, "sampleIds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RuleTempTable.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RuleTempTable.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], RuleTempTable.prototype, "dataMigrationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataMigration_entity_1.DataMigration, (dataMigration) => dataMigration.tempTables, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'data_migration_id',
        referencedColumnName: 'dataMigrationId',
    }),
    __metadata("design:type", typeorm_1.Migration)
], RuleTempTable.prototype, "migration", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => rule_entity_1.Rule, (rule) => rule.tempTables),
    __metadata("design:type", Array)
], RuleTempTable.prototype, "rules", void 0);
RuleTempTable = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['dataMigrationId', 'name'])
], RuleTempTable);
exports.RuleTempTable = RuleTempTable;
//# sourceMappingURL=rule-temp-table.entity.js.map