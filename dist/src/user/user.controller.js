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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./services/user.service");
const create_user_request_dto_1 = require("./dto/create-user.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const update_user_request_dto_1 = require("./dto/update-user-request.dto");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("./dto/user.response.dto");
const create_user_response_dto_1 = require("./dto/create-user.response.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(authedUser, body) {
        try {
            const user = await this.userService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('User created successfully!', user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getUsers(authedUser) {
        try {
            const users = await this.userService.findAll(authedUser.tenantId);
            return new http_1.SuccessResponseObject('Users fetched successfully!', users);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getUser(authedUser, id) {
        try {
            const user = await this.userService.findOne({ userId: id }, authedUser.userId);
            return new http_1.SuccessResponseObject('User fetched successfully!', user);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getCurrentUser(authedUser) {
        try {
            const user = await this.userService.findOne({
                userId: authedUser.userId,
            });
            return new http_1.SuccessResponseObject('Current user fetched successfully!', user);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateUser(authedUser, id, body) {
        try {
            await this.userService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('User updated successfully!');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteUser(authedUser, id) {
        try {
            await this.userService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('User successfully deleted!');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async inactivateUser(authedUser, id) {
        try {
            await this.userService.inactivate(id, authedUser.userId, authedUser.tenantId);
            return new http_1.SuccessResponseObject('User successfully inactivated!');
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async reactivateUser(authedUser, id) {
        try {
            await this.userService.reactivate(id, authedUser.userId, authedUser.tenantId);
            return new http_1.SuccessResponseObject('User successfully reactivated!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create user' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User created successfully!',
        type: create_user_response_dto_1.CreateUserResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_request_dto_1.CreateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Users fetched successfully!',
        type: [user_response_dto_1.UserResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get user by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User fetched successfully!',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get current authenticated user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Current user fetched successfully!',
        type: user_response_dto_1.UserResponseDto,
    }),
    (0, common_1.Get)('auth/current'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update user by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_request_dto_1.UpdateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'User successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Inactivate user by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully inactivated!' }),
    (0, common_1.Put)(':id/inactivate'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "inactivateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Reactivate user by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully reactivated!' }),
    (0, common_1.Put)(':id/reactivate'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reactivateUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map