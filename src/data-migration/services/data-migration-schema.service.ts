import { Injectable } from '@nestjs/common';
import { DataMigrationSchemaRepository } from '../repositories/dataMigrationSchema.repository';
import { paginationOptions } from './../types';
import { Condition } from '../dto/condition.dto';
import { FuzzySearchDto } from '../dto/post-fuzzy-search';
import { FunctionValue } from '../dto/function-value.dto';
import { OrderByOption } from '../dto/getDataMigrationTableRecords.dto';
import {
  GetRecordStatsScoreDiffParams,
  GetRuleStatParams,
  GetTableStatsParams,
} from '../dto/get-table-stats.dto';

@Injectable()
export class DataMigrationSchemaService {
  constructor(
    private dataMigrationSchemaRepository: DataMigrationSchemaRepository,
  ) {}

  getSchemaTables(tenantId: number, dataSourceId: string) {
    return this.dataMigrationSchemaRepository.getSchemaTables(
      tenantId,
      dataSourceId,
    );
  }

  getSchemaDataTotalCount(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getSchemaDataTotalCount(
      tenantId,
      dataSourceId,
      tableId,
    );
  }

  getSchemaTableFields(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getSchemaTableFields(
      tenantId,
      dataSourceId,
      tableId,
    );
  }

  getSchemaTableField(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    fieldName: string,
  ) {
    return this.dataMigrationSchemaRepository.getSchemaTableField(
      tenantId,
      dataSourceId,
      tableId,
      fieldName,
    );
  }

  getSchemaTableForeignReferences(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getSchemaTableForeignReferencesFields(
      tenantId,
      dataSourceId,
      tableId,
    );
  }

  getSchemaTableLookups(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getSchemaTableLookups(
      tenantId,
      dataSourceId,
      tableId,
    );
  }

  getMinAndMaxValue(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    fieldName: string,
  ) {
    return this.dataMigrationSchemaRepository.getMinAndMaxValue(
      tenantId,
      dataSourceId,
      tableId,
      fieldName,
    );
  }

  getFieldValueOptions(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    fieldName: string,
  ) {
    return this.dataMigrationSchemaRepository.getFieldValueOptions(
      tenantId,
      dataSourceId,
      tableId,
      fieldName,
    );
  }

  getTableData(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    action: string,
    paginationOptions?: paginationOptions,
    conditions: Condition[] = [],
    fields: string[] = [],
    orderBy: OrderByOption[] = [],
  ) {
    const options = {
      skip: (paginationOptions && paginationOptions.skip) || 0,
      take: (paginationOptions && paginationOptions.take) || 20,
    };
    return this.dataMigrationSchemaRepository.getTableData(
      tenantId,
      dataSourceId,
      tableId,
      options,
      action,
      conditions,
      fields,
      orderBy,
    );
  }
  getEmailsData(tenantId: number, dataSourceId: string, tasksIds: string[]) {
    return this.dataMigrationSchemaRepository.getEmailsData(
      tenantId,
      dataSourceId,
      tasksIds,
    );
  }

  getTableDataGroupCounter(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    conditions: Condition[] = [],
    groupBy: (string | FunctionValue)[] = [],
  ) {
    return this.dataMigrationSchemaRepository.getTableDataGroupCounter(
      tenantId,
      dataSourceId,
      tableId,
      conditions,
      groupBy,
    );
  }

  getFuzzySearch(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    fuzzySearchQuery: FuzzySearchDto,
  ) {
    return this.dataMigrationSchemaRepository.getFuzzySearch(
      tenantId,
      dataSourceId,
      tableId,
      fuzzySearchQuery,
    );
  }

  getDataValidationTableData(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    paginationOptions?: paginationOptions,
    ruleIds?: string[],
  ) {
    const options = {
      skip: (paginationOptions && paginationOptions.skip) || 0,
      take: (paginationOptions && paginationOptions.take) || 25,
    };
    return this.dataMigrationSchemaRepository.getDataValidationTableData(
      tenantId,
      dataSourceId,
      tableId,
      options,
      ruleIds,
    );
  }

  getDataValidationTableTotalData(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    ruleIds?: string[],
  ) {
    return this.dataMigrationSchemaRepository.getDataValidationTableTotalData(
      tenantId,
      dataSourceId,
      tableId,
      ruleIds,
    );
  }

  updateTableData(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    updates: any[],
  ) {
    return this.dataMigrationSchemaRepository.updateTableData(
      tenantId,
      dataSourceId,
      tableId,
      updates,
    );
  }

  getBookmarkedTableData(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
  ) {
    return this.dataMigrationSchemaRepository.getBookmarkedTableDataTotal(
      tenantId,
      dataSourceId,
      tableId,
    );
  }

  getMigrationRecord(
    tenantId: number,
    dataSourceId: string,
    tableId: string,
    recordId: string,
  ) {
    return this.dataMigrationSchemaRepository.getMigrationRecord(
      tenantId,
      dataSourceId,
      tableId,
      recordId,
    );
  }

  getTableStats(params: GetTableStatsParams) {
    return this.dataMigrationSchemaRepository.getTableStats(params);
  }

  getRecordStatsScoreDiff(params: GetRecordStatsScoreDiffParams) {
    return this.dataMigrationSchemaRepository.getRecordStatsScoreDiff(params);
  }

  getRuleStats(params: GetRuleStatParams) {
    return this.dataMigrationSchemaRepository.getRuleStats(params);
  }
}
