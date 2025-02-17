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
exports.DataRaptorRecordController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
const http_1 = require("../../common/http");
const data_migration_service_1 = require("../../data-migration/services/data-migration.service");
const record_report_dto_1 = require("./dto/record-report.dto");
const update_record_duplicate_detection_1 = require("./dto/update-record-duplicate-detection");
const update_record_data_validation_1 = require("./dto/update-record-data-validation");
let DataRaptorRecordController = class DataRaptorRecordController {
    constructor(dataMigrationService) {
        this.dataMigrationService = dataMigrationService;
    }
    async getRecordReport(authedUser, migrationId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const dateMinus1Month = new Date();
        dateMinus1Month.setMonth(currentMonth - 1);
        const dateMinus2Months = new Date();
        dateMinus2Months.setMonth(currentMonth - 2);
        const recordReport = {
            confidenceScore: 45,
            rulesAppliedCount: 5,
            lastUpdated: new Date(),
            confidenceScoreHistorical: [
                {
                    score: 45,
                    timestamp: currentDate,
                },
                {
                    score: 45,
                    timestamp: dateMinus1Month,
                },
                {
                    score: 45,
                    timestamp: dateMinus2Months,
                },
            ],
            duplicatedDetection: {
                analysisId: 'a1c7f369-9d3e-43ea-b217-2e45f25a25ec',
                recommendation: 'These records should be merged',
                result: [
                    {
                        columns: ['name', 'email'],
                        id: '001Do00000GJZUIIA5',
                        state: record_report_dto_1.DuplicatedDetectionState.INITIAL,
                        mergeUrl: 'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000GJZUIIA5',
                    },
                    {
                        columns: ['name', 'email'],
                        id: '001Do00000G5AtLIAV',
                        state: record_report_dto_1.DuplicatedDetectionState.INITIAL,
                        mergeUrl: 'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000G5AtLIAV',
                    },
                ],
            },
            dataValidation: [
                {
                    columnName: 'email',
                    recommendation: {
                        textRecommendation: 'Email address is incorrect',
                        valueRecommendation: 'john.doe@apple.com',
                    },
                    state: record_report_dto_1.DataValidationState.INITIAL,
                },
                {
                    columnName: 'mobileNumber',
                    recommendation: {
                        textRecommendation: 'Mobile Number is empty',
                        valueRecommendation: '1234567890',
                    },
                    state: record_report_dto_1.DataValidationState.INITIAL,
                },
            ],
        };
        return new http_1.SuccessResponseObject('Rule record retrieved successfully', recordReport);
    }
    async updateDuplicateDetection(authedUser, body, migrationId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const newDuplicatedDetection = {
            analysisId: 'a1c7f369-9d3e-43ea-b217-2e45f25a25ec',
            recommendation: 'These records should be merged',
            result: [
                {
                    columns: ['name', 'email'],
                    id: '001Do00000GJZUIIA5',
                    state: record_report_dto_1.DuplicatedDetectionState.INITIAL,
                    mergeUrl: 'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000GJZUIIA5',
                },
                {
                    columns: ['name', 'email'],
                    id: '001Do00000G5AtLIAV',
                    state: record_report_dto_1.DuplicatedDetectionState.INITIAL,
                    mergeUrl: 'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000G5AtLIAV',
                },
            ],
        };
        return new http_1.SuccessResponseObject('Update Duplicated Detection successful', newDuplicatedDetection);
    }
    async updateDataValidation(authedUser, body, migrationId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const newDataValidation = [
            {
                columnName: 'email',
                recommendation: {
                    textRecommendation: 'Email address is incorrect',
                    valueRecommendation: 'john.doe@apple.com',
                },
                state: record_report_dto_1.DataValidationState.INITIAL,
            },
            {
                columnName: 'mobileNumber',
                recommendation: {
                    textRecommendation: 'Mobile Number is empty',
                    valueRecommendation: '1234567890',
                },
                state: record_report_dto_1.DataValidationState.IGNORE,
            },
        ];
        return new http_1.SuccessResponseObject('Update Data Validation successful', newDataValidation);
    }
};
__decorate([
    (0, common_1.Get)('/migration/:migrationId/table/:tableName/record/:recordId/report'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get record report with all data and AI recommendations',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Rule record retrieved successfully',
        type: record_report_dto_1.RecordReportDto,
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRecordController.prototype, "getRecordReport", null);
__decorate([
    (0, common_1.Put)('/migration/:migrationId/table/:tableName/record/:recordId/duplicateDetection'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update Duplicate detection analysis',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update Duplicated Detection successful',
        type: record_report_dto_1.DuplicatedDetectionDto,
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_record_duplicate_detection_1.UpdateDuplicatedDetectionDto, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRecordController.prototype, "updateDuplicateDetection", null);
__decorate([
    (0, common_1.Put)('/migration/:migrationId/table/:tableName/record/:recordId/dataValidation'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update Data Validation Recommendations',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Update Data Validation successful',
        type: [record_report_dto_1.DataValidationDto],
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_record_data_validation_1.UpdateDataValidationDto, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRecordController.prototype, "updateDataValidation", null);
DataRaptorRecordController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRecord'),
    (0, common_1.Controller)('dataRaptorRecord'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [data_migration_service_1.DataMigrationService])
], DataRaptorRecordController);
exports.DataRaptorRecordController = DataRaptorRecordController;
//# sourceMappingURL=data-raptor-record.controller.js.map