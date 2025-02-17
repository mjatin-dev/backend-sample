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
exports.DataMigrationSchemaObject = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const dataMigration_entity_1 = require("./dataMigration.entity");
let DataMigrationSchemaObject = class DataMigrationSchemaObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, migrationId: { required: true, type: () => String }, type: { required: true, enum: require("../types").DataMigrationSchemaObjectType }, definition: { required: true, type: () => String }, name: { required: true, type: () => String }, MigrationObject: { required: true, type: () => require("./dataMigration.entity").DataMigration } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DataMigrationSchemaObject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'uuid' }),
    __metadata("design:type", String)
], DataMigrationSchemaObject.prototype, "migrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        enum: types_1.DataMigrationSchemaObjectType,
        default: types_1.DataMigrationSchemaObjectType.table,
    }),
    __metadata("design:type", String)
], DataMigrationSchemaObject.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], DataMigrationSchemaObject.prototype, "definition", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], DataMigrationSchemaObject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dataMigration_entity_1.DataMigration, (dataMigration) => dataMigration.dataMigrationId),
    (0, typeorm_1.JoinColumn)({
        name: 'migration_id',
        referencedColumnName: 'dataMigrationId',
    }),
    __metadata("design:type", dataMigration_entity_1.DataMigration)
], DataMigrationSchemaObject.prototype, "MigrationObject", void 0);
DataMigrationSchemaObject = __decorate([
    (0, typeorm_1.Entity)()
], DataMigrationSchemaObject);
exports.DataMigrationSchemaObject = DataMigrationSchemaObject;
//# sourceMappingURL=dataMigrationSchemaObject.entity.js.map