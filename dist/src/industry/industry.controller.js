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
exports.IndustryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const industry_service_1 = require("./industry.service");
const create_industry_request_dto_1 = require("./dto/create-industry.request.dto");
const update_industry_request_dto_1 = require("./dto/update-industry.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const industry_response_dto_1 = require("./dto/industry.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let IndustryController = class IndustryController {
    constructor(industryService) {
        this.industryService = industryService;
    }
    async createIndustry(authedUser, body) {
        try {
            const industry = await this.industryService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Industry created successfully!', industry);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateIndustry(authedUser, id, body) {
        try {
            const industry = await this.industryService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Industry updated successfully!', industry);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getIndustrys(authedUser) {
        try {
            const industrys = await this.industryService.findAll();
            return new http_1.SuccessResponseObject('Industrys fetched successfully!', industrys);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getIndustry(authedUser, id) {
        try {
            const industry = await this.industryService.findOne(id);
            return new http_1.SuccessResponseObject('Industry fetched successfully!', industry);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteIndustry(authedUser, id) {
        try {
            await this.industryService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Industry successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create industry' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Industry created successfully!',
        type: industry_response_dto_1.IndustryResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_industry_request_dto_1.CreateIndustryRequestDto]),
    __metadata("design:returntype", Promise)
], IndustryController.prototype, "createIndustry", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update industry by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Industry updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_industry_request_dto_1.UpdateIndustryRequestDto]),
    __metadata("design:returntype", Promise)
], IndustryController.prototype, "updateIndustry", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all industrys' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Industrys fetched successfully!',
        type: [industry_response_dto_1.IndustryResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IndustryController.prototype, "getIndustrys", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get industry by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Industry fetched successfully!',
        type: industry_response_dto_1.IndustryResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], IndustryController.prototype, "getIndustry", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete industry by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Industry successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], IndustryController.prototype, "deleteIndustry", null);
IndustryController = __decorate([
    (0, swagger_1.ApiTags)('Industry'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('industry'),
    __metadata("design:paramtypes", [industry_service_1.IndustryService])
], IndustryController);
exports.IndustryController = IndustryController;
//# sourceMappingURL=industry.controller.js.map