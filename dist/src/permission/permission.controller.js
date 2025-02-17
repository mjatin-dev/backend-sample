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
exports.PermissionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./permission.service");
const create_permission_request_dto_1 = require("./dto/create-permission.request.dto");
const update_permission_request_dto_1 = require("./dto/update-permission.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const permission_response_dto_1 = require("./dto/permission.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    async createPermission(authedUser, body) {
        try {
            const permission = await this.permissionService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Permission created successfully!', permission);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updatePermission(authedUser, id, body) {
        try {
            const permission = await this.permissionService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Permission updated successfully!', permission);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getPermissions(authedUser) {
        try {
            const permissions = await this.permissionService.findAll(authedUser.userId);
            return new http_1.SuccessResponseObject('Permissions fetched successfully!', permissions);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getPermission(authedUser, id) {
        try {
            const permission = await this.permissionService.findOne(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Permission fetched successfully!', permission);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deletePermission(authedUser, id) {
        try {
            await this.permissionService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Permission successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create permission' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Permission created successfully!',
        type: permission_response_dto_1.PermissionResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_permission_request_dto_1.CreatePermissionRequestDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "createPermission", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update permission by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permission updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_permission_request_dto_1.UpdatePermissionRequestDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "updatePermission", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Permissions fetched successfully!',
        type: [permission_response_dto_1.PermissionResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get permission by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Permission fetched successfully!',
        type: permission_response_dto_1.PermissionResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermission", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete permission by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Permission successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "deletePermission", null);
PermissionController = __decorate([
    (0, swagger_1.ApiTags)('Permission'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map