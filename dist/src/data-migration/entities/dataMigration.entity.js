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
exports.DataMigration = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const tenant_entity_1 = require("../../tenant/entities/tenant.entity");
const dataSource_entity_1 = require("../../data-source/dataSource.entity");
const types_1 = require("../../core/types");
const user_entity_1 = require("../../user/entities/user.entity");
const rule_entity_1 = require("../../data-raptor/rule/rule.entity");
const deduplication_config_entity_1 = require("../../deduplication/entities/deduplication-config.entity");
const rule_temp_table_entity_1 = require("../../data-raptor/rule-temp-table/rule-temp-table.entity");
let DataMigration = class DataMigration {
    static _OPENAPI_METADATA_FACTORY() {
        return { dataMigrationId: { required: true, type: () => String }, tenantId: { required: false, type: () => Number }, userId: { required: false, type: () => Number }, dataSourceId: { required: true, type: () => String }, status: { required: true, enum: require("../../core/types").DataMigrationStatus }, statusDate: { required: true, type: () => Date }, syncedAt: { required: true, type: () => Date }, detail: { required: true, type: () => Object }, tenant: { required: true, type: () => require("../../tenant/entities/tenant.entity").Tenant }, user: { required: true, type: () => require("../../user/entities/user.entity").User }, dataSource: { required: true, type: () => require("../../data-source/dataSource.entity").DataSource }, deduplicationConfigs: { required: false, type: () => [require("../../deduplication/entities/deduplication-config.entity").DeDuplicationConfig] }, rules: { required: false, type: () => [require("../../data-raptor/rule/rule.entity").Rule] }, tempTables: { required: false, type: () => [require("../../data-raptor/rule-temp-table/rule-temp-table.entity").RuleTempTable] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DataMigration.prototype, "dataMigrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DataMigration.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], DataMigration.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DataMigration.prototype, "dataSourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: types_1.DataMigrationStatus.REQUESTED }),
    __metadata("design:type", String)
], DataMigration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], DataMigration.prototype, "statusDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], DataMigration.prototype, "syncedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], DataMigration.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (tenant) => tenant.dataMigrations),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id', referencedColumnName: 'tenantId' }),
    __metadata("design:type", tenant_entity_1.Tenant)
], DataMigration.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.dataMigrations),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], DataMigration.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataSource_entity_1.DataSource, (dataSource) => dataSource.userDataMigrations),
    (0, typeorm_1.JoinColumn)({ name: 'data_source_id', referencedColumnName: 'dataSourceId' }),
    __metadata("design:type", dataSource_entity_1.DataSource)
], DataMigration.prototype, "dataSource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deduplication_config_entity_1.DeDuplicationConfig, (deDuplicationConfig) => deDuplicationConfig.migrationObject),
    __metadata("design:type", Array)
], DataMigration.prototype, "deduplicationConfigs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rule_entity_1.Rule, (rule) => rule.migration),
    __metadata("design:type", Array)
], DataMigration.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rule_temp_table_entity_1.RuleTempTable, (tempTable) => tempTable.migration),
    __metadata("design:type", Array)
], DataMigration.prototype, "tempTables", void 0);
DataMigration = __decorate([
    (0, typeorm_1.Entity)()
], DataMigration);
exports.DataMigration = DataMigration;
//# sourceMappingURL=dataMigration.entity.js.map