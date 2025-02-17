import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { IAuthedUser } from '@/auth/types';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { SuccessResponseObject } from '@/common/http';
import { RuleService } from './rule.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';
import {
  RuleApplierActions,
  RuleApplierSqsMessageDto,
} from '@/core/lib/aws/sqs/dto/rule-applier-sqs-message.dto';
import { RuleFormatter } from '../util/RuleFormatter';
import { RuleTransformer } from '../util/RuleTransformer';
import { v4 as uuid } from 'uuid';
import { DataMigrationStatus } from '@/core/types';
import { paginationOptions } from '@/data-migration/types';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { Rule } from './rule.entity';
import { RuleTypeEnum } from '../types';
import { RuleDto } from './dto/rule.dto';
import {
  AnomalyAnalysisModeEnum,
  AnomalyRuleAction,
  AnomalyRuleApplierSQSMessageDto,
} from '@/core/lib/aws/sqs/dto/anomaly-rule-applier-sqs-message.dto';
import { In } from 'typeorm';
import { SubQuery } from './dto/front-end-rule.dto';
import { TemporalTableActions } from '../rule-temp-table/rule-temp-table.controller';
import { CreateRuleTempTable } from '../rule-temp-table/rule-temp-table.dto';
import { RuleTempTable } from '../rule-temp-table/rule-temp-table.entity';
import { RuleTempTableService } from '../rule-temp-table/rule-temp-table.service';

@ApiTags('DataRaptorRule')
@Controller('dataRaptorRule')
@UseGuards(AuthGuard('jwt'))
export class DataRaptorRuleController {
  MAX_VIOLATION_SCORE: number;
  constructor(
    private readonly ruleService: RuleService,
    private readonly dataMigrationService: DataMigrationService,
    private readonly sqsMessageProducerService: SQSMessageProducerService,
    private readonly dataMigrationSchemaService: DataMigrationSchemaService,
    private readonly ruleTempTableService: RuleTempTableService,
  ) {
    this.MAX_VIOLATION_SCORE = 100;
  }

  @Post('/migration/:migrationId/rule')
  @ApiOperation({ summary: 'Creates a data raptor rule' })
  async createDataMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateRuleDto,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rule = await this.ruleService.findOne({
      where: {
        dataMigrationId: migrationId,
        table: body.table,
        name: body.name,
      },
    });

    if (rule) {
      throw new BadRequestException('Rule name is already used on this table');
    }

    await this._validateViolationScoreLimit(
      migrationId,
      body.table,
      body.violationScore,
    );

    let createdRule: Rule;
    if (body.type === RuleTypeEnum.DataValidation) {
      createdRule = await this._processDataValidationRule(
        authedUser,
        migration,
        body,
        RuleApplierActions.APPLY,
      );
    } else if (body.type === RuleTypeEnum.AnomalyDetection) {
      createdRule = await this._processAnomalyDetectionRule(
        authedUser,
        migration,
        body,
        AnomalyRuleAction.APPLY,
      );
    } else {
      throw new BadRequestException('Rule type not found!');
    }

