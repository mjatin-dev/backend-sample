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
var _SalesforceMergeService_oAuth2Client, _SalesforceMergeService_oAuth2SandboxClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceMergeService = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const integration_repository_1 = require("../../../integration/integration.repository");
const integrationState_repository_1 = require("../../../integration/integrationState.repository");
const common_1 = require("@nestjs/common");
const types_1 = require("../../types");
const kms_manager_service_1 = require("../aws/kms/kms-manager.service");
const jsforce_1 = require("jsforce");
let SalesforceMergeService = class SalesforceMergeService {
    constructor(integrationRepository, integrationStateRepository, kmsManagerService) {
        this.integrationRepository = integrationRepository;
        this.integrationStateRepository = integrationStateRepository;
        this.kmsManagerService = kmsManagerService;
        _SalesforceMergeService_oAuth2Client.set(this, void 0);
        _SalesforceMergeService_oAuth2SandboxClient.set(this, void 0);
    }
    get oAuth2Client() {
        if (!__classPrivateFieldGet(this, _SalesforceMergeService_oAuth2Client, "f")) {
            __classPrivateFieldSet(this, _SalesforceMergeService_oAuth2Client, new jsforce_1.OAuth2({
                clientId: (0, env_config_1.default)().salesforceConsumerKey,
                clientSecret: (0, env_config_1.default)().salesforceConsumerSecret,
                redirectUri: this.getFrontendRedirectUrl(),
            }), "f");
        }
        return __classPrivateFieldGet(this, _SalesforceMergeService_oAuth2Client, "f");
    }
    get oAuth2SandboxClient() {
        if (!__classPrivateFieldGet(this, _SalesforceMergeService_oAuth2SandboxClient, "f")) {
            __classPrivateFieldSet(this, _SalesforceMergeService_oAuth2SandboxClient, new jsforce_1.OAuth2({
                clientId: (0, env_config_1.default)().salesforceConsumerKey,
                clientSecret: (0, env_config_1.default)().salesforceConsumerSecret,
                redirectUri: this.getFrontendRedirectUrl(),
                loginUrl: 'https://test.salesforce.com',
            }), "f");
        }
        return __classPrivateFieldGet(this, _SalesforceMergeService_oAuth2SandboxClient, "f");
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
    async mergeRecords(authedUser, masterRecordId, duplicateRecordIds, overWriteValues, objectType) {
        var _a, _b, _c, _d, _e;
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
            oauth2: isSandboxOrg ? __classPrivateFieldGet(this, _SalesforceMergeService_oAuth2SandboxClient, "f") : this.oAuth2Client,
            version: '59.0',
        });
        conn.on('refresh', async (accessToken, res) => {
            const { integrationState } = await this.getIntegrationData(authedUser.tenantId);
            const session = integrationState.session;
            const tokens = session.tokens;
            tokens.accessToken = await this.kmsManagerService.encrypt((0, env_config_1.default)().integrationSessionKmsKeyId, accessToken);
            await this.integrationStateRepository.update(integrationState.id, integrationState);
        });
        if (overWriteValues && Object.keys(overWriteValues).length > 0) {
            const updateRes = await conn
                .sobject(objectType)
                .update(Object.assign({ Id: masterRecordId }, overWriteValues));
            if (updateRes.success !== true) {
                throw new common_1.HttpException('Error while updating the master record', 500);
            }
        }
        const mergeRes = await this.executeMergeProcess(masterRecordId, duplicateRecordIds, objectType, conn);
        console.log('Merge response', JSON.stringify(mergeRes, null, 2));
        const mergeSuccess = ((_e = (_d = (_c = (_b = mergeRes['soapenv:Envelope']) === null || _b === void 0 ? void 0 : _b['soapenv:Body']) === null || _c === void 0 ? void 0 : _c['mergeResponse']) === null || _d === void 0 ? void 0 : _d['result']) === null || _e === void 0 ? void 0 : _e['success']) || false;
        if (mergeSuccess != true && mergeSuccess != 'true') {
            throw new common_1.HttpException('Error while merging the records', 500);
        }
    }
    executeMergeProcess(masterRecordId, duplicateRecordIds, objectType, conn) {
        const mergeRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:partner.soap.sforce.com" xmlns:urn1="urn:sobject.partner.soap.sforce.com">
    <soapenv:Header>
       <urn:SessionHeader>
          <urn:sessionId>${conn.accessToken}</urn:sessionId>
       </urn:SessionHeader>
    </soapenv:Header>
    <soapenv:Body>
       <urn:merge>
          <urn:request>
             <urn:masterRecord>
                <urn1:type>${objectType}</urn1:type>
                <urn1:Id>${masterRecordId}</urn1:Id>
             </urn:masterRecord>
             <urn:recordToMergeIds>${duplicateRecordIds.join('</urn:recordToMergeIds><urn:recordToMergeIds>')}</urn:recordToMergeIds>
          </urn:request>
       </urn:merge>
    </soapenv:Body>
 </soapenv:Envelope>`;
        return conn.request({
            method: 'POST',
            url: '/services/Soap/u/59.0',
            body: mergeRequest,
            headers: {
                'Content-Type': 'text/xml',
                SOAPAction: 'merge',
            },
        });
    }
};
_SalesforceMergeService_oAuth2Client = new WeakMap(), _SalesforceMergeService_oAuth2SandboxClient = new WeakMap();
SalesforceMergeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [integration_repository_1.IntegrationRepository,
        integrationState_repository_1.IntegrationStateRepository,
        kms_manager_service_1.KmsManagerService])
], SalesforceMergeService);
exports.SalesforceMergeService = SalesforceMergeService;
//# sourceMappingURL=salesforce-merge.service.js.map