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
exports.IntegrationController = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const http_1 = require("../common/http");
const types_1 = require("../core/types");
const types_2 = require("../user/types");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const integration_service_1 = require("./integration.service");
let IntegrationController = class IntegrationController {
    constructor(integrationService) {
        this.integrationService = integrationService;
    }
    async list(authedUser) {
        const integrations = await this.integrationService.getIntegrationsApps(authedUser.userId, authedUser.tenantId);
        return new http_1.SuccessResponseObject('success', integrations);
    }
    async getIntegration(authedUser, appId) {
        const integration = await this.integrationService.getIntegrationWithInstallStatus(appId, authedUser.userId, authedUser.tenantId);
        return new http_1.SuccessResponseObject('success', integration);
    }
    async authorize(authedUser, appId, optionalArgs) {
        return this.integrationService.handleAuthorize(authedUser, appId, optionalArgs);
    }
    async uninstall(authedUser, appId) {
        await this.validateAuthorization(authedUser, appId);
        const result = await this.integrationService.uninstall(appId, authedUser.userId, authedUser.tenantId);
        return new http_1.SuccessResponseObject('success', result);
    }
    async handleAuthCallback(authedUser, appId, query) {
        try {
            await this.integrationService.handleAuthCallBack(authedUser, appId, query);
            return new http_1.SuccessResponseObject('success auth');
        }
        catch (e) {
            console.log(e);
            if (e instanceof common_1.HttpException) {
                throw e;
            }
            else {
                throw new common_1.UnauthorizedException('Failed to authenticate');
            }
        }
    }
    async validateAuthorization(authedUser, appId) {
        const integration = await this.integrationService.getIntegration(appId);
        if (integration.type === types_1.IntegrationType.TENANT &&
            authedUser.userType === types_2.UserType.USER) {
            throw new common_1.UnauthorizedException('You are not authorized to update tenant level integrations');
        }
        return integration;
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "list", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(':appId'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "getIntegration", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(':appId/authorize'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('appId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "authorize", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':appId/uninstall'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "uninstall", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('callback/:appId'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('appId')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "handleAuthCallback", null);
IntegrationController = __decorate([
    (0, common_1.Controller)('integration'),
    __metadata("design:paramtypes", [integration_service_1.IntegrationService])
], IntegrationController);
exports.IntegrationController = IntegrationController;
//# sourceMappingURL=integration.controller.js.map