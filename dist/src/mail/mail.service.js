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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const env_config_1 = __importDefault(require("../config/env.config"));
let MailService = class MailService {
    constructor() {
        mail_1.default.setApiKey((0, env_config_1.default)().sendgridApiKey);
    }
    async sendEmail(mailData) {
        await mail_1.default.send(Object.assign(Object.assign({}, mailData), { from: mailData.from
                ? `<${mailData.from}>`
                : `<hello@${(0, env_config_1.default)().sendgridSendingDomain}>` }));
    }
    async sendHtmlEmail(mailData) {
        await mail_1.default.send(Object.assign(Object.assign({}, mailData), { from: mailData.from
                ? `<${mailData.from}>`
                : `<hello@${(0, env_config_1.default)().sendgridSendingDomain}>` }));
    }
    async sendWelcomeEmail(to, data, from) {
        await this.sendEmail({
            to,
            from,
            templateId: 'd-a506f06454614faab4fb1ebde6060af9',
            dynamicTemplateData: data,
        });
    }
    async sendVerificationEmail(to, htmlContent, from) {
        await this.sendHtmlEmail({
            to,
            from,
            text: htmlContent,
            html: htmlContent,
            subject: 'Please Verify Your Email Address'
        });
    }
    async sendPasswordResetEmail(to, data, from) {
        await this.sendEmail({
            to,
            from,
            templateId: 'd-9770504226ca4f4ca886634de7c43e13',
            dynamicTemplateData: data,
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map