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
exports.AccountStageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const accountStage_service_1 = require("../services/accountStage.service");
const create_accountStage_request_dto_1 = require("../dto/accountStage/create-accountStage.request.dto");
const update_accountStage_request_dto_1 = require("../dto/accountStage/update-accountStage.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const accountStage_response_dto_1 = require("../dto/accountStage/accountStage.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let AccountStageController = class AccountStageController {
    constructor(accountStageService) {
        this.accountStageService = accountStageService;
    }
    async createAccountStage(authedUser, body) {
        try {
            const accountStage = await this.accountStageService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountStage created successfully!', accountStage);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateAccountStage(authedUser, id, body) {
        try {
            const accountStage = await this.accountStageService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountStage updated successfully!', accountStage);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountStages(authedUser) {
        try {
            const accountStages = await this.accountStageService.findAll();
            return new http_1.SuccessResponseObject('AccountStages fetched successfully!', accountStages);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountStage(authedUser, id) {
        try {
            const accountStage = await this.accountStageService.findOne(id);
            return new http_1.SuccessResponseObject('AccountStage fetched successfully!', accountStage);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteAccountStage(authedUser, id) {
        try {
            await this.accountStageService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountStage successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create accountStage' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'AccountStage created successfully!',
        type: accountStage_response_dto_1.AccountStageResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_accountStage_request_dto_1.CreateAccountStageRequestDto]),
    __metadata("design:returntype", Promise)
], AccountStageController.prototype, "createAccountStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update accountStage by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'AccountStage updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_accountStage_request_dto_1.UpdateAccountStageRequestDto]),
    __metadata("design:returntype", Promise)
], AccountStageController.prototype, "updateAccountStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all accountStages' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'AccountStages fetched successfully!',
        type: [accountStage_response_dto_1.AccountStageResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountStageController.prototype, "getAccountStages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get accountStage by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'AccountStage fetched successfully!',
        type: accountStage_response_dto_1.AccountStageResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountStageController.prototype, "getAccountStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete accountStage by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'AccountStage successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountStageController.prototype, "deleteAccountStage", null);
AccountStageController = __decorate([
    (0, swagger_1.ApiTags)('AccountStage'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('accountStage'),
    __metadata("design:paramtypes", [accountStage_service_1.AccountStageService])
], AccountStageController);
exports.AccountStageController = AccountStageController;
//# sourceMappingURL=accountStage.controller.js.map