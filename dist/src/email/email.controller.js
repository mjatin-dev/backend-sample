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
exports.EmailController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const create_email_request_dto_1 = require("./dto/create-email.request.dto");
const http_1 = require("../common/http");
const email_response_dto_1 = require("./dto/email.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async createEmail(authedUser, body) {
        try {
            const email = await this.emailService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Email created successfully!', email);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getEmails(authedUser) {
        try {
            const emails = await this.emailService.findAll();
            return new http_1.SuccessResponseObject('Emails fetched successfully!', emails);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getEmail(authedUser, id) {
        try {
            const email = await this.emailService.findOne(id);
            return new http_1.SuccessResponseObject('Email fetched successfully!', email);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteEmail(authedUser, id) {
        try {
            await this.emailService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Email successfully deleted!');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getGmailAccount(authedUser) {
        const account = await this.emailService.getGmailAccount(Number(authedUser.userId));
        return new http_1.SuccessResponseObject('Email fetched successfully!', account);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create email' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Email created successfully!',
        type: email_response_dto_1.EmailResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_email_request_dto_1.CreateEmailRequestDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "createEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all emails' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Emails fetched successfully!',
        type: [email_response_dto_1.EmailResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getEmails", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get email by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Email fetched successfully!',
        type: email_response_dto_1.EmailResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete email by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Email successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "deleteEmail", null);
__decorate([
    (0, common_1.Get)('gmail/account'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getGmailAccount", null);
EmailController = __decorate([
    (0, swagger_1.ApiTags)('Email'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
exports.EmailController = EmailController;
//# sourceMappingURL=email.controller.js.map