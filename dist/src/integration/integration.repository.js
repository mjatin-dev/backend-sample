"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const integration_entity_1 = require("./integration.entity");
const types_1 = require("../core/types");
let IntegrationRepository = class IntegrationRepository extends typeorm_transactional_cls_hooked_1.BaseRepository {
    async getIntegrationsWithStateByUser(userId) {
        return await (0, typeorm_1.createQueryBuilder)(integration_entity_1.Integration, 'integration')
            .leftJoinAndSelect('integration.integratedApps', 'state', 'state.user_id = :userId', { userId })
            .leftJoinAndSelect('state.user', 'user')
            .where('integration.type = :type', { type: types_1.IntegrationType.USER })
            .getMany();
    }
    async getIntegrationsWithStateByTenant(tenantId) {
        return await (0, typeorm_1.createQueryBuilder)(integration_entity_1.Integration, 'integration')
            .leftJoinAndSelect('integration.integratedApps', 'state', 'state.tenant_id = :tenantId', { tenantId })
            .where('integration.type = :type', { type: types_1.IntegrationType.TENANT })
            .getMany();
    }
    async getOneIntegrationWithStateByUser(userId, applicationId) {
        return await (0, typeorm_1.createQueryBuilder)(integration_entity_1.Integration, 'integration')
            .leftJoinAndSelect('integration.integratedApps', 'state', 'state.user_id = :userId', { userId })
            .leftJoinAndSelect('state.user', 'user')
            .where('integration.applicationId = :applicationId and integration.type = :type', { applicationId, type: types_1.IntegrationType.USER })
            .getOne();
    }
    async getOneIntegrationWithStateByTenant(tenantId, applicationId) {
        return await (0, typeorm_1.createQueryBuilder)(integration_entity_1.Integration, 'integration')
            .leftJoinAndSelect('integration.integratedApps', 'state', 'state.tenant_id = :tenantId', { tenantId })
            .where('integration.applicationId = :applicationId and integration.type = :type', { applicationId, type: types_1.IntegrationType.TENANT })
            .getOne();
    }
};
IntegrationRepository = __decorate([
    (0, typeorm_1.EntityRepository)(integration_entity_1.Integration)
], IntegrationRepository);
exports.IntegrationRepository = IntegrationRepository;
//# sourceMappingURL=integration.repository.js.map