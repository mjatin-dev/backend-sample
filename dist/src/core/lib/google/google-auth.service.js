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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _GoogleAuthService_oAuth2Client;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthService = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const types_1 = require("../firebase/types");
const types_2 = require("../../types");
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const types_3 = require("./types");
const types_4 = require("../../types");
let GoogleAuthService = class GoogleAuthService {
    constructor(firebase) {
        this.firebase = firebase;
        _GoogleAuthService_oAuth2Client.set(this, void 0);
    }
    getFrontendRedirectUrl(appId) {
        return (0, env_config_1.default)().frontEndUrl + '/d/integration-redirect/' + appId;
    }
    getAppScopes(appId) {
        const scopes = [...types_3.GOOGLE_SCOPES['default'], ...types_3.GOOGLE_SCOPES[appId]];
        return scopes;
    }
    async saveUserSession(authedUser, session) {
        await this.firebase.db
            .collection(types_2.INTEGRATION_SESSION_ID.GOOGLE)
            .doc(String(authedUser.userId))
            .set({
            applicationStatus: session.applicationStatus,
            tokens: JSON.stringify(session.tokens),
            email: session.email,
        });
    }
    async getToken(userId) {
        try {
            const session = await this.getUserSession(userId);
            const tokens = JSON.parse(String(session.tokens));
            return tokens;
        }
        catch (_) {
            return Promise.resolve(null);
        }
    }
    async getUserSession(userId) {
        const getSession = await this.firebase.db
            .collection(types_2.INTEGRATION_SESSION_ID.GOOGLE)
            .doc(String(userId))
            .get();
        return getSession === null || getSession === void 0 ? void 0 : getSession.data();
    }
    get oAuth2Client() {
        const client_id = (0, env_config_1.default)().googleApiClientId;
        const client_secret = (0, env_config_1.default)().googleApiClientSecret;
        const redirect_uri = this.getFrontendRedirectUrl('gmail');
        if (!__classPrivateFieldGet(this, _GoogleAuthService_oAuth2Client, "f")) {
            __classPrivateFieldSet(this, _GoogleAuthService_oAuth2Client, new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uri), "f");
        }
        return __classPrivateFieldGet(this, _GoogleAuthService_oAuth2Client, "f");
    }
    async getAuth(userId, tokens) {
        if (!tokens) {
            tokens = await this.getToken(userId);
        }
        if (!!tokens) {
            this.oAuth2Client.setCredentials(tokens);
            return this.oAuth2Client;
        }
    }
    async authorize(appId, user) {
        console.log('user is: ', user);
        const tokens = await this.getToken(user.userId);
        const scopes = this.getAppScopes(appId);
        if (!tokens) {
            const authUrl = this.oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                include_granted_scopes: true,
                prompt: 'consent',
                state: `${user.userId}@${types_4.AppIds.GMAIL}`,
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            return authUrl;
        }
        this.oAuth2Client.setCredentials(tokens);
        return this.getFrontendRedirectUrl(types_4.AppIds.GMAIL);
    }
    async handleAuthCallback(query, authedUser) {
        var _a;
        const { code, state } = query;
        if (!code || !state)
            throw new common_1.BadRequestException('Invalid query parameters');
        const [userId] = (_a = state.split('@')) !== null && _a !== void 0 ? _a : [];
        console.log('code is:', code);
        console.log('state is:', state);
        try {
            const { tokens } = await this.oAuth2Client.getToken(code);
            console.log('tokens is:', tokens);
            const { email, sub, scopes: grantedScopes, } = await this.oAuth2Client.getTokenInfo(tokens.access_token);
            console.log('email is:', email);
            console.log('sub/userId is:', sub);
            await this.saveUserSession(authedUser, {
                applicationStatus: types_2.APPLICATION_STATUS.INSTALLED,
                tokens: tokens,
                email: email,
            });
            console.log('scope is:', grantedScopes);
        }
        catch (err) {
            throw new common_1.HttpException('error authenticate token', err);
        }
    }
};
_GoogleAuthService_oAuth2Client = new WeakMap();
GoogleAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(types_1.FIREBASE_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object])
], GoogleAuthService);
exports.GoogleAuthService = GoogleAuthService;
//# sourceMappingURL=google-auth.service.js.map