import { Injectable } from '@nestjs/common';
import { RuleTempTableRepository } from './rule-temp-table.repository';
import { FindConditions, getConnection } from 'typeorm';
import { RuleTempTable } from './rule-temp-table.entity';
import { IAuthedUser } from '@/auth/types';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import {
  CreateRuleTempTable,
  UpdateRuleTempTableDto,
} from './rule-temp-table.dto';
import { TemporalTableActions } from './rule-temp-table.controller';
import { RuleTransformer } from '../util/RuleTransformer';
import { RuleFormatter } from '../util/RuleFormatter';
import { JsonToSql } from '../util/JsonToSql';
import {
  RuleApplierActions,
  RuleApplierSqsMessageDto,
} from '@/core/lib/aws/sqs/dto/rule-applier-sqs-message.dto';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';

@Injectable()
export class RuleTempTableService {
  constructor(
    private readonly ruleTempTableRepository: RuleTempTableRepository,
    private readonly sqsMessageProducerService: SQSMessageProducerService,
  ) {}

  async getDependenciesAssociated(migrationId: string, tableId: string) {
    return this.ruleTempTableRepository.getDependenciesAssociated(
      migrationId,
      tableId,
    );
  }

  async executeTempTableSample(sqlQuery: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    queryRunner.startTransaction();
    let records = [];
    try {
      records = await queryRunner.query(sqlQuery);
    } catch (err) {
      console.error('Error executing temp table query sample', err);
    } finally {
      //Always rollback transaction as a protection mechanism
      try {
        await queryRunner.rollbackTransaction();
      } catch (err) {
        console.error('Error rolling back transaction', err);
      }
      try {
        await queryRunner.release();
      } catch (err) {
        console.error('Error releasing query runner', err);
      }
    }
    return records;
  }

  async findMany(conditions: FindConditions<RuleTempTable>): Promise<any[]> {
    return this.ruleTempTableRepository.find({ where: conditions });
  }

  async create(
    data: Partial<RuleTempTable>,
    migrationId: string,
  ): Promise<any> {
    const entity = this.ruleTempTableRepository.create({
      ...data,
      dataMigrationId: migrationId,
    });
    console.log('entity', entity);
    return this.ruleTempTableRepository.save(entity);
  }

  async findAll(migrationId: string): Promise<any[]> {
    return this.ruleTempTableRepository.find({
      where: { dataMigrationId: migrationId },
    });
  }

  async findOne(id: string, migrationId: string): Promise<any> {
    console.log({ id, migrationId });
    return this.ruleTempTableRepository.findOne(id, {
      where: { dataMigrationId: migrationId },
    });
  }

  async findOneByConditions(
    conditions: FindConditions<RuleTempTable>,
  ): Promise<any> {
    return this.ruleTempTableRepository.findOne({ where: conditions });
  }

  async update(
    id: string,
    data: Partial<RuleTempTable>,
    migrationId: string,
  ): Promise<any> {
    return this.ruleTempTableRepository.update(id, {
      ...data,
      dataMigrationId: migrationId,
    });
  }

  async delete(id: string): Promise<any> {
    return this.ruleTempTableRepository.delete(id);
  }

  async processTemporalTable(
    authedUser: IAuthedUser,
    migration: DataMigration,
    body: CreateRuleTempTable | UpdateRuleTempTableDto,
    action: TemporalTableActions,
    temporalTableId?: string,
  ) {
    const temporalTable: Partial<RuleTempTable> = body;
    temporalTable.definition.table = body.table;

    if (temporalTable.definition) {
      const transformedRule = RuleTransformer.processRuleTransformations(
        body.definition,
      );
      temporalTable.formattedDefinition = RuleFormatter.getFormattedRule(
        authedUser.tenantId,
        migration.dataSourceId,
        transformedRule,
      );
      temporalTable.formattedTableName =
        RuleFormatter.getFormattedTemporalTableName(body.name);
      const json = temporalTable.formattedDefinition;
      json.fields = ['"Id"'];
      json.limit = 5;
      const sqlQuery = new JsonToSql(json).build();
      const records = await this.executeTempTableSample(sqlQuery);
      temporalTable.sampleIds = records.map((record) => record.Id);
    }

    let processedTemporalTable: RuleTempTable;
    if (action === TemporalTableActions.CREATE) {
      processedTemporalTable = await this.create(
        temporalTable as CreateRuleTempTable,
        migration.dataMigrationId,
      );
    } else if (action === TemporalTableActions.UPDATE && temporalTableId) {
      processedTemporalTable = await this.update(
        temporalTableId,
        temporalTable as UpdateRuleTempTableDto,
        migration.dataMigrationId,
      );

      const dependencies = await this.getDependenciesAssociated(
        migration.dataMigrationId,
        temporalTableId,
      );

      const ruleIds = dependencies.map((dep) => dep.ruleId);

      if (processedTemporalTable && ruleIds.length > 0) {
        const sqsMessagePayload: RuleApplierSqsMessageDto = {
          userId: authedUser.userId,
          tenantId: authedUser.tenantId,
          migrationId: migration.dataMigrationId,
          action: RuleApplierActions.RE_APPLY,
          ruleIds: ruleIds,
        };
        await this.sqsMessageProducerService.sendRuleApplierQueueMessage(
          sqsMessagePayload,
        );
      }
    }

    return processedTemporalTable;
  }
}
