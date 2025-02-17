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
exports.DataMigrationController = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const http_1 = require("../common/http");
const create_data_migration_dto_1 = require("./dto/create-data-migration.dto");
const data_migration_service_1 = require("./services/data-migration.service");
const data_migration_schema_service_1 = require("./services/data-migration-schema.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const sqs_message_producer_service_1 = require("../core/lib/aws/sqs/sqs-message-producer.service");
const data_source_service_1 = require("../data-source/data-source.service");
const types_1 = require("../core/types");
const types_2 = require("../user/types");
const post_migration_record_update_dto_1 = require("./dto/post-migration-record-update.dto");
const salesforce_schema_service_1 = require("../core/lib/salesforce/salesforce-schema.service");
const post_record_dto_1 = require("./dto/post-record.dto");
const get_table_stats_dto_1 = require("./dto/get-table-stats.dto");
let DataMigrationController = class DataMigrationController {
    constructor(salesforceSchemaService, dataMigrationService, dataMigrationSchemaService, sqsQueueMessageProducerService, dataSourceService) {
        this.salesforceSchemaService = salesforceSchemaService;
        this.dataMigrationService = dataMigrationService;
        this.dataMigrationSchemaService = dataMigrationSchemaService;
        this.sqsQueueMessageProducerService = sqsQueueMessageProducerService;
        this.dataSourceService = dataSourceService;
    }
    async createDataMigration(authedUser, body) {
        this.validateAuthorization(authedUser);
        const existingMigration = await this.dataMigrationService.findOne({
            where: { tenantId: authedUser.tenantId, dataSourceId: body.dataSourceId },
        });
        if (existingMigration) {
            throw new common_1.BadRequestException('Data migration already registered');
        }
        const dataSource = await this.dataSourceService.findOne({
            where: { dataSourceId: body.dataSourceId },
        });
        if (!dataSource) {
            throw new common_1.BadRequestException('Data Source id provided does not exists');
        }
        const integrationExists = await this.dataMigrationService.validateIntegrationExists(authedUser.userId, body.dataSourceId, authedUser.tenantId);
        if (!integrationExists) {
            throw new common_1.NotFoundException(`Missing integration with data source ${dataSource.name}`);
        }
        const dataMigrationCreated = await this.dataMigrationService.create(authedUser.tenantId, body.dataSourceId);
        const sqsMessage = {
            userId: authedUser.userId,
            tenantId: authedUser.tenantId,
            migrationId: dataMigrationCreated.dataMigrationId,
            dataSourceId: dataSource.dataSourceId,
        };
        await this.sqsQueueMessageProducerService.sendDataSetQueueMessage(sqsMessage);
        return new http_1.SuccessResponseObject('User data migration created successfully', dataMigrationCreated);
    }
    async getDataMigration(authedUser) {
        const dataMigrations = await this.dataMigrationService.findAllByTenant(authedUser.tenantId);
        return new http_1.SuccessResponseObject('User data migrations found successfully', dataMigrations);
    }
    async getMigrationByID(authedUser, migrationId) {
        const dataMigration = await this.dataMigrationService.findOne({
            where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
        });
        if (!dataMigration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        return new http_1.SuccessResponseObject('Data migration found successfully', dataMigration);
    }
    async getMigrationByDataSourceId(authedUser, dataSourceId) {
        const dataMigration = await this.dataMigrationService.getMigrationByDataSourceName(authedUser.userId, authedUser.tenantId, dataSourceId);
        if (!dataMigration) {
            throw new common_1.NotFoundException(`Migration not found by Data Source ${dataSourceId}`);
        }
        return new http_1.SuccessResponseObject('Data migration found successfully', dataMigration);
    }
    async deleteDataMigration(authedUser, id) {
        this.validateAuthorization(authedUser);
        const deletedDataMigration = await this.dataMigrationService.delete(id, authedUser.tenantId);
        return new http_1.SuccessResponseObject('User data migration deleted successfully', deletedDataMigration);
    }
    async getDataMigrationTables(authedUser, migrationId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const tables = await this.dataMigrationSchemaService.getSchemaTables(migration.tenantId, migration.dataSourceId);
        return new http_1.SuccessResponseObject('Data tables fetched successfully', tables);
    }
    async getDataMigrationDataTotalCount(authedUser, migrationId, tableId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const totalCount = await this.dataMigrationSchemaService.getSchemaDataTotalCount(migration.tenantId, migration.dataSourceId, tableId);
        return new http_1.SuccessResponseObject('Data total count fetched successfully', totalCount.length);
    }
    async getDataMigrationTableFields(authedUser, migrationId, tableId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const fields = await this.dataMigrationSchemaService.getSchemaTableFields(migration.tenantId, migration.dataSourceId, tableId);
        return new http_1.SuccessResponseObject('Data table fields fetched successfully', fields);
    }
    async getDataMigrationTableForeignReferences(authedUser, migrationId, tableId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const fields = await this.dataMigrationSchemaService.getSchemaTableForeignReferences(migration.tenantId, migration.dataSourceId, tableId);
        return new http_1.SuccessResponseObject('Data table foreign references fetched successfully', fields);
    }
    async getDataMigrationTableLookups(authedUser, migrationId, tableId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const fields = await this.dataMigrationSchemaService.getSchemaTableLookups(migration.tenantId, migration.dataSourceId, tableId);
        return new http_1.SuccessResponseObject('Data table lookups fetched successfully', fields);
    }
    async getDataMigrationTableRecords(authedUser, migrationId, tableId, skip, take, action = 'retrieve', body) {
        const { conditions = [], fields = [], orderBy = [] } = body;
        console.log('conditions', conditions);
        console.log('fields', fields);
        console.log('orderBy', orderBy);
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        if (migration.status === types_1.DataMigrationStatus.DATA_MIGRATION_FAILED ||
            migration.status === types_1.DataMigrationStatus.DATA_SCHEMA_FAILED) {
            return new http_1.SuccessResponseObject('The Migration has a failed status', {
                migrationStatus: migration.status,
                data: [],
            });
        }
        if (migration.status !== types_1.DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
            return new http_1.SuccessResponseObject('Migration is still being processed', {
                migrationStatus: migration.status,
                data: [],
            });
        }
        const paginationOptions = {
            skip: skip || 0,
            take: take || 20,
        };
        const data = await this.dataMigrationSchemaService.getTableData(migration.tenantId, migration.dataSourceId, tableId, action, paginationOptions, conditions, fields, orderBy);
        return new http_1.SuccessResponseObject('Data Fetch successfully', data);
    }
    async getEmailsDataFromTaskId(authedUser, migrationId, body) {
        const { tasksIds = [] } = body;
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        if (migration.status === types_1.DataMigrationStatus.DATA_MIGRATION_FAILED ||
            migration.status === types_1.DataMigrationStatus.DATA_SCHEMA_FAILED) {
            return new http_1.SuccessResponseObject('The Migration has a failed status', {
                migrationStatus: migration.status,
                data: [],
            });
        }
        if (migration.status !== types_1.DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
            return new http_1.SuccessResponseObject('Migration is still being processed', {
                migrationStatus: migration.status,
                data: [],
            });
        }
        const data = await this.dataMigrationSchemaService.getEmailsData(migration.tenantId, migration.dataSourceId, tasksIds);
        return new http_1.SuccessResponseObject('Data Fetch successfully', data);
    }
    async getDataMigrationTableRecordsCount(authedUser, migrationId, tableId, conditions, groupBy) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        if (migration.status === types_1.DataMigrationStatus.DATA_MIGRATION_FAILED ||
            migration.status === types_1.DataMigrationStatus.DATA_SCHEMA_FAILED) {
            return new http_1.SuccessResponseObject('The Migration has a failed status', {
                migrationStatus: migration.status,
                data: [],
            });
        }
        if (migration.status !== types_1.DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
            return new http_1.SuccessResponseObject('Migration is still being processed', {
                migrationStatus: migration.status,
                data: [],
            });
        }
        const data = await this.dataMigrationSchemaService.getTableDataGroupCounter(migration.tenantId, migration.dataSourceId, tableId, conditions, groupBy);
        return new http_1.SuccessResponseObject('Data Fetch successfully', data);
    }
    validateAuthorization(authedUser) {
        if (authedUser.userType === types_2.UserType.USER) {
            throw new common_1.UnauthorizedException('You are not authorized to modify migrations');
        }
    }
    async postMigrationDataFuzzySearch(authedUser, migrationId, tableId, field, value, limit, skip, minPercentage, fallBackSearchField) {
        const migration = await this.dataMigrationService.findOne({
            where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
        });
        if (!migration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        if (!field || !value) {
            throw new common_1.BadRequestException('Field and Value query params are required');
        }
        const payload = Object.assign(Object.assign(Object.assign(Object.assign({ condition: { fieldName: field, value } }, (limit && { limit: +limit })), (skip && { skip: +skip })), (minPercentage && { minPercentage: +minPercentage })), (fallBackSearchField &&
            fallBackSearchField.length > 0 && {
            fallBackSearchField,
        }));
        const data = await this.dataMigrationSchemaService.getFuzzySearch(migration.tenantId, migration.dataSourceId, tableId, payload);
        return new http_1.SuccessResponseObject('Search retrieved successfully', data);
    }
    async postMigrationReportUpdate(authedUser, migrationId, body) {
        console.log('recordUpdate:::', JSON.stringify(body, null, 2));
        const dataMigration = await this.dataMigrationService.findOne({
            where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
        });
        if (!dataMigration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        const sqsMessageBody = {
            userId: authedUser.userId,
            migrationId: migrationId,
            tenantId: authedUser.tenantId,
            updates: body.updates,
            dataSourceId: dataMigration.dataSourceId,
        };
        await this.sqsQueueMessageProducerService.sendDataSynchronizerQueueMessage(sqsMessageBody);
        return new http_1.SuccessResponseObject('Update Received', body.updates);
    }
    async postTableRecordUpdate(authedUser, migrationId, tableId, body) {
        const migration = await this.dataMigrationService.findOne({
            where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
        });
        if (!migration) {
            throw new common_1.NotFoundException(`Migration not found ${migrationId}`);
        }
        try {
            await this.dataMigrationSchemaService.updateTableData(migration.tenantId, migration.dataSourceId, tableId, body.updates);
            return new http_1.SuccessResponseObject('Update Received', body.updates);
        }
        catch (_a) {
            throw new common_1.BadRequestException('Update failed');
        }
    }
    async getBookmarkedDataOnMigrationDataTotal(authedUser, migrationId, tableId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const totalCount = await this.dataMigrationSchemaService.getBookmarkedTableData(migration.tenantId, migration.dataSourceId, tableId);
        return new http_1.SuccessResponseObject('Bookmarked data total count fetched successfully', totalCount);
    }
    async getMinAndMaxValue(authedUser, migrationId, tableId, fieldName) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        const res = await this.dataMigrationSchemaService.getMinAndMaxValue(migration.tenantId, migration.dataSourceId, tableId, fieldName);
        return new http_1.SuccessResponseObject('Min and Max value fetched successfully', res);
    }
    async getFieldValueOptions(authedUser, migrationId, tableId, fieldName) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            relations: ['dataSource'],
        });
        const field = await this.dataMigrationSchemaService.getSchemaTableField(migration.tenantId, migration.dataSourceId, tableId, fieldName);
        let values;
        if (field.type === 'picklist' &&
            migration.dataSource.name === types_1.DataSourceNames.SALESFORCE) {
            try {
                console.log('Trying to get values from Salesforce');
                values = await this.salesforceSchemaService.getFieldPickListValues(authedUser, tableId, fieldName);
            }
            catch (e) {
                console.log(`Error trying to get Pick list values from salesforce: ${e}`);
            }
        }
        if (!values) {
            const res = await this.dataMigrationSchemaService.getFieldValueOptions(migration.tenantId, migration.dataSourceId, tableId, fieldName);
            values = res.map((item) => item.option);
        }
        return new http_1.SuccessResponseObject('value options fetched successfully', values || []);
    }
    async createRecord(authedUser, migrationId, tableId, body) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            relations: ['dataSource'],
        });
        let newRecord;
        console.log('migration.dataSource.name', JSON.stringify(migration.dataSource));
        console.log('body', JSON.stringify(body));
        if (migration.dataSource.name == types_1.DataSourceNames.SALESFORCE) {
            console.log('entered salesforce if handle create record');
            newRecord = await this.salesforceSchemaService.createRecord(authedUser, tableId, body.record);
        }
        return new http_1.SuccessResponseObject('New Record created successfully', newRecord);
    }
    async getTableStats(authedUser, migrationId, tableId, statType, startDate, interval) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            relations: ['dataSource'],
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        if (!statType || !Object.values(get_table_stats_dto_1.TableStatType).includes(statType)) {
            throw new common_1.BadRequestException('Invalid stat type');
        }
        if (!interval || !Object.values(get_table_stats_dto_1.IntervalType).includes(interval)) {
            throw new common_1.BadRequestException('Invalid interval type');
        }
        const params = {
            tableId,
            migration,
            statType,
            startDate,
            interval,
        };
        const stats = await this.dataMigrationSchemaService.getTableStats(params);
        return new http_1.SuccessResponseObject('Data retrieved successfully', stats);
    }
    async getTableRuleStats(authedUser, migrationId, tableId, date, interval) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            relations: ['dataSource'],
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        if (!interval || !Object.values(get_table_stats_dto_1.IntervalType).includes(interval)) {
            throw new common_1.BadRequestException('Invalid interval type');
        }
        const params = {
            tableId,
            migration,
            date,
            interval,
        };
        const stats = await this.dataMigrationSchemaService.getRuleStats(params);
        return new http_1.SuccessResponseObject('Data retrieved successfully', stats);
    }
    async getTableRecordStats(authedUser, migrationId, tableId, statType, startDate1, startDate2, interval) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
            relations: ['dataSource'],
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        if (!statType || !Object.values(get_table_stats_dto_1.TableStatType).includes(statType)) {
            throw new common_1.BadRequestException('Invalid stat type');
        }
        if (!interval || !Object.values(get_table_stats_dto_1.IntervalType).includes(interval)) {
            throw new common_1.BadRequestException('Invalid interval type');
        }
        const params = {
            tableId,
            migration,
            statType,
            startDate1,
            startDate2,
            interval,
        };
        const stats = await this.dataMigrationSchemaService.getRecordStatsScoreDiff(params);
        return new http_1.SuccessResponseObject('Data retrieved successfully', stats);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new data migration connection to a user' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_data_migration_dto_1.CreateDataMigrationDto]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "createDataMigration", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all data migrations from a User' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigration", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get migration by ID' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getMigrationByID", null);
