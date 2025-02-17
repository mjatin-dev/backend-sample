import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { paginationOptions } from './../types';
import { Condition } from '../dto/condition.dto';
import { FuzzySearchDto } from '../dto/post-fuzzy-search';
import { FunctionValue } from '../dto/function-value.dto';
import { FunctionValueTranslator } from '../classes/FunctionValueTranslator';
import { OrderByOption } from '../dto/getDataMigrationTableRecords.dto';
import {
  GetRecordStatsScoreDiffParams,
  GetRuleStatParams,
  GetTableStatsParams,
} from '../dto/get-table-stats.dto';

@Injectable()
export class DataMigrationSchemaRepository {
  getSchemaTables(tenantId: number, dataSourceId: string) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_tables`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'schema_tables')
      .getRawMany();
  }

  getSchemaDataTotalCount(
    userId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'table')
      .getRawMany();
  }

  getSchemaTableFields(userId: number, dataSourceId: string, tableId: string) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_table_fields`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'fields')
      .where(`fields.\"tableId\" = :tableId`, { tableId })
      .getRawMany();
  }

  getSchemaTableField(
    userId: number,
    dataSourceId: string,
    tableId: string,
    fieldName: string,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_table_fields`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'fields')
      .where(
        `fields.\"tableId\" = :tableId and fields.\"fieldName\" = :fieldName`,
        { tableId, fieldName },
      )
      .getRawOne();
  }

  getSchemaTableForeignReferencesFields(
    userId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_table_lookups`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'lookup')
      .where(
        `lookup.\"referenceTo\" = :tableId and lookup.\"tableId\" != :tableId`,
        {
          tableId,
        },
      )
      .getRawMany();
  }

  getSchemaTableLookups(userId: number, dataSourceId: string, tableId: string) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.schema_table_lookups`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 'lookup')
      .where(`lookup.\"tableId\" = :tableId`, { tableId })
      .getRawMany();
  }

  getMinAndMaxValue(
    userId: number,
    dataSourceId: string,
    tableId: string,
    fieldName: string,
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .select('MAX(tab."' + fieldName + '")', 'max')
      .addSelect('MIN(tab."' + fieldName + '")', 'min')
      .from(tableName, 'tab')
      .getRawOne();
  }

  getFieldValueOptions(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    fieldName: string,
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .select(`tab."${fieldName}"`, 'option')
      .distinct(true)
      .from(tableName, 'tab')
      .getRawMany();
  }

  getTableData(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions: paginationOptions,
    action: string,
    conditions: Condition[] = [],
    fields: string[] = [],
    orderBy: OrderByOption[] = [],
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    let query = getConnection().createQueryBuilder().from(tableName, 'table');

    if (fields?.length > 0 && action === 'retrieve') {
      query = query.select(fields.map((field) => `"${field}"`));
    } else if (action === 'retrieve') query = query.select('*');
    else if (action === 'count') {
      query = query.select('count(*)');
    }

    conditions.forEach((condition) => {
      let conditionFieldString = '';
      if (typeof condition.field === 'object') {
        [conditionFieldString] = FunctionValueTranslator.translateFunctionValue(
          condition.field,
        );
      } else {
        conditionFieldString = `"${condition.field}"`;
      }
      query = query.andWhere(
        `${conditionFieldString} ${condition.operator} ${condition.value}`,
      );
    });

    orderBy.forEach((option) => {
      query = query.addOrderBy(
        `"${option.fieldName}"`,
        (option.order || 'ASC').toUpperCase() as any,
      );
    });

    query = query.skip(paginationOptions.skip).take(paginationOptions.take);

    return query.getRawMany();
  }
  async getEmailsData(
    tenantId: number,
    dataSourceId: string,
    emailsTasksIds: string[],
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}."EmailMessage"`;
    console.log(emailsTasksIds);

    const emailsMessagesQuery = await getConnection().query(
      `
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
      `,
    );

    if (emailsMessagesQuery?.length === 0) return [];

    const enrichments = await getConnection().query(
      `
          Select * from ${schemaName}.cc_schema_enriched_records cser
          Left Join public.data_migration dm
          On dm.data_migration_id::TEXT = cser."sourceMigrationId"
          Where cser."targetId" In (${emailsMessagesQuery
            .map(({ Id }) => `'${Id}'`)
            .join(', ')})
        `,
    );

    const attachments = await Promise.all(
      enrichments.map((singleEntry) => {
        if (!singleEntry.data_source_id) return [];
        return getConnection().query(
          `
            Select m."attachments", m."id", m."conversationId" from mig_${
              singleEntry.user_id
            }_${singleEntry.data_source_id.replace(/(\-)/g, '_')}.message m
            Where m."id" = '${singleEntry.sourceId}'
            `,
        );
      }),
    );

    return emailsMessagesQuery.map((email) => {
      const relatedEnrichment = enrichments.find(
        (enrichment) => enrichment.targetId === email.Id,
      );
      const relatedAttachment = attachments
        .flat()
        .find(
          (singleAttachment) =>
            singleAttachment.id === relatedEnrichment?.sourceId,
        );

      return {
        ...email,
        Attachment: relatedAttachment?.attachments,
        ConversationId: relatedAttachment?.conversationId,
        MessageSourceId: relatedAttachment?.id,
        dataSourceId: relatedEnrichment?.sourceMigrationId,
      };
    });
  }

  getTableDataGroupCounter(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    conditions: Condition[] = [],
    groupBy: (string | FunctionValue)[] = [],
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    let query = getConnection().createQueryBuilder().from(tableName, 'table');

    conditions.forEach((condition) => {
      let conditionFieldString = '';
      if (typeof condition.field === 'object') {
        [conditionFieldString] = FunctionValueTranslator.translateFunctionValue(
          condition.field,
        );
      } else {
        conditionFieldString = `"${condition.field}"`;
      }
      query = query.andWhere(
        `${conditionFieldString} ${condition.operator} ${condition.value}`,
      );
    });

    groupBy.forEach((field) => {
      if (typeof field === 'object') {
        const functionValue = field as FunctionValue;
        const [value, alias] =
          FunctionValueTranslator.translateFunctionValue(functionValue);
        query = query.addSelect(value, alias);
        query = query.addGroupBy(value);
      } else {
        query = query.addSelect(`"${field}"`);
        query = query.addGroupBy(`"${field}"`);
      }
    });

    query = query.addSelect(`count(*)::int as count`);

    console.log(query.getSql());

    return query.getRawMany();
  }

  getFuzzySearch(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    fuzzySearchQuery: FuzzySearchDto,
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    let query = getConnection().createQueryBuilder().from(tableName, 'table');

    const skip = fuzzySearchQuery.skip || 0;
    const limit = fuzzySearchQuery.limit || 10;
    const condition = fuzzySearchQuery.condition;
    let fuzzyString = `SIMILARITY("${condition.fieldName}", '${condition.value}')`;

    if (fuzzySearchQuery.fallBackSearchField) {
      const fallBackSearchValue = fuzzySearchQuery.fallBackSearchField.map(
        (field) => `coalesce("${field}", '')`,
      );
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

  getDataValidationTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions: paginationOptions,
    ruleIds: string[],
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;

    const query = getConnection().createQueryBuilder().from(tableName, 'table');

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

  getDataValidationTableTotalData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    ruleIds: string[],
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;

    const query = getConnection().createQueryBuilder().from(tableName, 'table');

    ruleIds.forEach((ruleId, index) => {
      query.orWhere(`rules_applied::jsonb ? :ruleId${index}`, {
        [`ruleId${index}`]: ruleId,
      });
    });
    return query.getRawMany();
  }

  updateTableData(
    userId: number,
    dataSourceId: string,
    tableId: string,
    updates: any[],
  ) {
    const schemaName = `mig_${userId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;

    const proms = updates.map(async (row) => {
      const temp = { ...row };
      delete temp.id;
      delete temp.Id;
      delete temp.edit;
      try {
        await getConnection()
          .createQueryBuilder()
          .update(tableName)
          .set({ ...temp })
          .where('"Id" = :value', { value: row.Id })
          .execute();
        return;
      } catch (e) {
        console.log('Error:', e);
        throw e;
      }
    });

    return Promise.all(proms);
  }

  getBookmarkedTableDataTotal(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 't')
      .where('t.bookmark = :value', { value: true })
      .getRawMany();
  }

  getMigrationRecord(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    recordId: string,
  ) {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.${tableId}`;
    return getConnection()
      .createQueryBuilder()
      .from(tableName, 't')
      .where('t."Id" = :value', { value: recordId })
      .getRawOne();
  }

  getRuleStats({ migration, tableId, date, interval }: GetRuleStatParams) {
    const schemaName = `mig_${migration.tenantId || migration.userId}_${
      migration.dataSourceId
    }`.replace(/(\-)/g, '_');
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

    return getConnection().query(query, [tableId, interval, interval, date]);
  }

  getTableStats({
    tableId,
    statType,
    startDate,
    interval,
    migration,
  }: GetTableStatsParams) {
    const schemaName = `mig_${migration.tenantId || migration.userId}_${
      migration.dataSourceId
    }`.replace(/(\-)/g, '_');
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

    return getConnection().query(query, [interval, tableId, statType]);
  }

  getRecordStatsScoreDiff({
    tableId,
    statType,
    startDate1,
    startDate2,
    interval,
    migration,
  }: GetRecordStatsScoreDiffParams) {
    const schemaName = `mig_${migration.tenantId || migration.userId}_${
      migration.dataSourceId
    }`.replace(/(\-)/g, '_');
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

    return getConnection().query(query, [
      tableId,
      statType,
      interval,
      startDate1,
    ]);
  }
}
