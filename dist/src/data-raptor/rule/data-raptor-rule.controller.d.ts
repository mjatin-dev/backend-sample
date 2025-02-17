import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { RuleService } from './rule.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';
import { RuleApplierActions } from '@/core/lib/aws/sqs/dto/rule-applier-sqs-message.dto';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { Rule } from './rule.entity';
import { AnomalyRuleAction } from '@/core/lib/aws/sqs/dto/anomaly-rule-applier-sqs-message.dto';
import { RuleTempTable } from '../rule-temp-table/rule-temp-table.entity';
import { RuleTempTableService } from '../rule-temp-table/rule-temp-table.service';
export declare class DataRaptorRuleController {
    private readonly ruleService;
    private readonly dataMigrationService;
    private readonly sqsMessageProducerService;
    private readonly dataMigrationSchemaService;
    private readonly ruleTempTableService;
    MAX_VIOLATION_SCORE: number;
    constructor(ruleService: RuleService, dataMigrationService: DataMigrationService, sqsMessageProducerService: SQSMessageProducerService, dataMigrationSchemaService: DataMigrationSchemaService, ruleTempTableService: RuleTempTableService);
    createDataMigration(authedUser: IAuthedUser, body: CreateRuleDto, migrationId: string): Promise<SuccessResponseObject>;
    getRulesByMigrationAndTableName(authedUser: IAuthedUser, migrationId: string, tableName: string): Promise<SuccessResponseObject>;
    getRulesByMigration(authedUser: IAuthedUser, migrationId: string): Promise<SuccessResponseObject>;
    getRulesByMigrationAndRuleId(authedUser: IAuthedUser, migrationId: string, ruleId: string): Promise<SuccessResponseObject>;
    getRulesByIds(authedUser: IAuthedUser, migrationId: string, ruleIds: string[], fields: string[]): Promise<SuccessResponseObject>;
    deleteRule(authedUser: IAuthedUser, ruleId: string): Promise<SuccessResponseObject>;
    updateRule(authedUser: IAuthedUser, body: UpdateRuleDto, ruleId: string): Promise<SuccessResponseObject>;
    getDataValidationViolatedMigrationTableRecords(authedUser: IAuthedUser, migrationId: string, tableId: string, skip: number, take: number): Promise<SuccessResponseObject>;
    getDataValidationViolatedMigrationTableTotalRecords(authedUser: IAuthedUser, migrationId: string, tableId: string): Promise<SuccessResponseObject>;
    _validateViolationScoreLimit(migrationId: string, table: string, violationScoreToAdd: number, idToIgnore?: string): Promise<void>;
    _processAnomalyDetectionRule(authedUser: IAuthedUser, migration: DataMigration, body: CreateRuleDto | UpdateRuleDto, action: AnomalyRuleAction, previousRule?: Rule): Promise<Rule>;
    _processDataValidationRule(authedUser: IAuthedUser, migration: DataMigration, body: Partial<Rule>, action: RuleApplierActions, previousRule?: Rule): Promise<Rule>;
    createSubQueriesFromRule(authedUser: IAuthedUser, migration: DataMigration, body: Partial<Rule>): Promise<{
        subQueriesCreated: RuleTempTable[];
        subQueryTempIdMapping: Record<string, string>;
    }>;
}
