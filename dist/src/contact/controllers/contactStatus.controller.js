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
exports.ContactStatusController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const contactStatus_service_1 = require("../services/contactStatus.service");
const create_contactStatus_request_dto_1 = require("../dto/contactStatus/create-contactStatus.request.dto");
const update_contactStatus_request_dto_1 = require("../dto/contactStatus/update-contactStatus.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const contactStatus_response_dto_1 = require("../dto/contactStatus/contactStatus.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let ContactStatusController = class ContactStatusController {
    constructor(contactStatusService) {
        this.contactStatusService = contactStatusService;
    }
    async createContactStatus(authedUser, body) {
        try {
            const contactStatus = await this.contactStatusService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactStatus created successfully!', contactStatus);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateContactStatus(authedUser, id, body) {
        try {
            const contactStatus = await this.contactStatusService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactStatus updated successfully!', contactStatus);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactStatuss(authedUser) {
        try {
            const contactStatuss = await this.contactStatusService.findAll();
            return new http_1.SuccessResponseObject('ContactStatuss fetched successfully!', contactStatuss);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactStatus(authedUser, id) {
        try {
            const contactStatus = await this.contactStatusService.findOne(id);
            return new http_1.SuccessResponseObject('ContactStatus fetched successfully!', contactStatus);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteContactStatus(authedUser, id) {
        try {
            await this.contactStatusService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactStatus successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create contactStatus' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'ContactStatus created successfully!',
        type: contactStatus_response_dto_1.ContactStatusResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contactStatus_request_dto_1.CreateContactStatusRequestDto]),
    __metadata("design:returntype", Promise)
], ContactStatusController.prototype, "createContactStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update contactStatus by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'ContactStatus updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_contactStatus_request_dto_1.UpdateContactStatusRequestDto]),
    __metadata("design:returntype", Promise)
], ContactStatusController.prototype, "updateContactStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all contactStatuss' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'ContactStatuss fetched successfully!',
        type: [contactStatus_response_dto_1.ContactStatusResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactStatusController.prototype, "getContactStatuss", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get contactStatus by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'ContactStatus fetched successfully!',
        type: contactStatus_response_dto_1.ContactStatusResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ContactStatusController.prototype, "getContactStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete contactStatus by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'ContactStatus successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ContactStatusController.prototype, "deleteContactStatus", null);
ContactStatusController = __decorate([
    (0, swagger_1.ApiTags)('ContactStatus'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('contactStatus'),
    __metadata("design:paramtypes", [contactStatus_service_1.ContactStatusService])
], ContactStatusController);
exports.ContactStatusController = ContactStatusController;
//# sourceMappingURL=contactStatus.controller.js.map