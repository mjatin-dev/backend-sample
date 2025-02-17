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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailController = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../../../auth/decorators/authed-user.decorator");
const http_1 = require("../../../common/http");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const gmail_service_1 = require("./gmail.service");
let GmailController = class GmailController {
    constructor(gmailService) {
        this.gmailService = gmailService;
    }
    async status(authedUser) {
        const result = await this.gmailService.getStatus(authedUser.userId);
        return new http_1.SuccessResponseObject('success', result);
    }
    async getAuthenticatedEmail(authedUser) {
        const result = await this.gmailService.getAccount(authedUser.userId);
        return new http_1.SuccessResponseObject('success', result);
    }
    async createLabel(authedUser, body) {
        const result = await this.gmailService.createLabel(authedUser.userId, body.labelName);
        return new http_1.SuccessResponseObject('success', result);
    }
    async watch(authedUser) {
        const result = await this.gmailService.watchInbox(authedUser.userId);
        return new http_1.SuccessResponseObject('success', result);
    }
    async list(authedUser) {
        const result = await this.gmailService.threads(authedUser.userId);
        return new http_1.SuccessResponseObject('success', result);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('status'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GmailController.prototype, "status", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('account'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GmailController.prototype, "getAuthenticatedEmail", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('label'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GmailController.prototype, "createLabel", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('watch'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GmailController.prototype, "watch", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('threads'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GmailController.prototype, "list", null);
GmailController = __decorate([
    (0, common_1.Controller)('gmail'),
    __metadata("design:paramtypes", [gmail_service_1.GmailService])
], GmailController);
exports.GmailController = GmailController;
//# sourceMappingURL=gmail.controller.js.map