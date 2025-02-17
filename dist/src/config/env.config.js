"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const envalid_1 = require("envalid");
let fullEnv;
if (!process.env.STAGE || process.env.STAGE === 'development') {
    fullEnv = Object.assign(Object.assign({}, dotenv.config().parsed), process.env);
}
else {
    fullEnv = Object.assign({}, process.env);
}
const env = (0, envalid_1.cleanEnv)(fullEnv, {
    PORT: (0, envalid_1.port)({
        default: 3000,
        desc: 'The TCP port that this server will listen to',
    }),
    STAGE: (0, envalid_1.str)({
        desc: 'The current stage of this application',
        example: 'development',
        devDefault: 'development',
    }),
    COGNITO_USER_POOL_ID: (0, envalid_1.str)({
        desc: 'AWS Cognito user pool id',
        example: 'us-east-1_ridkd...',
    }),
    COGNITO_CLIENT_ID: (0, envalid_1.str)({
        desc: 'AWS Cognito client id',
        example: '7cp4b241qcd3addjd...',
    }),
    COGNITO_REGION: (0, envalid_1.str)({
        desc: 'AWS Cognito region',
        example: 'us-east-1',
        devDefault: 'us-east-1',
    }),
    SENDGRID_API_KEY: (0, envalid_1.str)({
        desc: 'Sendgrid API key',
        example: '080ba91b60db42e8ade4137748dsadb1',
    }),
    SENDGRID_SENDING_DOMAIN: (0, envalid_1.str)({
        desc: 'Verified Domain Name on Sendgrid for outbound emails',
        example: 'customercity.com',
        default: 'customercity.com',
    }),
    FRONTEND_URL: (0, envalid_1.str)({
        desc: 'Front end URL to accept requests from',
        default: 'http://localhost:3000',
    }),
    DATABASE_URL: (0, envalid_1.str)({
        desc: 'Full URL to connect to database server.',
        example: 'postgresql://username:password@localhost:5432/database',
    }),
    AWS_ACCESS_KEY_ID: (0, envalid_1.str)({
        desc: 'AWS Access Key Id',
        example: 'AKIXXXXXXXXXXXXXXXXP',
        devDefault: 'AKIXXXXXXXXXXXXXXXXP',
    }),
    AWS_SECRET_ACCESS_KEY: (0, envalid_1.str)({
        desc: 'AWS Secret Access Key',
        example: 'SbEfTobxxxxxxxxxxxxxxxxxxxxxxxhu',
        devDefault: 'SbEfTobxxxxxxxxxxxxxxxxxxxxxxxhu',
    }),
    AWS_DEFAULT_REGION: (0, envalid_1.str)({
        desc: 'AWS default region',
        example: 'us-east-1',
        default: 'us-east-1',
    }),
    SWAGGER_USERNAME: (0, envalid_1.str)({
        desc: 'Swagger docs endpoint username',
        default: 'admin',
    }),
    SWAGGER_PASSWORD: (0, envalid_1.str)({
        desc: 'Swagger docs endpoint password',
        default: 'admin',
    }),
    GOOGLE_API_CLIENT_ID: (0, envalid_1.str)({
        desc: 'Google Api client ID',
    }),
    GOOGLE_API_CLIENT_SECRET: (0, envalid_1.str)({
        desc: 'Google Api client secret',
    }),
    FIREBASE_SECRET_NAME: (0, envalid_1.str)({
        desc: 'AWS Secret Manager - Secret Name For Firebase Service Account',
    }),
    SALESFORCE_CONSUMER_KEY: (0, envalid_1.str)({
        desc: 'Salesforce Connected app - consumer key',
    }),
    SALESFORCE_CONSUMER_SECRET: (0, envalid_1.str)({
        desc: 'Salesforce Connected app - consumer secret',
    }),
    SQS_DATA_SET_QUEUE_NAME: (0, envalid_1.str)({
        desc: 'SQS data set name for triggering the data set and migration process',
        devDefault: 'dev-aws-useast1-data-set-calculator-queue.fifo',
    }),
    SQS_DATA_SET_QUEUE_URL: (0, envalid_1.str)({
        desc: 'SQS data set url for triggering the data set and migration process',
        devDefault: 'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-data-set-calculator-queue.fifo',
    }),
    SQS_RULE_APPLIER_QUEUE_URL: (0, envalid_1.str)({
        desc: 'SQS data set url for triggering the rule applier process',
        devDefault: 'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-rule-applier-queue.fifo',
    }),
    SQS_ANOMALY_RULE_APPLIER_QUEUE_URL: (0, envalid_1.str)({
        desc: 'SQS data set url for triggering the Anomaly rule applier process',
        devDefault: 'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-anomaly-analysis-queue.fifo',
    }),
    SQS_DATA_SYNCHRONIZER_QUEUE_URL: (0, envalid_1.str)({
        desc: 'SQS data set url for triggering the data synchronizer process',
        devDefault: 'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-data-synchronizer-queue.fifo',
    }),
    SQS_DATA_MIGRATION_REMOVAL_QUEUE_URL: (0, envalid_1.str)({
        desc: 'SQS data set url for triggering the data migration removal process',
        devDefault: 'https://sqs.us-east-1.amazonaws.com/513036925867/dev-aws-useast1-data-migration-removal-queue.fifo',
    }),
    INTEGRATION_SESSION_KMS_KEY_ID: (0, envalid_1.str)({
        desc: 'KMS key id to encrypt integration session information',
    }),
    MS_TENANT_ID: (0, envalid_1.str)({
        desc: 'Microsoft tenant id',
        devDefault: '9b7f7c30-fdef-4462-9c7d-87eb30dee816',
    }),
    MS_APP_ID: (0, envalid_1.str)({
        desc: 'Microsoft app id',
        devDefault: '33acaffe-f4a6-4c48-845b-282f22cebe37',
    }),
    MS_CLIENT_SECRET: (0, envalid_1.str)({
        desc: 'Microsoft client secret',
    }),
});
exports.default = () => {
    return {
        port: env.PORT,
        stage: env.STAGE,
        isProduction: env.STAGE === 'production',
        isStaging: env.STAGE === 'staging',
        isDevelopment: env.STAGE === 'development',
        cognitoUserPoolId: env.COGNITO_USER_POOL_ID,
        cognitoClientId: env.COGNITO_CLIENT_ID,
        cognitoRegion: env.COGNITO_REGION,
        cognitoAuthority: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}`,
        sendgridApiKey: env.SENDGRID_API_KEY,
        sendgridSendingDomain: env.SENDGRID_SENDING_DOMAIN,
        frontEndUrl: env.FRONTEND_URL,
        databaseURL: env.DATABASE_URL,
        awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
        awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        awsDefaultRegion: env.AWS_DEFAULT_REGION,
        swaggerUsername: env.SWAGGER_USERNAME,
        swaggerPassword: env.SWAGGER_PASSWORD,
        googleApiClientId: env.GOOGLE_API_CLIENT_ID,
        googleApiClientSecret: env.GOOGLE_API_CLIENT_SECRET,
        firebaseSecretName: env.FIREBASE_SECRET_NAME,
        salesforceConsumerKey: env.SALESFORCE_CONSUMER_KEY,
        salesforceConsumerSecret: env.SALESFORCE_CONSUMER_SECRET,
        sqsDataSetQueueName: env.SQS_DATA_SET_QUEUE_NAME,
        sqsDataSetQueueUrl: env.SQS_DATA_SET_QUEUE_URL,
        sqsRuleApplierQueueUrl: env.SQS_RULE_APPLIER_QUEUE_URL,
        sqsDataSynchronizerQueueUrl: env.SQS_DATA_SYNCHRONIZER_QUEUE_URL,
        sqsDataMigrationRemovalQueueUrl: env.SQS_DATA_MIGRATION_REMOVAL_QUEUE_URL,
        integrationSessionKmsKeyId: env.INTEGRATION_SESSION_KMS_KEY_ID,
        sqsAnomalyRuleApplierQueueUrl: env.SQS_ANOMALY_RULE_APPLIER_QUEUE_URL,
        msTenantId: env.MS_TENANT_ID,
        msAppId: env.MS_APP_ID,
        msClientSecret: env.MS_CLIENT_SECRET,
    };
};
//# sourceMappingURL=env.config.js.map