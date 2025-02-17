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
exports.DataSource = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const integration_entity_1 = require("../integration/integration.entity");
const dataMigration_entity_1 = require("../data-migration/entities/dataMigration.entity");
const types_1 = require("../core/types");
let DataSource = class DataSource {
    static _OPENAPI_METADATA_FACTORY() {
        return { dataSourceId: { required: true, type: () => String }, name: { required: true, type: () => String }, integrationId: { required: false, type: () => Number }, type: { required: true, type: () => String }, integration: { required: false, type: () => require("../integration/integration.entity").Integration }, userDataMigrations: { required: false, type: () => [require("../data-migration/entities/dataMigration.entity").DataMigration] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DataSource.prototype, "dataSourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], DataSource.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DataSource.prototype, "integrationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: types_1.DataSourceType, default: types_1.DataSourceType.TENANT }),
    __metadata("design:type", String)
], DataSource.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => integration_entity_1.Integration, (integration) => integration.dataSource),
    (0, typeorm_1.JoinColumn)({ name: 'integration_id', referencedColumnName: 'applicationId' }),
    __metadata("design:type", integration_entity_1.Integration)
], DataSource.prototype, "integration", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dataMigration_entity_1.DataMigration, (userDataMigration) => userDataMigration.dataSource),
    __metadata("design:type", Array)
], DataSource.prototype, "userDataMigrations", void 0);
DataSource = __decorate([
    (0, typeorm_1.Entity)()
], DataSource);
exports.DataSource = DataSource;
//# sourceMappingURL=dataSource.entity.js.map