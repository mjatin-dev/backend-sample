import { DataMigration } from '../entities/dataMigration.entity';
export declare enum TableStatType {
    SCORE = "score"
}
export declare enum IntervalType {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    QUARTER = "quarter",
    YEAR = "year"
}
export type GetTableStatsQueryParams = {
    statType: TableStatType;
    startDate: string;
    interval: IntervalType;
};
export type GetTableStatsParams = GetTableStatsQueryParams & {
    tableId: string;
    migration: DataMigration;
};
export type GetRecordStatsScoreDiffQueryParams = {
    statType: TableStatType;
    startDate1: string;
    startDate2: string;
    interval: IntervalType;
};
export type GetRecordStatsScoreDiffParams = GetRecordStatsScoreDiffQueryParams & {
    tableId: string;
    migration: DataMigration;
};
export type GetRuleStatParams = {
    tableId: string;
    interval: IntervalType;
    date: string;
    migration: DataMigration;
};
