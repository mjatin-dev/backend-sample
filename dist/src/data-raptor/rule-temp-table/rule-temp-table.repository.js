"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleTempTableRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const rule_temp_table_entity_1 = require("./rule-temp-table.entity");
let RuleTempTableRepository = class RuleTempTableRepository extends typeorm_transactional_cls_hooked_1.BaseRepository {
    async getDependenciesAssociated(migrationId, tableId) {
        const query = (0, typeorm_1.createQueryBuilder)()
            .from('rule_temp_table', 'table')
            .innerJoin('rule_temp_table_dependency', 'dep', 'dep.ruleTempTableId = table.rule_temp_table_id')
            .innerJoin('rule', 'r', 'r.rule_id = dep.ruleId')
            .select('dep.ruleTempTableId', 'ruleTempTableId')
            .addSelect('dep.ruleId', 'ruleId')
            .where('table.rule_temp_table_id = :tableId', { tableId })
            .andWhere('table.data_migration_id = :migrationId', { migrationId });
        return query.getRawMany();
    }
};
RuleTempTableRepository = __decorate([
    (0, typeorm_1.EntityRepository)(rule_temp_table_entity_1.RuleTempTable)
], RuleTempTableRepository);
exports.RuleTempTableRepository = RuleTempTableRepository;
//# sourceMappingURL=rule-temp-table.repository.js.map