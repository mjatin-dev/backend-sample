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
exports.DeDuplicationConfig = void 0;
const openapi = require("@nestjs/swagger");
const dataMigration_entity_1 = require("../../data-migration/entities/dataMigration.entity");
const typeorm_1 = require("typeorm");
let DeDuplicationConfig = class DeDuplicationConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { DeDuplicationConfigId: { required: true, type: () => String }, migrationId: { required: true, type: () => String }, tableName: { required: true, type: () => String }, fields: { required: true, type: () => [String] }, migrationObject: { required: false, type: () => require("../../data-migration/entities/dataMigration.entity").DataMigration } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DeDuplicationConfig.prototype, "DeDuplicationConfigId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeDuplicationConfig.prototype, "migrationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeDuplicationConfig.prototype, "tableName", void 0);
__decorate([
    (0, typeorm_1.Column)({ array: true, type: 'text' }),
    __metadata("design:type", Array)
], DeDuplicationConfig.prototype, "fields", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataMigration_entity_1.DataMigration, (dataMigration) => dataMigration.dataMigrationId, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'migration_id',
        referencedColumnName: 'dataMigrationId',
    }),
    __metadata("design:type", dataMigration_entity_1.DataMigration)
], DeDuplicationConfig.prototype, "migrationObject", void 0);
DeDuplicationConfig = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['migrationId', 'tableName'])
], DeDuplicationConfig);
exports.DeDuplicationConfig = DeDuplicationConfig;
//# sourceMappingURL=deduplication-config.entity.js.map