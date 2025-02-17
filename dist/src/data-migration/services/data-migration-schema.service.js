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
exports.DataMigrationSchemaService = void 0;
const common_1 = require("@nestjs/common");
const dataMigrationSchema_repository_1 = require("../repositories/dataMigrationSchema.repository");
let DataMigrationSchemaService = class DataMigrationSchemaService {
    constructor(dataMigrationSchemaRepository) {
        this.dataMigrationSchemaRepository = dataMigrationSchemaRepository;
    }
    getSchemaTables(tenantId, dataSourceId) {
        return this.dataMigrationSchemaRepository.getSchemaTables(tenantId, dataSourceId);
    }
    getSchemaDataTotalCount(tenantId, dataSourceId, tableId) {
        return this.dataMigrationSchemaRepository.getSchemaDataTotalCount(tenantId, dataSourceId, tableId);
    }
    getSchemaTableFields(tenantId, dataSourceId, tableId) {
        return this.dataMigrationSchemaRepository.getSchemaTableFields(tenantId, dataSourceId, tableId);
    }
    getSchemaTableField(tenantId, dataSourceId, tableId, fieldName) {
        return this.dataMigrationSchemaRepository.getSchemaTableField(tenantId, dataSourceId, tableId, fieldName);
    }
    getSchemaTableForeignReferences(tenantId, dataSourceId, tableId) {
        return this.dataMigrationSchemaRepository.getSchemaTableForeignReferencesFields(tenantId, dataSourceId, tableId);
    }
    getSchemaTableLookups(tenantId, dataSourceId, tableId) {
        return this.dataMigrationSchemaRepository.getSchemaTableLookups(tenantId, dataSourceId, tableId);
    }
    getMinAndMaxValue(tenantId, dataSourceId, tableId, fieldName) {
        return this.dataMigrationSchemaRepository.getMinAndMaxValue(tenantId, dataSourceId, tableId, fieldName);
    }
    getFieldValueOptions(tenantId, dataSourceId, tableId, fieldName) {
        return this.dataMigrationSchemaRepository.getFieldValueOptions(tenantId, dataSourceId, tableId, fieldName);
    }
    getTableData(tenantId, dataSourceId, tableId, action, paginationOptions, conditions = [], fields = [], orderBy = []) {
        const options = {
            skip: (paginationOptions && paginationOptions.skip) || 0,
            take: (paginationOptions && paginationOptions.take) || 20,
        };
        return this.dataMigrationSchemaRepository.getTableData(tenantId, dataSourceId, tableId, options, action, conditions, fields, orderBy);
    }
    getEmailsData(tenantId, dataSourceId, tasksIds) {
        return this.dataMigrationSchemaRepository.getEmailsData(tenantId, dataSourceId, tasksIds);
    }
    getTableDataGroupCounter(tenantId, dataSourceId, tableId, conditions = [], groupBy = []) {
        return this.dataMigrationSchemaRepository.getTableDataGroupCounter(tenantId, dataSourceId, tableId, conditions, groupBy);
    }
    getFuzzySearch(tenantId, dataSourceId, tableId, fuzzySearchQuery) {
        return this.dataMigrationSchemaRepository.getFuzzySearch(tenantId, dataSourceId, tableId, fuzzySearchQuery);
    }
    getDataValidationTableData(tenantId, dataSourceId, tableId, paginationOptions, ruleIds) {
        const options = {
            skip: (paginationOptions && paginationOptions.skip) || 0,
            take: (paginationOptions && paginationOptions.take) || 25,
        };
        return this.dataMigrationSchemaRepository.getDataValidationTableData(tenantId, dataSourceId, tableId, options, ruleIds);
    }
    getDataValidationTableTotalData(tenantId, dataSourceId, tableId, ruleIds) {
        return this.dataMigrationSchemaRepository.getDataValidationTableTotalData(tenantId, dataSourceId, tableId, ruleIds);
    }
    updateTableData(tenantId, dataSourceId, tableId, updates) {
        return this.dataMigrationSchemaRepository.updateTableData(tenantId, dataSourceId, tableId, updates);
    }
    getBookmarkedTableData(tenantId, dataSourceId, tableId) {
        return this.dataMigrationSchemaRepository.getBookmarkedTableDataTotal(tenantId, dataSourceId, tableId);
    }
    getMigrationRecord(tenantId, dataSourceId, tableId, recordId) {
        return this.dataMigrationSchemaRepository.getMigrationRecord(tenantId, dataSourceId, tableId, recordId);
    }
    getTableStats(params) {
        return this.dataMigrationSchemaRepository.getTableStats(params);
    }
    getRecordStatsScoreDiff(params) {
        return this.dataMigrationSchemaRepository.getRecordStatsScoreDiff(params);
    }
    getRuleStats(params) {
        return this.dataMigrationSchemaRepository.getRuleStats(params);
    }
};
DataMigrationSchemaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dataMigrationSchema_repository_1.DataMigrationSchemaRepository])
], DataMigrationSchemaService);
exports.DataMigrationSchemaService = DataMigrationSchemaService;
//# sourceMappingURL=data-migration-schema.service.js.map