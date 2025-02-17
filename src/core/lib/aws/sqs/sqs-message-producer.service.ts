import { Injectable } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import env from '@/config/env.config';
import { DataSetMigrationSQSMessageDto } from './dto/data-set-migration-sqs-message.dto';
import { RuleApplierSqsMessageDto } from './dto/rule-applier-sqs-message.dto';
import { DataSynchronizerSqsMessageDto } from './dto/data-synchronizer-sqs-message.dto';
import { AnomalyRuleApplierSQSMessageDto } from './dto/anomaly-rule-applier-sqs-message.dto';
import { DataMigrationRemovalSQSMessageDto } from './dto/data-migration-removal-sqs-message.dto';

@Injectable()
export class SQSMessageProducerService {
  sqs: SQS;

  constructor() {
    this.sqs = new SQS();
  }

  async sendDataSetQueueMessage(body: DataSetMigrationSQSMessageDto) {
    const deduplicationId = `${body.userId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: `${body.migrationId}`,
      QueueUrl: env().sqsDataSetQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };

    return await this.sqs.sendMessage(params).promise();
  }

  async sendRuleApplierQueueMessage(body: RuleApplierSqsMessageDto) {
    const deduplicationId = `${body.userId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: `${body.migrationId}-${body.ruleIds.join('-')}`,
      QueueUrl: env().sqsRuleApplierQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };

    return await this.sqs.sendMessage(params).promise();
  }

  async sendAnomalyRuleApplierQueueMessage(
    body: AnomalyRuleApplierSQSMessageDto,
  ) {
    const deduplicationId = `${body.tenantId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: `${body.migrationId}-${body.ruleId}`,
      QueueUrl: env().sqsAnomalyRuleApplierQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };

    return await this.sqs.sendMessage(params).promise();
  }

  async sendDataSynchronizerQueueMessage(body: DataSynchronizerSqsMessageDto) {
    const deduplicationId = `${body.userId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify(body),
      MessageGroupId: `${body.migrationId}-${body.tenantId}`,
      QueueUrl: env().sqsDataSynchronizerQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };
    return await this.sqs.sendMessage(params).promise();
  }

  async sendDataMigrationRemovalQueueMessage(
    body: DataMigrationRemovalSQSMessageDto,
  ) {
    const deduplicationId = `${body.userOrTenantId}-${
      body.migrationId
    }-${new Date().toISOString()}`;

    const params: SQS.Types.SendMessageRequest = {
      MessageBody: JSON.stringify({ migrationId: body.migrationId }),
      MessageGroupId: `${body.userOrTenantId}-${body.dataSourceId}`,
      QueueUrl: env().sqsDataMigrationRemovalQueueUrl,
      MessageDeduplicationId: deduplicationId,
    };
    return await this.sqs.sendMessage(params).promise();
  }
}
