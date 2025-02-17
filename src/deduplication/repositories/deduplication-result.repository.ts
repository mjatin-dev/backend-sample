import { Injectable } from '@nestjs/common';
import { Brackets, UpdateResult, getConnection } from 'typeorm';
import { DeduplicationResultDto } from '../dto/deduplication-result.response.dto';
import { DeduplicationResultStatus } from '../dto/update-deduplication-result-status.dto';

export interface DeduplicationQueryOption {
  limit: number;
  tables?: string[];
}

@Injectable()
export class DeduplicationResultRepository {
  async getDeduplicationResultData(
    tenantId: number,
    dataSourceId: string,
    queryOption: DeduplicationQueryOption,
  ): Promise<DeduplicationResultDto[]> {
    const connection = getConnection();
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.cc_duplicate_detection`;
    const limit = queryOption.limit || 200;
    const validTables = ['Lead', 'Opportunity', 'Contact', 'Account'];
    const tablesSelected = queryOption.tables || validTables;
    const filteredTables = tablesSelected.filter((table) =>
      validTables.includes(table),
    );
    if (filteredTables.length === 0) {
      return [];
    }
    const tablesArrayString = filteredTables
      .map((table) => `'${table}'`)
      .join(',');
    const limitPerTable = Math.floor(limit / filteredTables.length);

    const withClause = `WITH combined AS (SELECT * from ${tableName} WHERE status = 'A' and record_a_table in (${tablesArrayString}) or record_b_table in (${tablesArrayString}))`;
    const tableSubQueries = filteredTables.map((table) => {
      return `SELECT * FROM (SELECT * FROM combined where record_a_table = '${table}' or record_b_table = '${table}' limit ${Math.floor(
        limitPerTable,
      )}) as ${table.toLocaleLowerCase()}`;
    });
    const tableSubQueriesString = tableSubQueries.join(' UNION ');

    const query = `${withClause} ${tableSubQueriesString}`;

    const res = await connection.query(query);
    return res;
  }

  getDeduplicationResultDataByIds(
    tenantId: number,
    dataSourceId: string,
    ids: string[],
  ): Promise<DeduplicationResultDto[]> {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.cc_duplicate_detection`;
    const query = getConnection()
      .createQueryBuilder()
      .from(tableName, 'tab')
      .select('*')
      .where('tab.status = :status', { status: 'A' }) // Brings only active records
      .andWhere(
        new Brackets((qb) => {
          qb.where(`tab."record_a_id" IN (:...ids1)`, { ids1: ids }).orWhere(
            `tab."record_b_id" IN (:...ids2)`,
            { ids2: ids },
          );
        }),
      );
    return query.getRawMany();
  }

  updateDeduplicationResultStatus(
    tenantId: number,
    dataSourceId: string,
    newStatus: DeduplicationResultStatus,
    ids: string[],
  ): Promise<UpdateResult> {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const tableName = `${schemaName}.cc_duplicate_detection`;
    const query = getConnection()
      .createQueryBuilder()
      .update(tableName)
      .set({ status: newStatus as string })
      .where(`"id" IN (:...ids1)`, { ids1: ids });
    return query.execute();
  }
}
