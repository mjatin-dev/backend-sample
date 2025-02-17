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
exports.AccountContactController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const accountContact_service_1 = require("../services/accountContact.service");
const create_accountContact_request_dto_1 = require("../dto/accountContact/create-accountContact.request.dto");
const update_accountContact_request_dto_1 = require("../dto/accountContact/update-accountContact.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const accountContact_response_dto_1 = require("../dto/accountContact/accountContact.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let AccountContactController = class AccountContactController {
    constructor(accountContactService) {
        this.accountContactService = accountContactService;
    }
    async createAccountContact(authedUser, body) {
        try {
            const accountContact = await this.accountContactService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountContact created successfully!', accountContact);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateAccountContact(authedUser, id, body) {
        try {
            const accountContact = await this.accountContactService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountContact updated successfully!', accountContact);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountContacts(authedUser) {
        try {
            const accountContacts = await this.accountContactService.findAll();
            return new http_1.SuccessResponseObject('AccountContacts fetched successfully!', accountContacts);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountContact(authedUser, id) {
        try {
            const accountContact = await this.accountContactService.findOne(id);
            return new http_1.SuccessResponseObject('AccountContact fetched successfully!', accountContact);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactsByAccountId(authedUser, id) {
        try {
            const accountContact = await this.accountContactService.getContactsByAccountId(id);
            return new http_1.SuccessResponseObject('AccountContact fetched successfully!', accountContact);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAccountsByContactId(authedUser, id) {
        try {
            const accountContact = await this.accountContactService.getAccountsByContactId(id);
            return new http_1.SuccessResponseObject('AccountContact fetched successfully!', accountContact);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteAccountContact(authedUser, id) {
        try {
            await this.accountContactService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('AccountContact successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create accountContact' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'AccountContact created successfully!',
        type: accountContact_response_dto_1.AccountContactResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_accountContact_request_dto_1.CreateAccountContactRequestDto]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "createAccountContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update accountContact by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'AccountContact updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_accountContact_request_dto_1.UpdateAccountContactRequestDto]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "updateAccountContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all accountContacts' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'AccountContacts fetched successfully!',
        type: [accountContact_response_dto_1.AccountContactResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "getAccountContacts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get accountContact by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'AccountContact fetched successfully!',
        type: accountContact_response_dto_1.AccountContactResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "getAccountContact", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Contacts by account id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Contacts fetched successfully!',
        type: accountContact_response_dto_1.AccountContactResponseDto,
    }),
    (0, common_1.Get)('contacts/:id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "getContactsByAccountId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Accounts by contact id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Accounts fetched successfully!',
        type: accountContact_response_dto_1.AccountContactResponseDto,
    }),
    (0, common_1.Get)('accounts/:id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "getAccountsByContactId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete accountContact by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'AccountContact successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountContactController.prototype, "deleteAccountContact", null);
AccountContactController = __decorate([
    (0, swagger_1.ApiTags)('AccountContact'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('accountContact'),
    __metadata("design:paramtypes", [accountContact_service_1.AccountContactService])
], AccountContactController);
exports.AccountContactController = AccountContactController;
//# sourceMappingURL=accountContact.controller.js.map