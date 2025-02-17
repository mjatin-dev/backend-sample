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
var _SalesforceAuthService_oAuth2Client, _SalesforceAuthService_oAuth2SandboxClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceAuthService = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const integration_repository_1 = require("../../../integration/integration.repository");
const integrationState_repository_1 = require("../../../integration/integrationState.repository");
const common_1 = require("@nestjs/common");
const jsforce_1 = require("jsforce");
const types_1 = require("../../types");
const kms_manager_service_1 = require("../aws/kms/kms-manager.service");
const integration_service_1 = require("../../../integration/integration.service");
const allowedAdminRoles = ['System Administrator', 'Delegated Admin'];
let SalesforceAuthService = class SalesforceAuthService {
    constructor(integrationRepository, integrationStateRepository, kmsManagerService, integrationService) {
        this.integrationRepository = integrationRepository;
        this.integrationStateRepository = integrationStateRepository;
        this.kmsManagerService = kmsManagerService;
        this.integrationService = integrationService;
        _SalesforceAuthService_oAuth2Client.set(this, void 0);
        _SalesforceAuthService_oAuth2SandboxClient.set(this, void 0);
        this.validateIntegrationRoleRequirements = async (connection, AppId) => {
            const userIdentity = await connection.identity();
            const userQuery = await connection.query(`SELECT Id, ProfileId FROM User WHERE Id = '${userIdentity.user_id}' limit 1`);
            const userRecord = userQuery
                .records[0];
            if (!userRecord) {
                throw new common_1.NotFoundException('User not found');
            }
            const profileQuery = await connection.query(`SELECT Id, Name FROM Profile WHERE Id = '${userRecord.ProfileId}' limit 1`);
            const profileRecord = profileQuery
                .records[0];
            if (!profileRecord) {
                throw new common_1.NotFoundException('Profile not found');
            }
            if (AppId === types_1.AppIds.SALESFORCE &&
                !allowedAdminRoles.includes(profileRecord.Name)) {
                throw new common_1.UnauthorizedException('You must be a System Administrator to integrate with Salesforce');
            }
            return { profileRecord, userRecord, userIdentity };
        };
        this.verifyCodeAndGetConnection = async (code) => {
            let isSandboxOrg = false;
            let conn = new jsforce_1.Connection({
                oauth2: this.oAuth2Client,
            });
            let userInfo;
            try {
                userInfo = await conn.authorize(code);
            }
            catch (err) {
                try {
                    conn = new jsforce_1.Connection({
                        oauth2: this.oAuth2SandboxClient,
                    });
                    userInfo = await conn.authorize(code);
                    isSandboxOrg = true;
                    console.log('is sandbox account');
                }
                catch (err) {
                    console.log('authorized err:', err);
                    throw err;
                }
            }
            const conn2 = new jsforce_1.Connection({
                oauth2: isSandboxOrg ? __classPrivateFieldGet(this, _SalesforceAuthService_oAuth2SandboxClient, "f") : this.oAuth2Client,
                instanceUrl: conn.instanceUrl,
                accessToken: conn.accessToken,
                refreshToken: conn.refreshToken,
            });
            return { connection: conn2, userInfo, isSandboxOrg };
        };
        this.encryptToken = async (token) => {
            return this.kmsManagerService.encrypt((0, env_config_1.default)().integrationSessionKmsKeyId, token);
        };
    }
    getFrontendRedirectUrl() {
        return (0, env_config_1.default)().frontEndUrl + '/d/integration-redirect/' + types_1.AppIds.SALESFORCE;
    }
    async getIntegrationData(AppId, option) {
        var _a, _b;
        const { tenantId, userId } = option;
        if (tenantId) {
            const integration = await this.integrationRepository.getOneIntegrationWithStateByTenant(tenantId, AppId);
            const integrationState = (_a = integration === null || integration === void 0 ? void 0 : integration.integratedApps) === null || _a === void 0 ? void 0 : _a.find((app) => app.tenantId === tenantId);
            return { integration, integrationState };
        }
        else {
            const integration = await this.integrationRepository.getOneIntegrationWithStateByUser(userId, AppId);
            const integrationState = (_b = integration === null || integration === void 0 ? void 0 : integration.integratedApps) === null || _b === void 0 ? void 0 : _b.find((app) => app.userId === userId);
            return { integration, integrationState };
        }
    }
    async saveUserSession(AppId, authedUser, session) {
        const queryOption = AppId === types_1.AppIds.SALESFORCE
            ? { tenantId: authedUser.tenantId }
            : { userId: authedUser.userId };
        const { integration, integrationState } = await this.getIntegrationData(AppId, queryOption);
        if (integrationState) {
            await this.integrationStateRepository.update(integrationState.id, {
                session,
            });
            return;
        }
        await this.integrationStateRepository.insert(Object.assign(Object.assign({}, queryOption), { integration,
            session }));
    }
    get oAuth2Client() {
        if (!__classPrivateFieldGet(this, _SalesforceAuthService_oAuth2Client, "f")) {
            __classPrivateFieldSet(this, _SalesforceAuthService_oAuth2Client, new jsforce_1.OAuth2({
                clientId: (0, env_config_1.default)().salesforceConsumerKey,
                clientSecret: (0, env_config_1.default)().salesforceConsumerSecret,
                redirectUri: this.getFrontendRedirectUrl(),
            }), "f");
        }
        return __classPrivateFieldGet(this, _SalesforceAuthService_oAuth2Client, "f");
    }
    get oAuth2SandboxClient() {
        if (!__classPrivateFieldGet(this, _SalesforceAuthService_oAuth2SandboxClient, "f")) {
            __classPrivateFieldSet(this, _SalesforceAuthService_oAuth2SandboxClient, new jsforce_1.OAuth2({
                clientId: (0, env_config_1.default)().salesforceConsumerKey,
                clientSecret: (0, env_config_1.default)().salesforceConsumerSecret,
                redirectUri: this.getFrontendRedirectUrl(),
                loginUrl: 'https://test.salesforce.com',
            }), "f");
        }
        return __classPrivateFieldGet(this, _SalesforceAuthService_oAuth2SandboxClient, "f");
    }
    async authorize(authedUser, optionalArgs) {
        var _a;
        const { integrationState } = await this.getIntegrationData(types_1.AppIds.SALESFORCE, { tenantId: authedUser.tenantId });
        const scopes = this.getAppScopes();
        if (!((_a = integrationState === null || integrationState === void 0 ? void 0 : integrationState.session) === null || _a === void 0 ? void 0 : _a.tokens)) {
            let authUrl = '';
            if (optionalArgs.env === 'test') {
                authUrl = this.oAuth2SandboxClient.getAuthorizationUrl({
                    scope: scopes.join(' '),
                    state: `${authedUser.userId}@${types_1.AppIds.SALESFORCE}`,
                });
            }
            else {
                authUrl = this.oAuth2Client.getAuthorizationUrl({
                    scope: scopes.join(' '),
                    state: `${authedUser.userId}@${types_1.AppIds.SALESFORCE}`,
                });
            }
            console.log('Authorize this app by visiting this url:', authUrl);
            return authUrl;
        }
        return this.getFrontendRedirectUrl();
    }
    async authorizeUserIntegration(authedUser, optionalArgs) {
        var _a;
        console.log({ optionalArgs });
        const { integrationState } = await this.getIntegrationData(types_1.AppIds.SALESFORCE_USER, { userId: authedUser.userId });
        const scopes = this.getAppScopes();
        if (!((_a = integrationState === null || integrationState === void 0 ? void 0 : integrationState.session) === null || _a === void 0 ? void 0 : _a.tokens)) {
            let authUrl = '';
            if (optionalArgs.env === 'test') {
                authUrl = this.oAuth2SandboxClient.getAuthorizationUrl({
                    scope: scopes.join(' '),
                    state: `${authedUser.userId}@${types_1.AppIds.SALESFORCE_USER}`,
                });
            }
            else {
                authUrl = this.oAuth2Client.getAuthorizationUrl({
                    scope: scopes.join(' '),
                    state: `${authedUser.userId}@${types_1.AppIds.SALESFORCE_USER}`,
                });
            }
            console.log('Authorize this app by visiting this url:', authUrl);
            return authUrl;
        }
        return this.getFrontendRedirectUrl();
    }
    async authenticate() {
        const scopes = this.getAppScopes().join(' ');
        const authUrl = this.oAuth2Client.getAuthorizationUrl({
            scope: scopes,
            state: `{"app": "${types_1.AppIds.SALESFORCE}", "action": "login"}`,
        });
        console.log('Authenticate with Salesforce using this url:::', authUrl);
        return authUrl;
    }
    async login(body) {
        try {
            const { code } = body;
            const { connection, userInfo, isSandboxOrg } = await this.verifyCodeAndGetConnection(code);
            const userIdentity = await connection.identity();
            if (!userIdentity.email_verified || !userIdentity.asserted_user) {
                throw new common_1.HttpException('Email is not verified', 400);
            }
            return { userInfo, isSandboxOrg, userIdentity };
        }
        catch (err) {
            throw new common_1.HttpException(`Error integration login ${err.message}`, err);
        }
    }
    getAppScopes() {
        return [
            'id',
            'profile',
            'email',
            'address',
            'phone',
            'api',
            'web',
            'refresh_token',
            'offline_access',
            'openid',
            'custom_permissions',
            'wave_api',
            'content',
            'cdp_ingest_api',
            'cdp_profile_api',
            'cdp_query_api',
            'cdp_segment_api',
        ];
    }
    async handleAuthCallback(query, AppId, authedUser) {
        const { code, state } = query;
        const userId = Number(state === null || state === void 0 ? void 0 : state.split('@')[0]);
        if (isNaN(userId))
            return;
        const { connection, isSandboxOrg, userInfo } = await this.verifyCodeAndGetConnection(code);
        const { userIdentity } = await this.validateIntegrationRoleRequirements(connection, AppId);
        const accessTokenEncrypted = await this.encryptToken(connection.accessToken);
        const refreshTokenEncrypted = await this.encryptToken(connection.refreshToken);
        const orgName = connection.instanceUrl.split('.')[0].split('//')[1];
        const { tenantId: createdTenantId } = await this.integrationService.upgradeUserToTenantOwner(authedUser.userId, {
            addressState: userIdentity.addr_state || '',
            city: userIdentity.addr_city || '',
            country: userIdentity.addr_country || '',
            email: userIdentity.email || '',
            mobileNumber: userIdentity.mobile_phone || '',
            phoneNumber: userIdentity.mobile_phone || '',
            street: userIdentity.addr_street || '',
            zip: userIdentity.addr_zip || '',
        }, orgName);
        const saveIntegrationOptions = Object.assign({}, authedUser);
        if (!saveIntegrationOptions.tenantId) {
            saveIntegrationOptions.tenantId = createdTenantId;
        }
        await this.saveUserSession(AppId, saveIntegrationOptions, {
            tokens: {
                accessToken: accessTokenEncrypted,
                refreshToken: refreshTokenEncrypted,
                instanceUrl: connection.instanceUrl,
            },
            email: userIdentity.email,
            accounId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.id,
            meta: {
                orgName,
                userIdentity,
                userInfo,
                loginUrl: connection.oauth2.loginUrl,
                isSandboxOrg,
            },
        });
    }
};
_SalesforceAuthService_oAuth2Client = new WeakMap(), _SalesforceAuthService_oAuth2SandboxClient = new WeakMap();
SalesforceAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [integration_repository_1.IntegrationRepository,
        integrationState_repository_1.IntegrationStateRepository,
        kms_manager_service_1.KmsManagerService,
        integration_service_1.IntegrationService])
], SalesforceAuthService);
exports.SalesforceAuthService = SalesforceAuthService;
//# sourceMappingURL=salesforce-auth.service.js.map