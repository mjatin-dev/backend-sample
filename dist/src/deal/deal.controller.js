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
exports.DealController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const deal_service_1 = require("./deal.service");
const create_deal_request_dto_1 = require("./dto/create-deal.request.dto");
const update_deal_request_dto_1 = require("./dto/update-deal.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const deal_response_dto_1 = require("./dto/deal.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let DealController = class DealController {
    constructor(dealService) {
        this.dealService = dealService;
    }
    async createDeal(authedUser, body) {
        try {
            const deal = await this.dealService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Deal created successfully!', deal);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateDeal(authedUser, id, body) {
        try {
            const deal = await this.dealService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Deal updated successfully!', deal);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getDeals(authedUser) {
        try {
            const deals = await this.dealService.findAll(authedUser.userId);
            return new http_1.SuccessResponseObject('Deals fetched successfully!', deals);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getDeal(authedUser, id) {
        try {
            const deal = await this.dealService.findOne(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Deal fetched successfully!', deal);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteDeal(authedUser, id) {
        try {
            await this.dealService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Deal successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create deal' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deal created successfully!',
        type: deal_response_dto_1.DealResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_deal_request_dto_1.CreateDealRequestDto]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "createDeal", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update deal by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Deal updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_deal_request_dto_1.UpdateDealRequestDto]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "updateDeal", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all deals' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Deals fetched successfully!',
        type: [deal_response_dto_1.DealResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "getDeals", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get deal by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Deal fetched successfully!',
        type: deal_response_dto_1.DealResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "getDeal", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete deal by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Deal successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DealController.prototype, "deleteDeal", null);
DealController = __decorate([
    (0, swagger_1.ApiTags)('Deal'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('deal'),
    __metadata("design:paramtypes", [deal_service_1.DealService])
], DealController);
exports.DealController = DealController;
//# sourceMappingURL=deal.controller.js.map