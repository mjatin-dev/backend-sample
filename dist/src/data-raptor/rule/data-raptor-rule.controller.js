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
exports.DataRaptorRuleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const create_rule_dto_1 = require("./dto/create-rule.dto");
const update_rule_dto_1 = require("./dto/update-rule.dto");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
const http_1 = require("../../common/http");
const rule_service_1 = require("./rule.service");
const data_migration_service_1 = require("../../data-migration/services/data-migration.service");
const data_migration_schema_service_1 = require("../../data-migration/services/data-migration-schema.service");
const sqs_message_producer_service_1 = require("../../core/lib/aws/sqs/sqs-message-producer.service");
const rule_applier_sqs_message_dto_1 = require("../../core/lib/aws/sqs/dto/rule-applier-sqs-message.dto");
const RuleFormatter_1 = require("../util/RuleFormatter");
const RuleTransformer_1 = require("../util/RuleTransformer");
const uuid_1 = require("uuid");
const types_1 = require("../../core/types");
const types_2 = require("../types");
const anomaly_rule_applier_sqs_message_dto_1 = require("../../core/lib/aws/sqs/dto/anomaly-rule-applier-sqs-message.dto");
const typeorm_1 = require("typeorm");
const rule_temp_table_controller_1 = require("../rule-temp-table/rule-temp-table.controller");
const rule_temp_table_service_1 = require("../rule-temp-table/rule-temp-table.service");
let DataRaptorRuleController = class DataRaptorRuleController {
    constructor(ruleService, dataMigrationService, sqsMessageProducerService, dataMigrationSchemaService, ruleTempTableService) {
        this.ruleService = ruleService;
        this.dataMigrationService = dataMigrationService;
        this.sqsMessageProducerService = sqsMessageProducerService;
        this.dataMigrationSchemaService = dataMigrationSchemaService;
        this.ruleTempTableService = ruleTempTableService;
        this.MAX_VIOLATION_SCORE = 100;
    }
    async createDataMigration(authedUser, body, migrationId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const rule = await this.ruleService.findOne({
            where: {
                dataMigrationId: migrationId,
                table: body.table,
                name: body.name,
            },
        });
        if (rule) {
            throw new common_1.BadRequestException('Rule name is already used on this table');
        }
        await this._validateViolationScoreLimit(migrationId, body.table, body.violationScore);
        let createdRule;
        if (body.type === types_2.RuleTypeEnum.DataValidation) {
            createdRule = await this._processDataValidationRule(authedUser, migration, body, rule_applier_sqs_message_dto_1.RuleApplierActions.APPLY);
        }
        else if (body.type === types_2.RuleTypeEnum.AnomalyDetection) {
            createdRule = await this._processAnomalyDetectionRule(authedUser, migration, body, anomaly_rule_applier_sqs_message_dto_1.AnomalyRuleAction.APPLY);
        }
        else {
            throw new common_1.BadRequestException('Rule type not found!');
        }
        return new http_1.SuccessResponseObject('Rule Created Successfully', createdRule);
    }
    async getRulesByMigrationAndTableName(authedUser, migrationId, tableName) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const rules = await this.ruleService.findMany({
            where: { dataMigrationId: migration.dataMigrationId, table: tableName },
        });
        return new http_1.SuccessResponseObject('Rules retrieved Successfully', rules);
    }
    async getRulesByMigration(authedUser, migrationId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const rules = await this.ruleService.findMany({
            where: { dataMigrationId: migration.dataMigrationId },
            relations: ['RiskObject', 'TypeObject', 'DepartmentObject'],
        });
        return new http_1.SuccessResponseObject('Rules retrieved Successfully', rules);
    }
    async getRulesByMigrationAndRuleId(authedUser, migrationId, ruleId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        const rule = await this.ruleService.findOne({
            where: { dataMigrationId: migration.dataMigrationId, ruleId: ruleId },
        });
        if (!rule) {
            throw new common_1.BadRequestException('Rule not found!');
        }
        return new http_1.SuccessResponseObject('Rule retrieved Successfully', rule);
    }
    async getRulesByIds(authedUser, migrationId, ruleIds, fields) {
        if (!ruleIds || ruleIds.length === 0) {
            throw new common_1.BadRequestException('Rules Ids not provided!');
        }
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        let select = fields;
        if (!select || select.length === 0 || select[0] === '*') {
            select = undefined;
        }
        const selectKeys = select;
        const rules = await this.ruleService.findMany({
            where: {
                dataMigrationId: migration.dataMigrationId,
                ruleId: (0, typeorm_1.In)(ruleIds),
            },
            select: selectKeys,
        });
        if (!rules) {
            throw new common_1.BadRequestException('Rules not found!');
        }
        return new http_1.SuccessResponseObject('Rules retrieved Successfully', rules);
    }
    async deleteRule(authedUser, ruleId) {
        const rule = await this.ruleService.findOne({
            where: { ruleId },
        });
        if (!rule) {
            throw new common_1.BadRequestException('Rule not found!');
        }
        const migration = await this.dataMigrationService.findOne({
            where: {
                dataMigrationId: rule.dataMigrationId,
                tenantId: authedUser.tenantId,
            },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Rule not found!');
        }
        if (rule.active === true) {
            if (rule.type === types_2.RuleTypeEnum.AnomalyDetection) {
                const sqsMessagePayload = {
                    tenantId: authedUser.tenantId,
                    migrationId: migration.dataMigrationId,
                    ruleAction: anomaly_rule_applier_sqs_message_dto_1.AnomalyRuleAction.REMOVE,
                    ruleId: rule.ruleId,
                    dataSourceId: migration.dataSourceId,
                    analysisMode: anomaly_rule_applier_sqs_message_dto_1.AnomalyAnalysisModeEnum.FROM_RULE,
                    table: rule.table,
                };
                await this.sqsMessageProducerService.sendAnomalyRuleApplierQueueMessage(sqsMessagePayload);
            }
            if (rule.type === types_2.RuleTypeEnum.DataValidation) {
                const sqsMessagePayload = {
                    userId: authedUser.userId,
                    tenantId: authedUser.tenantId,
                    migrationId: migration.dataMigrationId,
                    action: rule_applier_sqs_message_dto_1.RuleApplierActions.REMOVE,
                    ruleIds: [rule.ruleId],
                };
                await this.sqsMessageProducerService.sendRuleApplierQueueMessage(sqsMessagePayload);
            }
        }
        const newRuleName = `${(0, uuid_1.v4)().split('-')[0]}-${rule.name}`;
        await this.ruleService.update(ruleId, { name: newRuleName });
        await this.ruleService.deleteRule(ruleId);
        return new http_1.SuccessResponseObject('Rule deleted successfully');
    }
    async updateRule(authedUser, body, ruleId) {
        const rule = await this.ruleService.findOne({
            where: { ruleId },
        });
        if (!rule) {
            throw new common_1.BadRequestException('Rule not found!');
        }
        const migration = await this.dataMigrationService.findOne({
            where: {
                dataMigrationId: rule.dataMigrationId,
                tenantId: authedUser.tenantId,
            },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Rule not found!');
        }
        await this._validateViolationScoreLimit(migration.dataMigrationId, body.table, body.violationScore, rule.ruleId);
        let updatedRule;
        if (rule.type === types_2.RuleTypeEnum.DataValidation) {
            updatedRule = await this._processDataValidationRule(authedUser, migration, body, rule_applier_sqs_message_dto_1.RuleApplierActions.UPDATE, rule);
        }
        else if (rule.type === types_2.RuleTypeEnum.AnomalyDetection) {
            updatedRule = await this._processAnomalyDetectionRule(authedUser, migration, body, anomaly_rule_applier_sqs_message_dto_1.AnomalyRuleAction.RE_APPLY, rule);
        }
        else {
            throw new common_1.BadRequestException('Rule type not found!');
        }
        return new http_1.SuccessResponseObject('Rule Updated Successfully', updatedRule);
    }
    async getDataValidationViolatedMigrationTableRecords(authedUser, migrationId, tableId, skip, take) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new exceptions_1.NotFoundException(`Migration not found ${migrationId}`);
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
            take: take || 25,
        };
        const rules = await this.ruleService.findMany({
            where: { dataMigrationId: migration.dataMigrationId, table: tableId },
        });
        const ruleIds = rules.map((rule) => rule.ruleId);
        const data = await this.dataMigrationSchemaService.getDataValidationTableData(migration.tenantId, migration.dataSourceId, tableId, paginationOptions, ruleIds);
        return new http_1.SuccessResponseObject('Data Fetch successfully', data);
    }
    async getDataValidationViolatedMigrationTableTotalRecords(authedUser, migrationId, tableId) {
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
        });
        if (!migration) {
            throw new exceptions_1.NotFoundException(`Migration not found ${migrationId}`);
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
        const rules = await this.ruleService.findMany({
            where: { dataMigrationId: migration.dataMigrationId, table: tableId },
        });
        const ruleIds = rules.map((rule) => rule.ruleId);
        const data = await this.dataMigrationSchemaService.getDataValidationTableTotalData(migration.tenantId, migration.dataSourceId, tableId, ruleIds);
        return new http_1.SuccessResponseObject('Data Fetch successfully', data.length);
    }
    async _validateViolationScoreLimit(migrationId, table, violationScoreToAdd, idToIgnore = '') {
        const tableRules = await this.ruleService.findMany({
            where: {
                dataMigrationId: migrationId,
                table: table,
            },
        });
        const usedViolationScore = tableRules.reduce((prev, current) => {
            var _a;
            if (current.ruleId != idToIgnore) {
                return +prev + ((_a = +current.violationScore) !== null && _a !== void 0 ? _a : 0);
            }
            return +prev;
        }, 0);
        if (usedViolationScore + violationScoreToAdd > this.MAX_VIOLATION_SCORE) {
            const maxAcceptable = 100 - usedViolationScore;
            throw new common_1.BadRequestException(`The sum of the violations scores of all rules for this table cannot be greater than 100. Remaining max (${maxAcceptable})`);
        }
    }
    async _processAnomalyDetectionRule(authedUser, migration, body, action, previousRule) {
        let processedRule;
        if (action === anomaly_rule_applier_sqs_message_dto_1.AnomalyRuleAction.APPLY) {
            processedRule = await this.ruleService.createRule(body, migration.dataMigrationId);
        }
        else if (action === anomaly_rule_applier_sqs_message_dto_1.AnomalyRuleAction.RE_APPLY && previousRule) {
            body.previousFormattedRule =
                previousRule.formattedRule;
            processedRule = await this.ruleService.update(previousRule.ruleId, body);
        }
        if (processedRule) {
            const sqsMessagePayload = {
                tenantId: authedUser.tenantId,
                migrationId: migration.dataMigrationId,
                ruleAction: action,
                ruleId: processedRule.ruleId,
                dataSourceId: migration.dataSourceId,
                analysisMode: anomaly_rule_applier_sqs_message_dto_1.AnomalyAnalysisModeEnum.FROM_RULE,
                table: processedRule.table,
            };
            await this.sqsMessageProducerService.sendAnomalyRuleApplierQueueMessage(sqsMessagePayload);
        }
        return processedRule;
    }
    async _processDataValidationRule(authedUser, migration, body, action, previousRule) {
        console.log('processing Data validation rule');
        console.log(authedUser, migration, body, action, previousRule);
        if (body.rule) {
            let subQueryTempIdMapping = {};
            if (action === rule_applier_sqs_message_dto_1.RuleApplierActions.APPLY) {
                const { subQueriesCreated, subQueryTempIdMapping: mapping } = await this.createSubQueriesFromRule(authedUser, migration, body);
                subQueryTempIdMapping = mapping;
                body.tempTables = subQueriesCreated;
                const { ruleCopy } = RuleTransformer_1.RuleTransformer.transformSubQueriesReferences(body.frontEndObject, subQueryTempIdMapping);
                body.frontEndObject = ruleCopy;
            }
            const { ruleCopy, existingSubQueriesIds } = RuleTransformer_1.RuleTransformer.transformSubQueriesReferences(body.rule, subQueryTempIdMapping);
            body.rule = ruleCopy;
            const existingSubQueries = await this.ruleTempTableService.findMany({
                ruleTempTableId: (0, typeorm_1.In)(existingSubQueriesIds),
            });
            body.rule.subQueries = [];
            body.tempTables = [...(body.tempTables || []), ...existingSubQueries];
            body.tableDependencies = RuleFormatter_1.RuleFormatter.getTableDependencies(body.rule);
            body.tableDependencies = [
                ...body.tableDependencies,
                ...body.tempTables.map((t) => t.table),
            ];
            body.tableDependencies = Array.from(new Set(body.tableDependencies));
            const transformedRule = RuleTransformer_1.RuleTransformer.processRuleTransformations(body.rule);
            body.formattedRule = RuleFormatter_1.RuleFormatter.getFormattedRule(authedUser.tenantId, migration.dataSourceId, transformedRule);
        }
        let processedRule;
        if (action === rule_applier_sqs_message_dto_1.RuleApplierActions.APPLY) {
            processedRule = await this.ruleService.createRule(body, migration.dataMigrationId);
        }
        else if (action === rule_applier_sqs_message_dto_1.RuleApplierActions.UPDATE && previousRule) {
            body.previousFormattedRule =
                previousRule.formattedRule;
            processedRule = await this.ruleService.update(previousRule.ruleId, body);
        }
        if (processedRule) {
            const sqsMessagePayload = {
                userId: authedUser.userId,
                tenantId: authedUser.tenantId,
                migrationId: migration.dataMigrationId,
                action: action,
                ruleIds: [processedRule.ruleId],
            };
            await this.sqsMessageProducerService.sendRuleApplierQueueMessage(sqsMessagePayload);
        }
        return processedRule;
    }
    async createSubQueriesFromRule(authedUser, migration, body) {
        let subQueriesCreated = [];
        const subQueries = body.rule.subQueries || [];
        const subQueryTempIdMapping = {};
        const promises = subQueries.map(async (subQuery) => {
            const tempId = subQuery.tempId;
            const subQueryPayload = {
                name: subQuery.alias,
                definition: { where: subQuery.where, table: subQuery.table },
                table: subQuery.table,
            };
            const tableCreated = await this.ruleTempTableService.processTemporalTable(authedUser, migration, subQueryPayload, rule_temp_table_controller_1.TemporalTableActions.CREATE);
            subQueryTempIdMapping[tempId] = tableCreated.ruleTempTableId;
            return tableCreated;
        });
        subQueriesCreated = await Promise.all(promises);
        return { subQueriesCreated, subQueryTempIdMapping };
    }
};
__decorate([
    (0, common_1.Post)('/migration/:migrationId/rule'),
    (0, swagger_1.ApiOperation)({ summary: 'Creates a data raptor rule' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rule_dto_1.CreateRuleDto, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "createDataMigration", null);
__decorate([
    (0, common_1.Get)('/migration/:migrationId/table/:tableName'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get rules that are associated with a migration and a table name',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "getRulesByMigrationAndTableName", null);
__decorate([
    (0, common_1.Get)('/migration/:migrationId/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rules that are associated with a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "getRulesByMigration", null);
__decorate([
    (0, common_1.Get)('/migration/:migrationId/rule/:ruleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rules by migration Id and RuleId' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('ruleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "getRulesByMigrationAndRuleId", null);
__decorate([
    (0, common_1.Post)('/migration/:migrationId/rulesByIds'),
    (0, swagger_1.ApiOperation)({ summary: 'Get rules by migration Id and RuleId' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Body)('ruleIds')),
    __param(3, (0, common_1.Body)('fields')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array, Array]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "getRulesByIds", null);
__decorate([
    (0, common_1.Delete)('/rule/:ruleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletes a rule by its ID' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('ruleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "deleteRule", null);
__decorate([
    (0, common_1.Put)('/rule/:ruleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a rule by its ID' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('ruleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_rule_dto_1.UpdateRuleDto, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "updateRule", null);
__decorate([
    (0, common_1.Get)('/dataValidation/:migrationId/table/:tableId/dataValidationViolatedData'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get data from the migrated tables which violated data validation rules',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Query)('skip')),
    __param(4, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "getDataValidationViolatedMigrationTableRecords", null);
__decorate([
    (0, common_1.Get)('/dataValidation/:migrationId/table/:tableId/dataValidationViolatedTotalData'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get data from the migrated tables which violated data validation rules',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DataRaptorRuleController.prototype, "getDataValidationViolatedMigrationTableTotalRecords", null);
DataRaptorRuleController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRule'),
    (0, common_1.Controller)('dataRaptorRule'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [rule_service_1.RuleService,
        data_migration_service_1.DataMigrationService,
        sqs_message_producer_service_1.SQSMessageProducerService,
        data_migration_schema_service_1.DataMigrationSchemaService,
        rule_temp_table_service_1.RuleTempTableService])
], DataRaptorRuleController);
exports.DataRaptorRuleController = DataRaptorRuleController;
//# sourceMappingURL=data-raptor-rule.controller.js.map