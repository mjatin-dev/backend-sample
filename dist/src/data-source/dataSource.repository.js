"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const dataSource_entity_1 = require("./dataSource.entity");
const integrationState_entity_1 = require("../integration/integrationState.entity");
const integration_entity_1 = require("../integration/integration.entity");
const dataMigration_entity_1 = require("../data-migration/entities/dataMigration.entity");
let DataSourceRepository = class DataSourceRepository extends typeorm_transactional_cls_hooked_1.BaseRepository {
    getAvailableDataSources(userId, tenantId) {
        return (0, typeorm_1.createQueryBuilder)(dataSource_entity_1.DataSource, 'ds')
            .leftJoinAndSelect(integration_entity_1.Integration, 'inte', 'inte.application_id = ds.integration_id ')
            .leftJoin(dataMigration_entity_1.DataMigration, 'dm', 'dm.data_source_id = ds.data_source_id and (dm.user_id = :userId or dm.tenant_id = :tenantId)', { userId, tenantId })
            .leftJoin(integrationState_entity_1.IntegrationState, 'inte_state', 'inte_state.integration_id  = inte.id and (inte_state.user_id = :userId or inte_state.tenant_id = :tenantId)', { userId, tenantId })
            .select([
            'ds.data_source_id as data_source_id',
            'ds.name as name',
            'ds.integration_id as integration_name_id',
            'inte.id as integration_id',
            'inte.application_icon as integration_icon',
            'inte_state.id as integration_state_id',
            'dm.status as migration_status',
            'dm.status_date as migration_status_date',
            'dm.data_migration_id as migration_id',
        ])
            .getRawMany();
    }
};
DataSourceRepository = __decorate([
    (0, typeorm_1.EntityRepository)(dataSource_entity_1.DataSource)
], DataSourceRepository);
exports.DataSourceRepository = DataSourceRepository;
//# sourceMappingURL=dataSource.repository.js.map