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
exports.DataMigrationService = void 0;
const dataMigration_repository_1 = require("../repositories/dataMigration.repository");
const common_1 = require("@nestjs/common");
const dataMigration_entity_1 = require("../entities/dataMigration.entity");
const typeorm_1 = require("typeorm");
const types_1 = require("../../core/types");
const dataSource_entity_1 = require("../../data-source/dataSource.entity");
let DataMigrationService = class DataMigrationService {
    constructor(dataMigrationRepository) {
        this.dataMigrationRepository = dataMigrationRepository;
    }
    async create(tenantId, dataSourceId) {
        const dataMigration = this.dataMigrationRepository.create({
            tenantId,
            dataSourceId,
        });
        return this.dataMigrationRepository.save(dataMigration);
    }
    async findOne(findOneOptions) {
        const dataMigration = await this.dataMigrationRepository.findOne(findOneOptions);
        return dataMigration;
    }
    findAllByTenant(tenantId) {
        return this.dataMigrationRepository.find({
            where: { tenantId },
            relations: ['dataSource'],
        });
    }
    async delete(id, tenantId) {
        const dataMigration = await this.dataMigrationRepository.findOne({
            where: { dataMigrationId: id, tenantId },
        });
        if (!dataMigration) {
            throw new common_1.NotFoundException('User data migration not found!');
        }
        if ([
            types_1.DataMigrationStatus.DATA_SCHEMA_STARTED,
            types_1.DataMigrationStatus.DATA_MIGRATION_STARTED,
        ].includes(dataMigration.status)) {
            throw new common_1.NotFoundException('User data migration cannot be eliminated while processing!');
        }
        return await this.dataMigrationRepository.remove([dataMigration]);
    }
    async validateIntegrationExists(userId, dataSourceId, tenantId = 0) {
        return await (0, typeorm_1.createQueryBuilder)(dataSource_entity_1.DataSource, 'dataSource')
            .innerJoin('integration', 'integration', 'integration.application_id = dataSource.integration_id')
            .innerJoin('integration_state', 'integrationState', 'integrationState.integration_id = integration.id')
            .where('integrationState.user_id = :userId or integrationState.tenant_id = :tenantId', { userId, tenantId })
            .andWhere('dataSource.data_source_id = :dataSourceId', {
            dataSourceId,
        })
            .getRawOne();
    }
    async getMigrationByDataSourceName(userId, tenantId, dataSourceName) {
        return await (0, typeorm_1.createQueryBuilder)(dataMigration_entity_1.DataMigration, 'mig')
            .innerJoin(dataSource_entity_1.DataSource, 'dataSource', 'mig.data_source_id = dataSource.data_source_id')
            .where('mig.user_id = :userId or mig.tenant_id = :tenantId', {
            userId,
            tenantId,
        })
            .andWhere('dataSource.name = :dataSourceName', {
            dataSourceName,
        })
            .getOne();
    }
};
DataMigrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dataMigration_repository_1.DataMigrationRepository])
], DataMigrationService);
exports.DataMigrationService = DataMigrationService;
//# sourceMappingURL=data-migration.service.js.map