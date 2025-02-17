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
exports.Office365Service = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const common_1 = require("@nestjs/common");
const types_1 = require("../../types");
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
const kms_manager_service_1 = require("../aws/kms/kms-manager.service");
const integration_repository_1 = require("../../../integration/integration.repository");
const integrationState_repository_1 = require("../../../integration/integrationState.repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let Office365Service = class Office365Service {
    constructor(kmsManagerService, integrationRepository, integrationStateRepository) {
        this.kmsManagerService = kmsManagerService;
        this.integrationRepository = integrationRepository;
        this.integrationStateRepository = integrationStateRepository;
        this.getTokenByCode = async (code) => {
            const params = new URLSearchParams();
            params.append('client_id', (0, env_config_1.default)().msAppId);
            params.append('scope', this.getScope().join(' '));
            params.append('code', code);
            params.append('redirect_uri', this.getFrontendRedirectUrl());
            params.append('grant_type', 'authorization_code');
            params.append('client_secret', (0, env_config_1.default)().msClientSecret);
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            const res = await axios_1.default.post(`https://login.microsoftonline.com/${(0, env_config_1.default)().msTenantId}/oauth2/v2.0/token`, params, config);
            return res.data;
        };
        this.encryptToken = async (token) => {
            return this.kmsManagerService.encrypt((0, env_config_1.default)().integrationSessionKmsKeyId, token);
        };
    }
    async handleAuthCallback(query, authedUser) {
        const { code } = query;
        const data = await this.getTokenByCode(code);
        const idTokenPayload = jsonwebtoken_1.default.decode(data.id_token);
        const { email } = idTokenPayload;
        const session = {
            email,
            tokens: {
                accessToken: await this.encryptToken(data.access_token),
                refreshToken: await this.encryptToken(data.refresh_token),
                tokenType: data.token_type,
                expiresIn: data.expires_in,
                extExpiresIn: data.ext_expires_in,
                idToken: data.id_token,
            },
            meta: Object.assign({}, idTokenPayload),
        };
        await this.saveUserSession(types_1.AppIds.OFFICE365, authedUser, session);
    }
    async authorize(authedUser) {
        const params = {
            client_id: (0, env_config_1.default)().msAppId,
            response_type: 'code',
            redirect_uri: this.getFrontendRedirectUrl(),
            scope: this.getScope().join(' '),
            state: `${authedUser.userId}@${authedUser.tenantId}`,
        };
        const url = new URL(`https://login.microsoftonline.com/${(0, env_config_1.default)().msTenantId}/oauth2/v2.0/authorize?${qs_1.default.stringify(params)}`);
        return url.toString();
    }
    getFrontendRedirectUrl() {
        return (0, env_config_1.default)().frontEndUrl + '/d/integration-redirect/' + types_1.AppIds.OFFICE365;
    }
    getScope() {
        return [
            'Bookings.ReadWrite.All',
            'Calendars.ReadWrite',
            'Calendars.ReadWrite.Shared',
            'Contacts.ReadWrite',
            'email',
            'Mail.ReadWrite.Shared',
            'Mail.Send',
            'Mail.Send.Shared',
            'MailboxFolder.ReadWrite',
            'MailboxItem.Read',
            'MailboxSettings.ReadWrite',
            'Notes.ReadWrite.All',
            'offline_access',
            'OnlineMeetings.ReadWrite',
            'openid',
            'profile',
            'Tasks.ReadWrite',
            'Tasks.ReadWrite.Shared',
            'User.Read',
        ];
    }
    async saveUserSession(AppId, authedUser, session) {
        const queryOption = { userId: authedUser.userId };
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
};
Office365Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kms_manager_service_1.KmsManagerService,
        integration_repository_1.IntegrationRepository,
        integrationState_repository_1.IntegrationStateRepository])
], Office365Service);
exports.Office365Service = Office365Service;
//# sourceMappingURL=office365.service.js.map