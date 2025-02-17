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
exports.GmailService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const mail_composer_1 = __importDefault(require("nodemailer/lib/mail-composer"));
const google_auth_service_1 = require("./google-auth.service");
let GmailService = class GmailService {
    constructor(authService) {
        this.authService = authService;
    }
    async getAuthClient(ownerId) {
        return await this.authService.getAuth(ownerId);
    }
    getAuthUserId() {
        return 'me';
    }
    async getGmailApi(ownerId) {
        const auth = await this.getAuthClient(ownerId);
        if (!!auth) {
            const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
            return gmail;
        }
    }
    encodeMessage(message) {
        return Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
    async createMessage(options) {
        const mailComposer = new mail_composer_1.default(options);
        const message = await mailComposer.compile().build();
        return this.encodeMessage(message);
    }
    async getAccount(ownerId) {
        const session = await this.authService.getUserSession(ownerId);
        return session === null || session === void 0 ? void 0 : session.email;
    }
    async getStatus(ownerId) {
        const session = await this.authService.getUserSession(ownerId);
        return !!session;
    }
    async sendEmail(ownerId, options) {
        const gmailApi = await this.getGmailApi(ownerId);
        if (!!gmailApi) {
            const rawMessage = await this.createMessage(options);
            const customerCityLabel = await this.getOrCreateCustomerCityLabel(ownerId);
            const result = await gmailApi.users.messages.send({
                userId: this.getAuthUserId(),
                requestBody: {
                    raw: rawMessage,
                },
            });
            const { id, threadId, labelIds } = result.data;
            const labelResult = await gmailApi.users.messages.modify({
                id,
                userId: 'me',
                requestBody: {
                    addLabelIds: [customerCityLabel],
                },
            });
            console.log('SEND EMAIL RESULT:', id, threadId, labelIds);
            console.log('SET LABEL EMAIL RESULT:', labelResult.data);
            return result.data;
        }
    }
    async createLabel(ownerId, labelName) {
        console.log('==== CREATE EMAIL LABEL ===', labelName);
        const gmailApi = await this.getGmailApi(ownerId);
        if (!gmailApi)
            return;
        const res = await gmailApi.users.labels.create({
            userId: 'me',
            requestBody: {
                name: labelName,
                labelListVisibility: 'labelShow',
                messageListVisibility: 'show',
            },
        });
        return res.data;
    }
    async getOrCreateCustomerCityLabel(ownerId, labelName) {
        const newLabelName = labelName || 'CustomerCity';
        const gmailApi = await this.getGmailApi(ownerId);
        if (!gmailApi)
            return;
        const res = await gmailApi.users.labels.list({
            userId: 'me',
        });
        const { data: { labels }, } = res;
        let label = labels === null || labels === void 0 ? void 0 : labels.find((label) => label.name === newLabelName);
        console.log('==== EMAIL LABEL ===', labels, label);
        if (!label) {
            const res = await this.createLabel(ownerId, newLabelName);
            label = res;
        }
        return label.id;
    }
    async watchInbox(ownerId) {
        const gmailApi = await this.getGmailApi(ownerId);
        if (!gmailApi)
            return;
        const customerCityLabel = await this.getOrCreateCustomerCityLabel(ownerId);
        await gmailApi.users.stop({
            userId: 'me',
        });
        const result = await gmailApi.users.watch({
            userId: 'me',
            requestBody: {
                labelIds: [customerCityLabel],
                topicName: 'projects/essential-text-356818/topics/GmailNotif',
                labelFilterAction: 'include',
            },
        });
        return result.data;
    }
    async threads(ownerId) {
        var _a, _b;
        const gmailApi = await this.getGmailApi(ownerId);
        if (!gmailApi)
            return;
        const customerCityLabel = await this.getOrCreateCustomerCityLabel(ownerId);
        const threads = await gmailApi.users.threads.list({
            includeSpamTrash: true,
            labelIds: [customerCityLabel],
            userId: 'me',
        });
        console.log('==== THREADS ====', threads);
        const getMessages = (_b = (_a = threads === null || threads === void 0 ? void 0 : threads.data) === null || _a === void 0 ? void 0 : _a.threads) === null || _b === void 0 ? void 0 : _b.map(async (thread) => {
            return await gmailApi.users.threads
                .get({
                userId: 'me',
                id: thread.id,
            })
                .then((resp) => resp.data);
        });
        const result = getMessages ? await Promise.all(getMessages) : [];
        return result === null || result === void 0 ? void 0 : result.flat();
    }
};
GmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [google_auth_service_1.GoogleAuthService])
], GmailService);
exports.GmailService = GmailService;
//# sourceMappingURL=gmail.service.js.map