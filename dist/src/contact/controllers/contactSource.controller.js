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
exports.ContactSourceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const contactSource_service_1 = require("../services/contactSource.service");
const create_contactSource_request_dto_1 = require("../dto/contactSource/create-contactSource.request.dto");
const update_contactSource_request_dto_1 = require("../dto/contactSource/update-contactSource.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const contactSource_response_dto_1 = require("../dto/contactSource/contactSource.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let ContactSourceController = class ContactSourceController {
    constructor(contactSourceService) {
        this.contactSourceService = contactSourceService;
    }
    async createContactSource(authedUser, body) {
        try {
            const contactSource = await this.contactSourceService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactSource created successfully!', contactSource);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateContactSource(authedUser, id, body) {
        try {
            const contactSource = await this.contactSourceService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactSource updated successfully!', contactSource);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactSources(authedUser) {
        try {
            const contactSources = await this.contactSourceService.findAll();
            return new http_1.SuccessResponseObject('ContactSources fetched successfully!', contactSources);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactSource(authedUser, id) {
        try {
            const contactSource = await this.contactSourceService.findOne(id);
            return new http_1.SuccessResponseObject('ContactSource fetched successfully!', contactSource);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteContactSource(authedUser, id) {
        try {
            await this.contactSourceService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactSource successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create contactSource' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'ContactSource created successfully!',
        type: contactSource_response_dto_1.ContactSourceResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contactSource_request_dto_1.CreateContactSourceRequestDto]),
    __metadata("design:returntype", Promise)
], ContactSourceController.prototype, "createContactSource", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update contactSource by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'ContactSource updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_contactSource_request_dto_1.UpdateContactSourceRequestDto]),
    __metadata("design:returntype", Promise)
], ContactSourceController.prototype, "updateContactSource", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all contactSources' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'ContactSources fetched successfully!',
        type: [contactSource_response_dto_1.ContactSourceResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactSourceController.prototype, "getContactSources", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get contactSource by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'ContactSource fetched successfully!',
        type: contactSource_response_dto_1.ContactSourceResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ContactSourceController.prototype, "getContactSource", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete contactSource by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'ContactSource successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ContactSourceController.prototype, "deleteContactSource", null);
ContactSourceController = __decorate([
    (0, swagger_1.ApiTags)('ContactSource'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('contactSource'),
    __metadata("design:paramtypes", [contactSource_service_1.ContactSourceService])
], ContactSourceController);
exports.ContactSourceController = ContactSourceController;
//# sourceMappingURL=contactSource.controller.js.map