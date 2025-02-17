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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQSMessageProducerService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const env_config_1 = __importDefault(require("../../../../config/env.config"));
let SQSMessageProducerService = class SQSMessageProducerService {
    constructor() {
        this.sqs = new aws_sdk_1.SQS();
    }
    async sendDataSetQueueMessage(body) {
        const deduplicationId = `${body.userId}-${body.migrationId}-${new Date().toISOString()}`;
        const params = {
            MessageBody: JSON.stringify(body),
            MessageGroupId: `${body.migrationId}`,
            QueueUrl: (0, env_config_1.default)().sqsDataSetQueueUrl,
            MessageDeduplicationId: deduplicationId,
        };
        return await this.sqs.sendMessage(params).promise();
    }
    async sendRuleApplierQueueMessage(body) {
        const deduplicationId = `${body.userId}-${body.migrationId}-${new Date().toISOString()}`;
        const params = {
            MessageBody: JSON.stringify(body),
            MessageGroupId: `${body.migrationId}-${body.ruleIds.join('-')}`,
            QueueUrl: (0, env_config_1.default)().sqsRuleApplierQueueUrl,
            MessageDeduplicationId: deduplicationId,
        };
        return await this.sqs.sendMessage(params).promise();
    }
    async sendAnomalyRuleApplierQueueMessage(body) {
        const deduplicationId = `${body.tenantId}-${body.migrationId}-${new Date().toISOString()}`;
        const params = {
            MessageBody: JSON.stringify(body),
            MessageGroupId: `${body.migrationId}-${body.ruleId}`,
            QueueUrl: (0, env_config_1.default)().sqsAnomalyRuleApplierQueueUrl,
            MessageDeduplicationId: deduplicationId,
        };
        return await this.sqs.sendMessage(params).promise();
    }
    async sendDataSynchronizerQueueMessage(body) {
        const deduplicationId = `${body.userId}-${body.migrationId}-${new Date().toISOString()}`;
        const params = {
            MessageBody: JSON.stringify(body),
            MessageGroupId: `${body.migrationId}-${body.tenantId}`,
            QueueUrl: (0, env_config_1.default)().sqsDataSynchronizerQueueUrl,
            MessageDeduplicationId: deduplicationId,
        };
        return await this.sqs.sendMessage(params).promise();
    }
    async sendDataMigrationRemovalQueueMessage(body) {
        const deduplicationId = `${body.userOrTenantId}-${body.migrationId}-${new Date().toISOString()}`;
        const params = {
            MessageBody: JSON.stringify({ migrationId: body.migrationId }),
            MessageGroupId: `${body.userOrTenantId}-${body.dataSourceId}`,
            QueueUrl: (0, env_config_1.default)().sqsDataMigrationRemovalQueueUrl,
            MessageDeduplicationId: deduplicationId,
        };
        return await this.sqs.sendMessage(params).promise();
    }
};
SQSMessageProducerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SQSMessageProducerService);
exports.SQSMessageProducerService = SQSMessageProducerService;
//# sourceMappingURL=sqs-message-producer.service.js.map