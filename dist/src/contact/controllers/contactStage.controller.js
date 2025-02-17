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
exports.ContactStageController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const contactStage_service_1 = require("../services/contactStage.service");
const create_contactStage_request_dto_1 = require("../dto/contactStage/create-contactStage.request.dto");
const update_contactStage_request_dto_1 = require("../dto/contactStage/update-contactStage.request.dto");
const http_1 = require("../../common/http");
const payload_exists_pipe_1 = require("../../common/pipes/payload-exists.pipe");
const contactStage_response_dto_1 = require("../dto/contactStage/contactStage.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let ContactStageController = class ContactStageController {
    constructor(contactStageService) {
        this.contactStageService = contactStageService;
    }
    async createContactStage(authedUser, body) {
        try {
            const contactStage = await this.contactStageService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactStage created successfully!', contactStage);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateContactStage(authedUser, id, body) {
        try {
            const contactStage = await this.contactStageService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactStage updated successfully!', contactStage);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactStages(authedUser) {
        try {
            const contactStages = await this.contactStageService.findAll();
            return new http_1.SuccessResponseObject('ContactStages fetched successfully!', contactStages);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getContactStage(authedUser, id) {
        try {
            const contactStage = await this.contactStageService.findOne(id);
            return new http_1.SuccessResponseObject('ContactStage fetched successfully!', contactStage);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteContactStage(authedUser, id) {
        try {
            await this.contactStageService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('ContactStage successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create contactStage' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'ContactStage created successfully!',
        type: contactStage_response_dto_1.ContactStageResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contactStage_request_dto_1.CreateContactStageRequestDto]),
    __metadata("design:returntype", Promise)
], ContactStageController.prototype, "createContactStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update contactStage by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'ContactStage updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_contactStage_request_dto_1.UpdateContactStageRequestDto]),
    __metadata("design:returntype", Promise)
], ContactStageController.prototype, "updateContactStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all contactStages' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'ContactStages fetched successfully!',
        type: [contactStage_response_dto_1.ContactStageResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContactStageController.prototype, "getContactStages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get contactStage by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'ContactStage fetched successfully!',
        type: contactStage_response_dto_1.ContactStageResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ContactStageController.prototype, "getContactStage", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete contactStage by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'ContactStage successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ContactStageController.prototype, "deleteContactStage", null);
ContactStageController = __decorate([
    (0, swagger_1.ApiTags)('ContactStage'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('contactStage'),
    __metadata("design:paramtypes", [contactStage_service_1.ContactStageService])
], ContactStageController);
exports.ContactStageController = ContactStageController;
//# sourceMappingURL=contactStage.controller.js.map