    return new SuccessResponseObject('Rule Created Successfully', createdRule);
  }

  @Get('/migration/:migrationId/table/:tableName')
  @ApiOperation({
    summary: 'Get rules that are associated with a migration and a table name',
  })
  async getRulesByMigrationAndTableName(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableName') tableName: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId, table: tableName },
    });

    return new SuccessResponseObject('Rules retrieved Successfully', rules);
  }

  @Get('/migration/:migrationId/')
  @ApiOperation({ summary: 'Get rules that are associated with a migration' })
  async getRulesByMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId },
      relations: ['RiskObject', 'TypeObject', 'DepartmentObject'],
    });

    return new SuccessResponseObject('Rules retrieved Successfully', rules);
  }

  @Get('/migration/:migrationId/rule/:ruleId')
  @ApiOperation({ summary: 'Get rules by migration Id and RuleId' })
  async getRulesByMigrationAndRuleId(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('ruleId') ruleId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const rule = await this.ruleService.findOne({
      where: { dataMigrationId: migration.dataMigrationId, ruleId: ruleId },
    });

    if (!rule) {
      throw new BadRequestException('Rule not found!');
    }

    return new SuccessResponseObject('Rule retrieved Successfully', rule);
  }

  @Post('/migration/:migrationId/rulesByIds')
  @ApiOperation({ summary: 'Get rules by migration Id and RuleId' })
  async getRulesByIds(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Body('ruleIds') ruleIds: string[],
    @Body('fields') fields: string[],
  ) {
    if (!ruleIds || ruleIds.length === 0) {
      throw new BadRequestException('Rules Ids not provided!');
    }

    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    let select = fields;
    if (!select || select.length === 0 || select[0] === '*') {
      select = undefined;
    }

    //transfrom select array into keyof Rule[]
    const selectKeys = select as (keyof Rule)[];

    const rules = await this.ruleService.findMany({
      where: {
        dataMigrationId: migration.dataMigrationId,
        ruleId: In(ruleIds),
      },
      select: selectKeys,
    });

    if (!rules) {
      throw new BadRequestException('Rules not found!');
    }

    return new SuccessResponseObject('Rules retrieved Successfully', rules);
  }

  @Delete('/rule/:ruleId')
  @ApiOperation({ summary: 'Deletes a rule by its ID' })
  async deleteRule(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('ruleId') ruleId: string,
  ) {
    const rule = await this.ruleService.findOne({
      where: { ruleId },
    });

    if (!rule) {
      throw new BadRequestException('Rule not found!');
    }

    const migration = await this.dataMigrationService.findOne({
      where: {
        dataMigrationId: rule.dataMigrationId,
        tenantId: authedUser.tenantId,
      },
    });

    if (!migration) {
      // Rule does not belong to the user
      // returning same error message to do not give hints to attackers of what rules exists
      throw new BadRequestException('Rule not found!');
    }

    if (rule.active === true) {
      if (rule.type === RuleTypeEnum.AnomalyDetection) {
        const sqsMessagePayload: AnomalyRuleApplierSQSMessageDto = {
          tenantId: authedUser.tenantId,
          migrationId: migration.dataMigrationId,
          ruleAction: AnomalyRuleAction.REMOVE,
          ruleId: rule.ruleId,
          dataSourceId: migration.dataSourceId,
          analysisMode: AnomalyAnalysisModeEnum.FROM_RULE,
          table: rule.table,
        };
        await this.sqsMessageProducerService.sendAnomalyRuleApplierQueueMessage(
          sqsMessagePayload,
        );
      }
      if (rule.type === RuleTypeEnum.DataValidation) {
        const sqsMessagePayload: RuleApplierSqsMessageDto = {
          userId: authedUser.userId,
          tenantId: authedUser.tenantId,
          migrationId: migration.dataMigrationId,
          action: RuleApplierActions.REMOVE,
          ruleIds: [rule.ruleId],
        };
        await this.sqsMessageProducerService.sendRuleApplierQueueMessage(
          sqsMessagePayload,
        );
      }
    }

    const newRuleName = `${uuid().split('-')[0]}-${rule.name}`;
    await this.ruleService.update(ruleId, { name: newRuleName });
    await this.ruleService.deleteRule(ruleId);
    return new SuccessResponseObject('Rule deleted successfully');
  }

  @Put('/rule/:ruleId')
  @ApiOperation({ summary: 'Update a rule by its ID' })
  async updateRule(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: UpdateRuleDto,
    @Param('ruleId') ruleId: string,
  ) {
    const rule = await this.ruleService.findOne({
      where: { ruleId },
    });

    if (!rule) {
      throw new BadRequestException('Rule not found!');
    }

    const migration = await this.dataMigrationService.findOne({
      where: {
        dataMigrationId: rule.dataMigrationId,
        tenantId: authedUser.tenantId,
      },
    });

    if (!migration) {
      // Rule does not belong to the user
      // returning same error message to do not give hints to attackers of what rules exists
      throw new BadRequestException('Rule not found!');
    }

    await this._validateViolationScoreLimit(
      migration.dataMigrationId,
      body.table,
      body.violationScore,
      rule.ruleId,
    );

    let updatedRule: Rule;
    if (rule.type === RuleTypeEnum.DataValidation) {
      updatedRule = await this._processDataValidationRule(
        authedUser,
        migration,
        body,
        RuleApplierActions.UPDATE,
        rule,
      );
    } else if (rule.type === RuleTypeEnum.AnomalyDetection) {
      updatedRule = await this._processAnomalyDetectionRule(
        authedUser,
        migration,
        body,
        AnomalyRuleAction.RE_APPLY,
        rule,
      );
    } else {
      throw new BadRequestException('Rule type not found!');
    }
    return new SuccessResponseObject('Rule Updated Successfully', updatedRule);
  }

  @Get('/dataValidation/:migrationId/table/:tableId/dataValidationViolatedData')
  @ApiOperation({
    summary:
      'Get data from the migrated tables which violated data validation rules',
  })
  async getDataValidationViolatedMigrationTableRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    const paginationOptions: paginationOptions = {
      skip: skip || 0,
      take: take || 25,
    };

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId, table: tableId },
    });

    const ruleIds = rules.map((rule) => rule.ruleId);

    const data =
      await this.dataMigrationSchemaService.getDataValidationTableData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        paginationOptions,
        ruleIds,
      );

    return new SuccessResponseObject('Data Fetch successfully', data);
  }

  @Get(
    '/dataValidation/:migrationId/table/:tableId/dataValidationViolatedTotalData',
  )
  @ApiOperation({
    summary:
      'Get data from the migrated tables which violated data validation rules',
  })
  async getDataValidationViolatedMigrationTableTotalRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    const rules = await this.ruleService.findMany({
      where: { dataMigrationId: migration.dataMigrationId, table: tableId },
    });

    const ruleIds = rules.map((rule) => rule.ruleId);

    const data =
      await this.dataMigrationSchemaService.getDataValidationTableTotalData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        ruleIds,
      );

    return new SuccessResponseObject('Data Fetch successfully', data.length);
  }

  async _validateViolationScoreLimit(
    migrationId: string,
    table: string,
    violationScoreToAdd: number,
    idToIgnore = '',
  ) {
    const tableRules = await this.ruleService.findMany({
      where: {
        dataMigrationId: migrationId,
        table: table,
      },
    });

    const usedViolationScore = tableRules.reduce((prev, current) => {
      if (current.ruleId != idToIgnore) {
        return +prev + (+current.violationScore ?? 0);
      }
      return +prev;
    }, 0);

    if (usedViolationScore + violationScoreToAdd > this.MAX_VIOLATION_SCORE) {
      const maxAcceptable = 100 - usedViolationScore;
      throw new BadRequestException(
        `The sum of the violations scores of all rules for this table cannot be greater than 100. Remaining max (${maxAcceptable})`,
      );
    }
  }

  async _processAnomalyDetectionRule(
    authedUser: IAuthedUser,
    migration: DataMigration,
    body: CreateRuleDto | UpdateRuleDto,
    action: AnomalyRuleAction,
    previousRule?: Rule,
  ) {
    let processedRule: Rule;
    if (action === AnomalyRuleAction.APPLY) {
      processedRule = await this.ruleService.createRule(
        body,
        migration.dataMigrationId,
      );
    } else if (action === AnomalyRuleAction.RE_APPLY && previousRule) {
      (body as UpdateRuleDto).previousFormattedRule =
        previousRule.formattedRule;
      processedRule = await this.ruleService.update(previousRule.ruleId, body);
    }

    if (processedRule) {
      const sqsMessagePayload: AnomalyRuleApplierSQSMessageDto = {
        tenantId: authedUser.tenantId,
        migrationId: migration.dataMigrationId,
        ruleAction: action,
        ruleId: processedRule.ruleId,
        dataSourceId: migration.dataSourceId,
        analysisMode: AnomalyAnalysisModeEnum.FROM_RULE,
        table: processedRule.table,
      };
      await this.sqsMessageProducerService.sendAnomalyRuleApplierQueueMessage(
        sqsMessagePayload,
      );
    }
    return processedRule;
  }

  async _processDataValidationRule(
    authedUser: IAuthedUser,
    migration: DataMigration,
    body: Partial<Rule>,
    action: RuleApplierActions,
    previousRule?: Rule,
  ) {
    console.log('processing Data validation rule');
    console.log(authedUser, migration, body, action, previousRule);

    if (body.rule) {
      let subQueryTempIdMapping = {};

      if (action === RuleApplierActions.APPLY) {
        const { subQueriesCreated, subQueryTempIdMapping: mapping } =
          await this.createSubQueriesFromRule(authedUser, migration, body);
        subQueryTempIdMapping = mapping;
        body.tempTables = subQueriesCreated;
        const { ruleCopy } = RuleTransformer.transformSubQueriesReferences(
          body.frontEndObject as any,
          subQueryTempIdMapping,
        );
        body.frontEndObject = ruleCopy as any;
      }

      const { ruleCopy, existingSubQueriesIds } =
        RuleTransformer.transformSubQueriesReferences(
          body.rule,
          subQueryTempIdMapping,
        );
      body.rule = ruleCopy;

      const existingSubQueries = await this.ruleTempTableService.findMany({
        ruleTempTableId: In(existingSubQueriesIds),
      });
      body.rule.subQueries = [];
      body.tempTables = [...(body.tempTables || []), ...existingSubQueries];

      body.tableDependencies = RuleFormatter.getTableDependencies(
        body.rule as RuleDto,
      );
      body.tableDependencies = [
        ...body.tableDependencies,
        ...body.tempTables.map((t) => t.table),
      ];
      body.tableDependencies = Array.from(new Set(body.tableDependencies));

      const transformedRule = RuleTransformer.processRuleTransformations(
        body.rule as RuleDto,
      );

      body.formattedRule = RuleFormatter.getFormattedRule(
        authedUser.tenantId,
        migration.dataSourceId,
        transformedRule,
      );
    }

    let processedRule: Rule;
    if (action === RuleApplierActions.APPLY) {
      processedRule = await this.ruleService.createRule(
        body,
        migration.dataMigrationId,
      );
    } else if (action === RuleApplierActions.UPDATE && previousRule) {
      (body as UpdateRuleDto).previousFormattedRule =
        previousRule.formattedRule;
      processedRule = await this.ruleService.update(previousRule.ruleId, body);
    }

    if (processedRule) {
      const sqsMessagePayload: RuleApplierSqsMessageDto = {
        userId: authedUser.userId,
        tenantId: authedUser.tenantId,
        migrationId: migration.dataMigrationId,
        action: action,
        ruleIds: [processedRule.ruleId],
      };
      await this.sqsMessageProducerService.sendRuleApplierQueueMessage(
        sqsMessagePayload,
      );
    }
    return processedRule;
  }

  async createSubQueriesFromRule(
    authedUser: IAuthedUser,
    migration: DataMigration,
    body: Partial<Rule>,
  ) {
    let subQueriesCreated: RuleTempTable[] = [];
    const subQueries = body.rule.subQueries || [];
    const subQueryTempIdMapping: Record<string, string> = {};

    const promises = subQueries.map(async (subQuery: SubQuery) => {
      const tempId = subQuery.tempId;
      const subQueryPayload: CreateRuleTempTable = {
        name: subQuery.alias,
        definition: { where: subQuery.where, table: subQuery.table },
        table: subQuery.table,
      };

      const tableCreated = await this.ruleTempTableService.processTemporalTable(
        authedUser,
        migration,
        subQueryPayload,
        TemporalTableActions.CREATE,
      );
      subQueryTempIdMapping[tempId] = tableCreated.ruleTempTableId;
      return tableCreated;
    });

    subQueriesCreated = await Promise.all(promises);
    return { subQueriesCreated, subQueryTempIdMapping };
  }
}