__decorate([
    (0, common_1.Get)('/dataSource/:dataSourceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get migration by Data source Id' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('dataSourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getMigrationByDataSourceId", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletes a user data migration record by Id' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "deleteDataMigration", null);
__decorate([
    (0, common_1.Get)('/:id/tables'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available tables from the migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationTables", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/totalCounts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total counts of data from table Id' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationDataTotalCount", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/fields'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fields of table from table Id' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationTableFields", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/foreignReferences'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Foreign references to the table' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationTableForeignReferences", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/lookups'),
    (0, swagger_1.ApiOperation)({ summary: 'Get look ups reference of table from table Id' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationTableLookups", null);
__decorate([
    (0, common_1.Post)('/:id/table/:tableId/data'),
    (0, swagger_1.ApiOperation)({ summary: 'Get data from the migrated tables' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Query)('skip')),
    __param(4, (0, common_1.Query)('take')),
    __param(5, (0, common_1.Query)('action')),
    __param(6, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationTableRecords", null);
__decorate([
    (0, common_1.Post)('/:id/emails'),
    (0, swagger_1.ApiOperation)({ summary: 'Get emails data from the tasks ids' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getEmailsDataFromTaskId", null);
__decorate([
    (0, common_1.Post)('/:id/table/:tableId/groupCount'),
    (0, swagger_1.ApiOperation)({ summary: 'Get data from the migrated tables' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Body)('conditions')),
    __param(4, (0, common_1.Body)('groupBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Array, Array]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getDataMigrationTableRecordsCount", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/data/fuzzy-search'),
    (0, swagger_1.ApiOperation)({ summary: 'Migration Data Fuzzy search' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Query)('field')),
    __param(4, (0, common_1.Query)('value')),
    __param(5, (0, common_1.Query)('limit')),
    __param(6, (0, common_1.Query)('skip')),
    __param(7, (0, common_1.Query)('minPercentage')),
    __param(8, (0, common_1.Query)('fallBackSearchField')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "postMigrationDataFuzzySearch", null);
__decorate([
    (0, common_1.Post)('/:id/recordUpdate'),
    (0, swagger_1.ApiOperation)({ summary: 'Post migration record update' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, post_migration_record_update_dto_1.PostMigrationRecordUpdateDto]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "postMigrationReportUpdate", null);
__decorate([
    (0, common_1.Post)('/:id/table/:tableId/recordUpdate'),
    (0, swagger_1.ApiOperation)({ summary: 'Post migration record update' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, post_migration_record_update_dto_1.PostTableRecordUpdateDto]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "postTableRecordUpdate", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/bookmarkedTotal'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total counts of data from table Id' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getBookmarkedDataOnMigrationDataTotal", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/field/:fieldName/minAndMaxValue'),
    (0, swagger_1.ApiOperation)({ summary: 'Get min and max value of a field' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Param)('fieldName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getMinAndMaxValue", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/field/:fieldName/value-options'),
    (0, swagger_1.ApiOperation)({ summary: 'Get value options of a field' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Param)('fieldName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getFieldValueOptions", null);
__decorate([
    (0, common_1.Post)('/:id/table/:tableId/create-record'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a record using the integration related to the migration',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, post_record_dto_1.PostRecordDto]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get stats of a table from the migration',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Query)('type')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('interval')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getTableStats", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/rule-stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get stats of a Table Rules from the migration',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Query)('date')),
    __param(4, (0, common_1.Query)('interval')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getTableRuleStats", null);
__decorate([
    (0, common_1.Get)('/:id/table/:tableId/record-stats/score-diff'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get stats score diff calculation from record stats',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Query)('type')),
    __param(4, (0, common_1.Query)('startDate1')),
    __param(5, (0, common_1.Query)('startDate2')),
    __param(6, (0, common_1.Query)('interval')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], DataMigrationController.prototype, "getTableRecordStats", null);
DataMigrationController = __decorate([
    (0, swagger_1.ApiTags)('DataMigration'),
    (0, common_1.Controller)('dataMigration'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [salesforce_schema_service_1.SalesforceSchemaService,
        data_migration_service_1.DataMigrationService,
        data_migration_schema_service_1.DataMigrationSchemaService,
        sqs_message_producer_service_1.SQSMessageProducerService,
        data_source_service_1.DataSourceService])
], DataMigrationController);
exports.DataMigrationController = DataMigrationController;
//# sourceMappingURL=data-migration.controller.js.map