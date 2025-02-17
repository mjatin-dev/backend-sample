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
exports.RuleTempTableService = void 0;
const common_1 = require("@nestjs/common");
const rule_temp_table_repository_1 = require("./rule-temp-table.repository");
const typeorm_1 = require("typeorm");
const rule_temp_table_controller_1 = require("./rule-temp-table.controller");
const RuleTransformer_1 = require("../util/RuleTransformer");
const RuleFormatter_1 = require("../util/RuleFormatter");
const JsonToSql_1 = require("../util/JsonToSql");
const rule_applier_sqs_message_dto_1 = require("../../core/lib/aws/sqs/dto/rule-applier-sqs-message.dto");
const sqs_message_producer_service_1 = require("../../core/lib/aws/sqs/sqs-message-producer.service");
let RuleTempTableService = class RuleTempTableService {
    constructor(ruleTempTableRepository, sqsMessageProducerService) {
        this.ruleTempTableRepository = ruleTempTableRepository;
        this.sqsMessageProducerService = sqsMessageProducerService;
    }
    async getDependenciesAssociated(migrationId, tableId) {
        return this.ruleTempTableRepository.getDependenciesAssociated(migrationId, tableId);
    }
    async executeTempTableSample(sqlQuery) {
        const connection = (0, typeorm_1.getConnection)();
        const queryRunner = connection.createQueryRunner();
        queryRunner.startTransaction();
        let records = [];
        try {
            records = await queryRunner.query(sqlQuery);
        }
        catch (err) {
            console.error('Error executing temp table query sample', err);
        }
        finally {
            try {
                await queryRunner.rollbackTransaction();
            }
            catch (err) {
                console.error('Error rolling back transaction', err);
            }
            try {
                await queryRunner.release();
            }
            catch (err) {
                console.error('Error releasing query runner', err);
            }
        }
        return records;
    }
    async findMany(conditions) {
        return this.ruleTempTableRepository.find({ where: conditions });
    }
    async create(data, migrationId) {
        const entity = this.ruleTempTableRepository.create(Object.assign(Object.assign({}, data), { dataMigrationId: migrationId }));
        console.log('entity', entity);
        return this.ruleTempTableRepository.save(entity);
    }
    async findAll(migrationId) {
        return this.ruleTempTableRepository.find({
            where: { dataMigrationId: migrationId },
        });
    }
    async findOne(id, migrationId) {
        console.log({ id, migrationId });
        return this.ruleTempTableRepository.findOne(id, {
            where: { dataMigrationId: migrationId },
        });
    }
    async findOneByConditions(conditions) {
        return this.ruleTempTableRepository.findOne({ where: conditions });
    }
    async update(id, data, migrationId) {
        return this.ruleTempTableRepository.update(id, Object.assign(Object.assign({}, data), { dataMigrationId: migrationId }));
    }
    async delete(id) {
        return this.ruleTempTableRepository.delete(id);
    }
    async processTemporalTable(authedUser, migration, body, action, temporalTableId) {
        const temporalTable = body;
        temporalTable.definition.table = body.table;
        if (temporalTable.definition) {
            const transformedRule = RuleTransformer_1.RuleTransformer.processRuleTransformations(body.definition);
            temporalTable.formattedDefinition = RuleFormatter_1.RuleFormatter.getFormattedRule(authedUser.tenantId, migration.dataSourceId, transformedRule);
            temporalTable.formattedTableName =
                RuleFormatter_1.RuleFormatter.getFormattedTemporalTableName(body.name);
            const json = temporalTable.formattedDefinition;
            json.fields = ['"Id"'];
            json.limit = 5;
            const sqlQuery = new JsonToSql_1.JsonToSql(json).build();
            const records = await this.executeTempTableSample(sqlQuery);
            temporalTable.sampleIds = records.map((record) => record.Id);
        }
        let processedTemporalTable;
        if (action === rule_temp_table_controller_1.TemporalTableActions.CREATE) {
            processedTemporalTable = await this.create(temporalTable, migration.dataMigrationId);
        }
        else if (action === rule_temp_table_controller_1.TemporalTableActions.UPDATE && temporalTableId) {
            processedTemporalTable = await this.update(temporalTableId, temporalTable, migration.dataMigrationId);
            const dependencies = await this.getDependenciesAssociated(migration.dataMigrationId, temporalTableId);
            const ruleIds = dependencies.map((dep) => dep.ruleId);
            if (processedTemporalTable && ruleIds.length > 0) {
                const sqsMessagePayload = {
                    userId: authedUser.userId,
                    tenantId: authedUser.tenantId,
                    migrationId: migration.dataMigrationId,
                    action: rule_applier_sqs_message_dto_1.RuleApplierActions.RE_APPLY,
                    ruleIds: ruleIds,
                };
                await this.sqsMessageProducerService.sendRuleApplierQueueMessage(sqsMessagePayload);
            }
        }
        return processedTemporalTable;
    }
};
RuleTempTableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rule_temp_table_repository_1.RuleTempTableRepository,
        sqs_message_producer_service_1.SQSMessageProducerService])
], RuleTempTableService);
exports.RuleTempTableService = RuleTempTableService;
//# sourceMappingURL=rule-temp-table.service.js.map