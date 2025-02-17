import { RuleTempTableRepository } from './rule-temp-table.repository';
import { FindConditions } from 'typeorm';
import { RuleTempTable } from './rule-temp-table.entity';
import { IAuthedUser } from '@/auth/types';
import { DataMigration } from '@/data-migration/entities/dataMigration.entity';
import { CreateRuleTempTable, UpdateRuleTempTableDto } from './rule-temp-table.dto';
import { TemporalTableActions } from './rule-temp-table.controller';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';
export declare class RuleTempTableService {
    private readonly ruleTempTableRepository;
    private readonly sqsMessageProducerService;
    constructor(ruleTempTableRepository: RuleTempTableRepository, sqsMessageProducerService: SQSMessageProducerService);
    getDependenciesAssociated(migrationId: string, tableId: string): Promise<import("./rule-temp-table.repository").TempTableDependency[]>;
    executeTempTableSample(sqlQuery: string): Promise<any[]>;
    findMany(conditions: FindConditions<RuleTempTable>): Promise<any[]>;
    create(data: Partial<RuleTempTable>, migrationId: string): Promise<any>;
    findAll(migrationId: string): Promise<any[]>;
    findOne(id: string, migrationId: string): Promise<any>;
    findOneByConditions(conditions: FindConditions<RuleTempTable>): Promise<any>;
    update(id: string, data: Partial<RuleTempTable>, migrationId: string): Promise<any>;
    delete(id: string): Promise<any>;
    processTemporalTable(authedUser: IAuthedUser, migration: DataMigration, body: CreateRuleTempTable | UpdateRuleTempTableDto, action: TemporalTableActions, temporalTableId?: string): Promise<RuleTempTable>;
}
