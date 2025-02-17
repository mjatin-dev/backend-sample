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
exports.AccountController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const account_service_1 = require("../services/account.service");
const create_account_request_dto_1 = require("../dto/account/create-account.request.dto");
const update_account_request_dto_1 = require("../dto/account/update-account.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const account_response_dto_1 = require("../dto/account/account.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async createAccount(authedUser, body) {
        try {
            const account = await this.accountService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Account created successfully!', account);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateAccount(authedUser, id, body) {
        try {
            const account = await this.accountService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Account updated successfully!', account);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccounts(authedUser) {
        try {
            const accounts = await this.accountService.findAll(authedUser.userId);
            return new http_1.SuccessResponseObject('Accounts fetched successfully!', accounts);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccount(authedUser, id) {
        try {
            const account = await this.accountService.findOne(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Account fetched successfully!', account);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteAccount(authedUser, id) {
        try {
            await this.accountService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Account successfully deleted!');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create account' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Account created successfully!',
        type: account_response_dto_1.AccountResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_account_request_dto_1.CreateAccountRequestDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update account by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Account updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_account_request_dto_1.UpdateAccountRequestDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all accounts' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Accounts fetched successfully!',
        type: [account_response_dto_1.AccountResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccounts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get account by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Account fetched successfully!',
        type: account_response_dto_1.AccountResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete account by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Account successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deleteAccount", null);
AccountController = __decorate([
    (0, swagger_1.ApiTags)('Account'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map