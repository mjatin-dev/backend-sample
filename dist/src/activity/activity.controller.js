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
exports.ActivityController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const activity_service_1 = require("./activity.service");
const create_activity_request_dto_1 = require("./dto/create-activity.request.dto");
const update_activity_request_dto_1 = require("./dto/update-activity.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const activity_response_dto_1 = require("./dto/activity.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    async createActivity(authedUser, body) {
        try {
            const activity = await this.activityService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Activity created successfully!', activity);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateActivity(authedUser, id, body) {
        try {
            const activity = await this.activityService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Activity updated successfully!', activity);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getActivitys(authedUser, query) {
        try {
            const activitys = await this.activityService.findAll(authedUser.userId, query === null || query === void 0 ? void 0 : query.contactId);
            return new http_1.SuccessResponseObject('Activitys fetched successfully!', activitys);
        }
        catch (error) {
            console.log('ERROR FIND ACTIVITIES', error);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async getActivity(authedUser, id) {
        try {
            const activity = await this.activityService.findOne(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Activity fetched successfully!', activity);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteActivity(authedUser, id) {
        try {
            await this.activityService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Activity successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create activity' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Activity created successfully!',
        type: activity_response_dto_1.ActivityResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_activity_request_dto_1.CreateActivityRequestDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "createActivity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update activity by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Activity updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_activity_request_dto_1.UpdateActivityRequestDto]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "updateActivity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all activitys' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Activitys fetched successfully!',
        type: [activity_response_dto_1.ActivityResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivitys", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get activity by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Activity fetched successfully!',
        type: activity_response_dto_1.ActivityResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "getActivity", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete activity by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Activity successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ActivityController.prototype, "deleteActivity", null);
ActivityController = __decorate([
    (0, swagger_1.ApiTags)('Activity'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('activity'),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityController);
exports.ActivityController = ActivityController;
//# sourceMappingURL=activity.controller.js.map