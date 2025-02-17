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
exports.AccountTypeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const accountType_service_1 = require("../services/accountType.service");
const create_accountType_request_dto_1 = require("../dto/accountType/create-accountType.request.dto");
const update_accountType_request_dto_1 = require("../dto/accountType/update-accountType.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const accountType_response_dto_1 = require("../dto/accountType/accountType.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let AccountTypeController = class AccountTypeController {
    constructor(accountTypeService) {
        this.accountTypeService = accountTypeService;
    }
    async createAccountType(authedUser, body) {
        try {
            const accountType = await this.accountTypeService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountType created successfully!', accountType);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateAccountType(authedUser, id, body) {
        try {
            const accountType = await this.accountTypeService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountType updated successfully!', accountType);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountTypes(authedUser) {
        try {
            const accountTypes = await this.accountTypeService.findAll();
            return new http_1.SuccessResponseObject('AccountTypes fetched successfully!', accountTypes);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountType(authedUser, id) {
        try {
            const accountType = await this.accountTypeService.findOne(id);
            return new http_1.SuccessResponseObject('AccountType fetched successfully!', accountType);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteAccountType(authedUser, id) {
        try {
            await this.accountTypeService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountType successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create accountType' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'AccountType created successfully!',
        type: accountType_response_dto_1.AccountTypeResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_accountType_request_dto_1.CreateAccountTypeRequestDto]),
    __metadata("design:returntype", Promise)
], AccountTypeController.prototype, "createAccountType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update accountType by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'AccountType updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_accountType_request_dto_1.UpdateAccountTypeRequestDto]),
    __metadata("design:returntype", Promise)
], AccountTypeController.prototype, "updateAccountType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all accountTypes' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'AccountTypes fetched successfully!',
        type: [accountType_response_dto_1.AccountTypeResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountTypeController.prototype, "getAccountTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get accountType by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'AccountType fetched successfully!',
        type: accountType_response_dto_1.AccountTypeResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountTypeController.prototype, "getAccountType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete accountType by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'AccountType successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountTypeController.prototype, "deleteAccountType", null);
AccountTypeController = __decorate([
    (0, swagger_1.ApiTags)('AccountType'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('accountType'),
    __metadata("design:paramtypes", [accountType_service_1.AccountTypeService])
], AccountTypeController);
exports.AccountTypeController = AccountTypeController;
//# sourceMappingURL=accountType.controller.js.map