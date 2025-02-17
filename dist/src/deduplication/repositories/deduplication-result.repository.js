"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeduplicationResultRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DeduplicationResultRepository = class DeduplicationResultRepository {
    async getDeduplicationResultData(tenantId, dataSourceId, queryOption) {
        const connection = (0, typeorm_1.getConnection)();
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.cc_duplicate_detection`;
        const limit = queryOption.limit || 200;
        const validTables = ['Lead', 'Opportunity', 'Contact', 'Account'];
        const tablesSelected = queryOption.tables || validTables;
        const filteredTables = tablesSelected.filter((table) => validTables.includes(table));
        if (filteredTables.length === 0) {
            return [];
        }
        const tablesArrayString = filteredTables
            .map((table) => `'${table}'`)
            .join(',');
        const limitPerTable = Math.floor(limit / filteredTables.length);
        const withClause = `WITH combined AS (SELECT * from ${tableName} WHERE status = 'A' and record_a_table in (${tablesArrayString}) or record_b_table in (${tablesArrayString}))`;
        const tableSubQueries = filteredTables.map((table) => {
            return `SELECT * FROM (SELECT * FROM combined where record_a_table = '${table}' or record_b_table = '${table}' limit ${Math.floor(limitPerTable)}) as ${table.toLocaleLowerCase()}`;
        });
        const tableSubQueriesString = tableSubQueries.join(' UNION ');
        const query = `${withClause} ${tableSubQueriesString}`;
        const res = await connection.query(query);
        return res;
    }
    getDeduplicationResultDataByIds(tenantId, dataSourceId, ids) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.cc_duplicate_detection`;
        const query = (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'tab')
            .select('*')
            .where('tab.status = :status', { status: 'A' })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where(`tab."record_a_id" IN (:...ids1)`, { ids1: ids }).orWhere(`tab."record_b_id" IN (:...ids2)`, { ids2: ids });
        }));
        return query.getRawMany();
    }
    updateDeduplicationResultStatus(tenantId, dataSourceId, newStatus, ids) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.cc_duplicate_detection`;
        const query = (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .update(tableName)
            .set({ status: newStatus })
            .where(`"id" IN (:...ids1)`, { ids1: ids });
        return query.execute();
    }
};
DeduplicationResultRepository = __decorate([
    (0, common_1.Injectable)()
], DeduplicationResultRepository);
exports.DeduplicationResultRepository = DeduplicationResultRepository;
//# sourceMappingURL=deduplication-result.repository.js.map