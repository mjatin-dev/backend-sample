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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const http_1 = require("../common/http");
const login_request_dto_1 = require("./dto/login.request.dto");
const change_password_request_dto_1 = require("./dto/change-password.request.dto");
const set_password_request_dto_1 = require("./dto/set-password.request.dto");
const init_password_reset_request_dto_1 = require("./dto/init-password-reset.request.dto");
const check_email_request_dto_1 = require("./dto/check-email.request.dto");
const signup_request_dto_1 = require("./dto/signup.request.dto");
const confirm_password_reset_request_dto_1 = require("./dto/confirm-password-reset.request.dto");
const swagger_1 = require("@nestjs/swagger");
const login_response_dto_1 = require("./dto/login.response.dto");
const set_password_response_dto_1 = require("./dto/set-password.response.dto");
const salesforce_auth_service_1 = require("../core/lib/salesforce/salesforce-auth.service");
const types_1 = require("../user/types");
const user_service_1 = require("../user/services/user.service");
const verify_email_request_dto_1 = require("./dto/verify-email.request.dto");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService, salesforceAuthService, userService) {
        this.authService = authService;
        this.salesforceAuthService = salesforceAuthService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async login(body) {
        try {
            const authSession = await this.authService.authenticateUser(body);
            return new http_1.SuccessResponseObject('Successfully logged in.', authSession);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async integrationLoginRequest(appId) {
        try {
            if (appId === 'salesforce') {
                const authUrl = await this.salesforceAuthService.authenticate();
                return new http_1.SuccessResponseObject('Success.', authUrl);
            }
            return new common_1.BadRequestException('Integration not recognized');
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async integrationLoginResult(appId, body) {
        try {
            if (appId === 'salesforce') {
                const { userInfo, isSandboxOrg, userIdentity } = await this.salesforceAuthService.login(body);
                let user = await this.authService.getUser(userIdentity.email);
                if (!user) {
                    console.log('creating new user on cognito');
                    const data = {
                        userName: userIdentity.username,
                        userEmail: userIdentity.email,
                        userType: types_1.UserType.USER,
                        phoneNumber: userIdentity.mobile_phone,
                        mobileNumber: userIdentity.mobile_phone,
                    };
                    await this.userService.create(data);
                    user = await this.authService.getUser(userIdentity.email);
                }
                console.log('user is:', user);
                const loginSession = await this.authService.authenticateUserCustomFlow({
                    email: userIdentity.email,
                });
                console.log('res is:', loginSession);
                return new http_1.SuccessResponseObject('Success.', loginSession);
            }
            return new common_1.BadRequestException('Integration not recognized');
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async setPassword(body) {
        try {
            const authSession = await this.authService.setNewPassword(body);
            return new http_1.SuccessResponseObject('Successfully logged in.', authSession);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async initPasswordReset(body) {
        try {
            await this.authService.initPasswordReset(body.email);
            return new http_1.SuccessResponseObject('Successfully initiated password reset.');
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async confirmPasswordReset(body) {
        try {
            const authSession = await this.authService.confirmPasswordReset(body.token, body.password);
            return new http_1.SuccessResponseObject('Password successfully changed.', authSession);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async changePassword(body) {
        try {
            await this.authService.changePassword(body);
            return new http_1.SuccessResponseObject('Password successfully changed.');
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkEmail(body) {
        try {
            const res = await this.authService.checkEmailAddress(body);
            return new http_1.SuccessResponseObject('Succes', res);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async verifyEmail(body) {
        try {
            const res = await this.authService.verifyEmail(body);
            console.log('Verified email', res);
            return new http_1.SuccessResponseObject('Succes', res);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async registerUser(body) {
        try {
            const res = await this.authService.registerUser(body);
            return new http_1.SuccessResponseObject('Succes', res);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async resendEmail(body) {
        try {
            const res = await this.authService.resendEmail(body);
            return new http_1.SuccessResponseObject('Succes', res);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async logout(id) {
        try {
            await this.authService.signUserOut(id);
        }
        catch (error) {
            this.logger.error(`Sign user out error. ${error.message}.`, error.stack);
        }
        return new http_1.SuccessResponseObject('Successfully logout.');
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User log in' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully logged in.',
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User integration auth request' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Success.',
        type: String,
    }),
    (0, common_1.Post)('login/integration/:app_id/request'),
    __param(0, (0, common_1.Param)('app_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "integrationLoginRequest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get User integration auth result' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Success.',
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, common_1.Post)('login/integration/:app_id/result'),
    __param(0, (0, common_1.Param)('app_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "integrationLoginResult", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'User create new password and authenticate' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Successfully logged in.',
        type: set_password_response_dto_1.SetPasswordResponseDto,
    }),
    (0, common_1.Post)('set-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_password_request_dto_1.SetPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Initiate password reset' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully initiated password reset.' }),
    (0, common_1.Post)('password-reset/init'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [init_password_reset_request_dto_1.InitPasswordResetRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "initPasswordReset", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Confirm password reset and authenticate' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Password successfully changed.',
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, common_1.Post)('password-reset/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_password_reset_request_dto_1.ConfirmPasswordResetDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPasswordReset", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Change user password' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Password successfully changed.' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_request_dto_1.ChangePasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('check-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_email_request_dto_1.CheckEmailRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_request_dto_1.VerifyRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_request_dto_1.SignUpRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('resend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_email_request_dto_1.CheckEmailRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Log user out' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully logout.' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('logout/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        salesforce_auth_service_1.SalesforceAuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map