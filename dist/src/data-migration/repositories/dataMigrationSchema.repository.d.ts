import { paginationOptions } from './../types';
import { Condition } from '../dto/condition.dto';
import { FuzzySearchDto } from '../dto/post-fuzzy-search';
import { FunctionValue } from '../dto/function-value.dto';
import { OrderByOption } from '../dto/getDataMigrationTableRecords.dto';
import { GetRecordStatsScoreDiffParams, GetRuleStatParams, GetTableStatsParams } from '../dto/get-table-stats.dto';
export declare class DataMigrationSchemaRepository {
    getSchemaTables(tenantId: number, dataSourceId: string): Promise<any[]>;
    getSchemaDataTotalCount(userId: number, dataSourceId: string, tableId: string): Promise<any[]>;
    getSchemaTableFields(userId: number, dataSourceId: string, tableId: string): Promise<any[]>;
    getSchemaTableField(userId: number, dataSourceId: string, tableId: string, fieldName: string): Promise<any>;
    getSchemaTableForeignReferencesFields(userId: number, dataSourceId: string, tableId: string): Promise<any[]>;
    getSchemaTableLookups(userId: number, dataSourceId: string, tableId: string): Promise<any[]>;
    getMinAndMaxValue(userId: number, dataSourceId: string, tableId: string, fieldName: string): Promise<any>;
    getFieldValueOptions(tenantId: number, dataSourceId: string, tableId: string, fieldName: string): Promise<any[]>;
    getTableData(tenantId: number, dataSourceId: string, tableId: string, paginationOptions: paginationOptions, action: string, conditions?: Condition[], fields?: string[], orderBy?: OrderByOption[]): Promise<any[]>;
    getEmailsData(tenantId: number, dataSourceId: string, emailsTasksIds: string[]): Promise<any>;
    getTableDataGroupCounter(tenantId: number, dataSourceId: string, tableId: string, conditions?: Condition[], groupBy?: (string | FunctionValue)[]): Promise<any[]>;
    getFuzzySearch(tenantId: number, dataSourceId: string, tableId: string, fuzzySearchQuery: FuzzySearchDto): Promise<any[]>;
    getDataValidationTableData(userId: number, dataSourceId: string, tableId: string, paginationOptions: paginationOptions, ruleIds: string[]): Promise<any[]>;
    getDataValidationTableTotalData(userId: number, dataSourceId: string, tableId: string, ruleIds: string[]): Promise<any[]>;
    updateTableData(userId: number, dataSourceId: string, tableId: string, updates: any[]): Promise<void[]>;
    getBookmarkedTableDataTotal(tenantId: number, dataSourceId: string, tableId: string): Promise<any[]>;
    getMigrationRecord(tenantId: number, dataSourceId: string, tableId: string, recordId: string): Promise<any>;
    getRuleStats({ migration, tableId, date, interval }: GetRuleStatParams): Promise<any>;
    getTableStats({ tableId, statType, startDate, interval, migration, }: GetTableStatsParams): Promise<any>;
    getRecordStatsScoreDiff({ tableId, statType, startDate1, startDate2, interval, migration, }: GetRecordStatsScoreDiffParams): Promise<any>;
}
