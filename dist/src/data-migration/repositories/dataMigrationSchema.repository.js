"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMigrationSchemaRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const FunctionValueTranslator_1 = require("../classes/FunctionValueTranslator");
let DataMigrationSchemaRepository = class DataMigrationSchemaRepository {
    getSchemaTables(tenantId, dataSourceId) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.schema_tables`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'schema_tables')
            .getRawMany();
    }
    getSchemaDataTotalCount(userId, dataSourceId, tableId) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'table')
            .getRawMany();
    }
    getSchemaTableFields(userId, dataSourceId, tableId) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.schema_table_fields`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'fields')
            .where(`fields.\"tableId\" = :tableId`, { tableId })
            .getRawMany();
    }
    getSchemaTableField(userId, dataSourceId, tableId, fieldName) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.schema_table_fields`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'fields')
            .where(`fields.\"tableId\" = :tableId and fields.\"fieldName\" = :fieldName`, { tableId, fieldName })
            .getRawOne();
    }
    getSchemaTableForeignReferencesFields(userId, dataSourceId, tableId) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.schema_table_lookups`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'lookup')
            .where(`lookup.\"referenceTo\" = :tableId and lookup.\"tableId\" != :tableId`, {
            tableId,
        })
            .getRawMany();
    }
    getSchemaTableLookups(userId, dataSourceId, tableId) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.schema_table_lookups`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 'lookup')
            .where(`lookup.\"tableId\" = :tableId`, { tableId })
            .getRawMany();
    }
    getMinAndMaxValue(userId, dataSourceId, tableId, fieldName) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .select('MAX(tab."' + fieldName + '")', 'max')
            .addSelect('MIN(tab."' + fieldName + '")', 'min')
            .from(tableName, 'tab')
            .getRawOne();
    }
    getFieldValueOptions(tenantId, dataSourceId, tableId, fieldName) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .select(`tab."${fieldName}"`, 'option')
            .distinct(true)
            .from(tableName, 'tab')
            .getRawMany();
    }
    getTableData(tenantId, dataSourceId, tableId, paginationOptions, action, conditions = [], fields = [], orderBy = []) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        let query = (0, typeorm_1.getConnection)().createQueryBuilder().from(tableName, 'table');
        if ((fields === null || fields === void 0 ? void 0 : fields.length) > 0 && action === 'retrieve') {
            query = query.select(fields.map((field) => `"${field}"`));
        }
        else if (action === 'retrieve')
            query = query.select('*');
        else if (action === 'count') {
            query = query.select('count(*)');
        }
        conditions.forEach((condition) => {
            let conditionFieldString = '';
            if (typeof condition.field === 'object') {
                [conditionFieldString] = FunctionValueTranslator_1.FunctionValueTranslator.translateFunctionValue(condition.field);
            }
            else {
                conditionFieldString = `"${condition.field}"`;
            }
            query = query.andWhere(`${conditionFieldString} ${condition.operator} ${condition.value}`);
        });
        orderBy.forEach((option) => {
            query = query.addOrderBy(`"${option.fieldName}"`, (option.order || 'ASC').toUpperCase());
        });
        query = query.skip(paginationOptions.skip).take(paginationOptions.take);
        return query.getRawMany();
    }
    async getEmailsData(tenantId, dataSourceId, emailsTasksIds) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}."EmailMessage"`;
        const emailsMessagesQuery = await (0, typeorm_1.getConnection)().query(`
        Select em.*, 
        COALESCE(JSON_AGG(
        JSON_BUILD_OBJECT(
          'RelationType', emr."RelationType",
          'RelationId', emr."RelationId", 
          'RelationObjectType', emr."RelationObjectType"
        ) 
        ) FILTER (WHERE emr."Id" IS NOT NULL AND emr."RelationObjectType" IS NOT NULL), '[]' ) as "Relations"
        From ${tableName} em
        LEFT JOIN ${schemaName}."EmailMessageRelation" emr
        On em."Id" = emr."EmailMessageId" 
        Where em."ActivityId" In (${emailsTasksIds
            .map((id) => `'${id}'`)
            .join(', ')})
        group by em."Id"
      `);
        if ((emailsMessagesQuery === null || emailsMessagesQuery === void 0 ? void 0 : emailsMessagesQuery.length) === 0)
            return [];
        const enrichments = await (0, typeorm_1.getConnection)().query(`
          Select * from ${schemaName}.cc_schema_enriched_records cser
          Left Join public.data_migration dm
          On dm.data_migration_id::TEXT = cser."sourceMigrationId"
          Where cser."targetId" In (${emailsMessagesQuery
            .map(({ Id }) => `'${Id}'`)
            .join(', ')})
        `);
        const attachments = await Promise.all(enrichments.map((singleEntry) => {
            return (0, typeorm_1.getConnection)().query(`
            Select m."attachments", m."id", m."conversationId" from mig_${singleEntry.user_id}_${singleEntry.data_source_id.replace(/(\-)/g, '_')}.message m
            Where m."id" = '${singleEntry.sourceId}'
            `);
        }));
        return emailsMessagesQuery.map((email) => {
            const relatedAttachment = attachments
                .flat()
                .find((singleAttachment) => {
                var _a;
                return singleAttachment.id ===
                    ((_a = enrichments.find((enrichment) => enrichment.targetId === email.Id)) === null || _a === void 0 ? void 0 : _a.sourceId);
            });
            console.log(relatedAttachment);
            return Object.assign(Object.assign({}, email), { Attachment: relatedAttachment === null || relatedAttachment === void 0 ? void 0 : relatedAttachment.attachments, ConversationId: relatedAttachment === null || relatedAttachment === void 0 ? void 0 : relatedAttachment.conversationId });
        });
    }
    getTableDataGroupCounter(tenantId, dataSourceId, tableId, conditions = [], groupBy = []) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        let query = (0, typeorm_1.getConnection)().createQueryBuilder().from(tableName, 'table');
        conditions.forEach((condition) => {
            let conditionFieldString = '';
            if (typeof condition.field === 'object') {
                [conditionFieldString] = FunctionValueTranslator_1.FunctionValueTranslator.translateFunctionValue(condition.field);
            }
            else {
                conditionFieldString = `"${condition.field}"`;
            }
            query = query.andWhere(`${conditionFieldString} ${condition.operator} ${condition.value}`);
        });
        groupBy.forEach((field) => {
            if (typeof field === 'object') {
                const functionValue = field;
                const [value, alias] = FunctionValueTranslator_1.FunctionValueTranslator.translateFunctionValue(functionValue);
                query = query.addSelect(value, alias);
                query = query.addGroupBy(value);
            }
            else {
                query = query.addSelect(`"${field}"`);
                query = query.addGroupBy(`"${field}"`);
            }
        });
        query = query.addSelect(`count(*)::int as count`);
        console.log(query.getSql());
        return query.getRawMany();
    }
    getFuzzySearch(tenantId, dataSourceId, tableId, fuzzySearchQuery) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        let query = (0, typeorm_1.getConnection)().createQueryBuilder().from(tableName, 'table');
        const skip = fuzzySearchQuery.skip || 0;
        const limit = fuzzySearchQuery.limit || 10;
        const condition = fuzzySearchQuery.condition;
        let fuzzyString = `SIMILARITY("${condition.fieldName}", '${condition.value}')`;
        if (fuzzySearchQuery.fallBackSearchField) {
            const fallBackSearchValue = fuzzySearchQuery.fallBackSearchField.map((field) => `coalesce("${field}", '')`);
            const fallBakSearchString = fallBackSearchValue.join(`|| ' ' ||`);
            fuzzyString = `SIMILARITY(coalesce("${condition.fieldName}", ${fallBakSearchString}), '${condition.value}')`;
        }
        query.select('*');
        query.addSelect(`${fuzzyString} score`);
        if (fuzzySearchQuery.minPercentage) {
            query.where(`${fuzzyString} >= ${fuzzySearchQuery.minPercentage}`);
        }
        query = query.skip(skip).take(limit);
        query.orderBy('score', 'DESC');
        console.log('SQL::', query.getSql());
        return query.getRawMany();
    }
    getDataValidationTableData(userId, dataSourceId, tableId, paginationOptions, ruleIds) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        const query = (0, typeorm_1.getConnection)().createQueryBuilder().from(tableName, 'table');
        ruleIds.forEach((ruleId, index) => {
            query.orWhere(`rules_applied::jsonb ? :ruleId${index}`, {
                [`ruleId${index}`]: ruleId,
            });
        });
        return query
            .skip(paginationOptions.skip)
            .take(paginationOptions.take)
            .getRawMany();
    }
    getDataValidationTableTotalData(userId, dataSourceId, tableId, ruleIds) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        const query = (0, typeorm_1.getConnection)().createQueryBuilder().from(tableName, 'table');
        ruleIds.forEach((ruleId, index) => {
            query.orWhere(`rules_applied::jsonb ? :ruleId${index}`, {
                [`ruleId${index}`]: ruleId,
            });
        });
        return query.getRawMany();
    }
    updateTableData(userId, dataSourceId, tableId, updates) {
        const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        const proms = updates.map(async (row) => {
            const temp = Object.assign({}, row);
            delete temp.id;
            delete temp.Id;
            delete temp.edit;
            try {
                await (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .update(tableName)
                    .set(Object.assign({}, temp))
                    .where('"Id" = :value', { value: row.Id })
                    .execute();
                return;
            }
            catch (e) {
                console.log('Error:', e);
                throw e;
            }
        });
        return Promise.all(proms);
    }
    getBookmarkedTableDataTotal(tenantId, dataSourceId, tableId) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 't')
            .where('t.bookmark = :value', { value: true })
            .getRawMany();
    }
    getMigrationRecord(tenantId, dataSourceId, tableId, recordId) {
        const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.${tableId}`;
        return (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .from(tableName, 't')
            .where('t."Id" = :value', { value: recordId })
            .getRawOne();
    }
    getRuleStats({ migration, tableId, date, interval }) {
        const schemaName = `mig_${migration.tenantId || migration.userId}_${migration.dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.cc_schema_rule_stats`;
        const query = `
    with top_rules as (
    SELECT s.rule_id, AVG(s.affected_row_count) avg_affected_row_count 
    FROM ${tableName} s 
    WHERE 
      s."table" = $1
      AND date_trunc($2, s."date") = date_trunc($3, $4::date)
    GROUP BY rule_id
    HAVING AVG(s.affected_row_count) > 0
    )
    select t.rule_id, t.avg_affected_row_count,
    CASE 
      WHEN r.deleted_at IS NOT NULL THEN array_to_string(array_remove(string_to_array(r."name", '-'), split_part(r."name", '-', 1)), '-') || ' (Deleted)'
      ELSE r."name"
    END AS name
    FROM top_rules t
    INNER JOIN public.rule r ON t.rule_id::uuid = r.rule_id 
    order by  avg_affected_row_count desc`;
        return (0, typeorm_1.getConnection)().query(query, [tableId, interval, interval, date]);
    }
    getTableStats({ tableId, statType, startDate, interval, migration, }) {
        const schemaName = `mig_${migration.tenantId || migration.userId}_${migration.dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.cc_schema_table_stats`;
        let dateConditional = '';
        if (startDate) {
            dateConditional = `and "date" >= '${new Date(startDate).toISOString()}'`;
        }
        const query = `
    SELECT
        DATE_TRUNC($1, "date") AS "date_start",
        ROUND(AVG("avg_confidence_score"), 2) AS score,
        Max("row_count") as "row_count",
        Max("row_affected_count") as "row_affected_count"
    FROM ${tableName} 
    where table_name = $2 and "type" = $3 ${dateConditional} 
    GROUP BY date_start
    ORDER BY date_start;`;
        return (0, typeorm_1.getConnection)().query(query, [interval, tableId, statType]);
    }
    getRecordStatsScoreDiff({ tableId, statType, startDate1, startDate2, interval, migration, }) {
        const schemaName = `mig_${migration.tenantId || migration.userId}_${migration.dataSourceId}`.replace(/(\-)/g, '_');
        const tableName = `${schemaName}.cc_schema_record_stats`;
        const targetTableName = `${schemaName}."${tableId}"`;
        const query = `
      WITH scores AS (
          SELECT
              t1.record_id,
              ROUND(AVG(t1.confidence_score)) confidence_score
          FROM ${tableName} t1
          WHERE
              table_name = $1
              AND "type" = $2
              AND date_trunc($3, t1."date") = $4
          GROUP BY 
              record_id
      )
      SELECT
          sc.record_id, 
          sc.confidence_score score1,
          t2.confidence_score score2,
          ROUND(t2.confidence_score - sc.confidence_score, 2) AS score_diff
      FROM 
          scores sc 
      INNER JOIN ${targetTableName} t2 on sc."record_id" = t2."Id"
      ORDER by score_diff;`;
        return (0, typeorm_1.getConnection)().query(query, [
            tableId,
            statType,
            interval,
            startDate1,
        ]);
    }
};
DataMigrationSchemaRepository = __decorate([
    (0, common_1.Injectable)()
], DataMigrationSchemaRepository);
exports.DataMigrationSchemaRepository = DataMigrationSchemaRepository;
//# sourceMappingURL=dataMigrationSchema.repository.js.map