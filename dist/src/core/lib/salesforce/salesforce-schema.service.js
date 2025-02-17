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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _SalesforceSchemaService_oAuth2Client, _SalesforceSchemaService_oAuth2SandboxClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceSchemaService = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const integration_repository_1 = require("../../../integration/integration.repository");
const integrationState_repository_1 = require("../../../integration/integrationState.repository");
const common_1 = require("@nestjs/common");
const types_1 = require("../../types");
const kms_manager_service_1 = require("../aws/kms/kms-manager.service");
const jsforce_1 = require("jsforce");
let SalesforceSchemaService = class SalesforceSchemaService {
    constructor(integrationRepository, integrationStateRepository, kmsManagerService) {
        this.integrationRepository = integrationRepository;
        this.integrationStateRepository = integrationStateRepository;
        this.kmsManagerService = kmsManagerService;
        _SalesforceSchemaService_oAuth2Client.set(this, void 0);
        _SalesforceSchemaService_oAuth2SandboxClient.set(this, void 0);
    }
    get oAuth2Client() {
        if (!__classPrivateFieldGet(this, _SalesforceSchemaService_oAuth2Client, "f")) {
            __classPrivateFieldSet(this, _SalesforceSchemaService_oAuth2Client, new jsforce_1.OAuth2({
                clientId: (0, env_config_1.default)().salesforceConsumerKey,
                clientSecret: (0, env_config_1.default)().salesforceConsumerSecret,
                redirectUri: this.getFrontendRedirectUrl(),
            }), "f");
        }
        return __classPrivateFieldGet(this, _SalesforceSchemaService_oAuth2Client, "f");
    }
    get oAuth2SandboxClient() {
        if (!__classPrivateFieldGet(this, _SalesforceSchemaService_oAuth2SandboxClient, "f")) {
            __classPrivateFieldSet(this, _SalesforceSchemaService_oAuth2SandboxClient, new jsforce_1.OAuth2({
                clientId: (0, env_config_1.default)().salesforceConsumerKey,
                clientSecret: (0, env_config_1.default)().salesforceConsumerSecret,
                redirectUri: this.getFrontendRedirectUrl(),
                loginUrl: 'https://test.salesforce.com',
            }), "f");
        }
        return __classPrivateFieldGet(this, _SalesforceSchemaService_oAuth2SandboxClient, "f");
    }
    getFrontendRedirectUrl() {
        return (0, env_config_1.default)().frontEndUrl + '/d/integration-redirect/' + types_1.AppIds.SALESFORCE;
    }
    async getIntegrationData(tenantId) {
        var _a;
        const integration = await this.integrationRepository.getOneIntegrationWithStateByTenant(tenantId, types_1.AppIds.SALESFORCE);
        const integrationState = (_a = integration.integratedApps) === null || _a === void 0 ? void 0 : _a.find((app) => app.tenantId === tenantId);
        return { integration, integrationState };
    }
    async getFieldPickListValues(authedUser, objectName, fieldName) {
        const conn = await this.getSalesforceConnection(authedUser);
        const describe = await conn.sobject(objectName).describe();
        const field = describe.fields.find((field) => field.name === fieldName);
        if (!field) {
            throw new common_1.HttpException('Field not found', 404);
        }
        if (field.type !== 'picklist') {
            throw new common_1.HttpException('Field is not Pick list type', 404);
        }
        return field.picklistValues.map((value) => value.value);
    }
    async createRecord(authedUser, objectName, record) {
        const conn = await this.getSalesforceConnection(authedUser);
        return await conn.sobject(objectName).create(record);
    }
    async updateObjectRecord(authedUser, objectName, recordId, values) {
        const conn = await this.getSalesforceConnection(authedUser);
        const updateRes = await conn
            .sobject(objectName)
            .update(Object.assign({ Id: recordId }, values));
        if (updateRes.success !== true) {
            throw new common_1.HttpException('Error while updating record', 500);
        }
    }
    async getSalesforceConnection(authedUser) {
        var _a;
        const { integrationState } = await this.getIntegrationData(authedUser.tenantId);
        if (!integrationState) {
            throw new common_1.HttpException('Integration not found', 404);
        }
        const session = integrationState.session;
        const tokens = session.tokens;
        const isSandboxOrg = ((_a = session.meta) === null || _a === void 0 ? void 0 : _a.isSandboxOrg) == true;
        const accessToken = await this.kmsManagerService.decrypt(tokens.accessToken);
        const refreshToken = await this.kmsManagerService.decrypt(tokens.refreshToken);
        const instanceUrl = tokens.instanceUrl;
        const conn = new jsforce_1.Connection({
            instanceUrl,
            accessToken,
            refreshToken,
            oauth2: isSandboxOrg ? __classPrivateFieldGet(this, _SalesforceSchemaService_oAuth2SandboxClient, "f") : this.oAuth2Client,
            version: '59.0',
        });
        conn.on('refresh', async (accessToken) => {
            const { integrationState } = await this.getIntegrationData(authedUser.tenantId);
            const session = integrationState.session;
            const tokens = session.tokens;
            tokens.accessToken = await this.kmsManagerService.encrypt((0, env_config_1.default)().integrationSessionKmsKeyId, accessToken);
            await this.integrationStateRepository.update(integrationState.id, integrationState);
        });
        return conn;
    }
};
_SalesforceSchemaService_oAuth2Client = new WeakMap(), _SalesforceSchemaService_oAuth2SandboxClient = new WeakMap();
SalesforceSchemaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [integration_repository_1.IntegrationRepository,
        integrationState_repository_1.IntegrationStateRepository,
        kms_manager_service_1.KmsManagerService])
], SalesforceSchemaService);
exports.SalesforceSchemaService = SalesforceSchemaService;
//# sourceMappingURL=salesforce-schema.service.js.map