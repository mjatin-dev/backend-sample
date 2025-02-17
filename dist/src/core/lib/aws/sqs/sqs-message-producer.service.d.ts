import { SQS } from 'aws-sdk';
import { DataSetMigrationSQSMessageDto } from './dto/data-set-migration-sqs-message.dto';
import { RuleApplierSqsMessageDto } from './dto/rule-applier-sqs-message.dto';
import { DataSynchronizerSqsMessageDto } from './dto/data-synchronizer-sqs-message.dto';
import { AnomalyRuleApplierSQSMessageDto } from './dto/anomaly-rule-applier-sqs-message.dto';
import { DataMigrationRemovalSQSMessageDto } from './dto/data-migration-removal-sqs-message.dto';
export declare class SQSMessageProducerService {
    sqs: SQS;
    constructor();
    sendDataSetQueueMessage(body: DataSetMigrationSQSMessageDto): Promise<import("aws-sdk/lib/request").PromiseResult<SQS.SendMessageResult, import("aws-sdk").AWSError>>;
    sendRuleApplierQueueMessage(body: RuleApplierSqsMessageDto): Promise<import("aws-sdk/lib/request").PromiseResult<SQS.SendMessageResult, import("aws-sdk").AWSError>>;
    sendAnomalyRuleApplierQueueMessage(body: AnomalyRuleApplierSQSMessageDto): Promise<import("aws-sdk/lib/request").PromiseResult<SQS.SendMessageResult, import("aws-sdk").AWSError>>;
    sendDataSynchronizerQueueMessage(body: DataSynchronizerSqsMessageDto): Promise<import("aws-sdk/lib/request").PromiseResult<SQS.SendMessageResult, import("aws-sdk").AWSError>>;
    sendDataMigrationRemovalQueueMessage(body: DataMigrationRemovalSQSMessageDto): Promise<import("aws-sdk/lib/request").PromiseResult<SQS.SendMessageResult, import("aws-sdk").AWSError>>;
}
