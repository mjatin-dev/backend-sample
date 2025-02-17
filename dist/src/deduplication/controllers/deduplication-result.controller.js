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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeduplicationResultController = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const data_migration_service_1 = require("../../data-migration/services/data-migration.service");
const deduplication_result_response_dto_1 = require("../dto/deduplication-result.response.dto");
const deduplication_result_service_1 = require("../services/deduplication-result.service");
const http_1 = require("../../common/http");
const update_deduplication_result_status_dto_1 = require("../dto/update-deduplication-result-status.dto");
const salesforce_merge_service_1 = require("../../core/lib/salesforce/salesforce-merge.service");
const types_1 = require("../../core/types");
let DeduplicationResultController = class DeduplicationResultController {
    constructor(deduplicationResultService, dataMigrationService, salesforceMergeService) {
        this.deduplicationResultService = deduplicationResultService;
        this.dataMigrationService = dataMigrationService;
        this.salesforceMergeService = salesforceMergeService;
    }
    async getDeduplicationResult(authedUser, migrationId, tables, limit = '100') {
        const migration = await this.checkMigrationReference(migrationId, authedUser.tenantId);
        let tableToQuery = tables;
        if (typeof tables === 'string') {
            tableToQuery = tables.split(',');
            tableToQuery = tableToQuery.map((table) => table.trim());
        }
        const limitNumber = isNaN(+limit) ? 100 : +limit;
        const deduplicationResults = await this.deduplicationResultService.getDeduplicationResultData(authedUser.tenantId, migration.dataSourceId, { limit: limitNumber, tables: tableToQuery });
        return new http_1.SuccessResponseObject('Data table lookups fetched successfully', deduplicationResults);
    }
    async getDeduplicationResultByIds(authedUser, migrationId, body) {
        const migration = await this.checkMigrationReference(migrationId, authedUser.tenantId);
        const deduplicationResults = await this.deduplicationResultService.getDeduplicationResultDataByIds(authedUser.tenantId, migration.dataSourceId, body.ids);
        return new http_1.SuccessResponseObject('Data table lookups fetched successfully', deduplicationResults);
    }
    async updateDeduplicationResultStatus(authedUser, migrationId, body) {
        const migration = await this.checkMigrationReference(migrationId, authedUser.tenantId);
        const res = await this.deduplicationResultService.updateDeduplicationResultStatus(authedUser.tenantId, migration.dataSourceId, body.status, body.resultIds);
        return new http_1.SuccessResponseObject('Deduplication result status updated successfully', { affected: res.affected });
    }
    async mergeRecords(authedUser, migrationId, body) {
        const migration = await this.checkMigrationReference(migrationId, authedUser.tenantId, { relationships: ['dataSource'] });
        const dataSource = migration.dataSource;
        if (dataSource.name !== types_1.DataSourceNames.SALESFORCE) {
            throw new common_1.BadRequestException('Data source not supported');
        }
        console.log('Merge Request body::', body);
        await this.salesforceMergeService.mergeRecords(authedUser, body.masterRecordId, body.duplicateRecordIds, body.overWriteValues, body.objectType);
        return new http_1.SuccessResponseObject('Duplicate merge completed Successfully');
    }
    async checkMigrationReference(migrationId, tenantId, options) {
        try {
            const relationships = (options === null || options === void 0 ? void 0 : options.relationships) || undefined;
            const migration = await this.dataMigrationService.findOne({
                where: {
                    dataMigrationId: migrationId,
                    tenantId: tenantId,
                },
                relations: relationships,
            });
            if (!migration) {
                throw new common_1.BadRequestException('You do not have permissions to that migration');
            }
            return migration;
        }
        catch (err) {
            throw new common_1.BadRequestException('You do not have permissions to that migration');
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Deduplication Result' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deduplication Result successfully!',
        type: deduplication_result_response_dto_1.DeduplicationResultDto,
    }),
    (0, common_1.Get)('migration/:migrationId/result'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Query)('tables')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], DeduplicationResultController.prototype, "getDeduplicationResult", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Deduplication Result filtered by Id' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deduplication Result successfully!',
        type: deduplication_result_response_dto_1.DeduplicationResultDto,
    }),
    (0, common_1.Post)('migration/:migrationId/resultByIds'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, deduplication_result_response_dto_1.DeduplicationResultByIdsRequestDto]),
    __metadata("design:returntype", Promise)
], DeduplicationResultController.prototype, "getDeduplicationResultByIds", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update deduplication result status' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deduplication result status updated successfully',
    }),
    (0, common_1.Put)('migration/:migrationId/updateStatus'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_deduplication_result_status_dto_1.UpdateDeduplicationResultStatusRequest]),
    __metadata("design:returntype", Promise)
], DeduplicationResultController.prototype, "updateDeduplicationResultStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Merge duplicate Records' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Duplicate merge completed Successfully',
    }),
    (0, common_1.Put)('migration/:migrationId/mergeRecords'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_deduplication_result_status_dto_1.MergeDuplicatedRecordsRequest]),
    __metadata("design:returntype", Promise)
], DeduplicationResultController.prototype, "mergeRecords", null);
DeduplicationResultController = __decorate([
    (0, swagger_1.ApiTags)('DeduplicationResult'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('deduplication-result'),
    __metadata("design:paramtypes", [deduplication_result_service_1.DeduplicationResultService,
        data_migration_service_1.DataMigrationService,
        salesforce_merge_service_1.SalesforceMergeService])
], DeduplicationResultController);
exports.DeduplicationResultController = DeduplicationResultController;
//# sourceMappingURL=deduplication-result.controller.js.map