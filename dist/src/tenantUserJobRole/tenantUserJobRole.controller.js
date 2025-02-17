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
exports.TenantUserJobRoleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const tenantUserJobRole_service_1 = require("./tenantUserJobRole.service");
const create_tenantUserJobRole_request_dto_1 = require("./dto/create-tenantUserJobRole.request.dto");
const update_tenantUserJobRole_request_dto_1 = require("./dto/update-tenantUserJobRole.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const tenantUserJobRole_response_dto_1 = require("./dto/tenantUserJobRole.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let TenantUserJobRoleController = class TenantUserJobRoleController {
    constructor(tenantUserJobRoleService) {
        this.tenantUserJobRoleService = tenantUserJobRoleService;
    }
    async createTenantUserJobRole(authedUser, body) {
        try {
            const tenantUserJobRole = await this.tenantUserJobRoleService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('TenantUserJobRole created successfully!', tenantUserJobRole);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateTenantUserJobRole(authedUser, id, body) {
        try {
            const tenantUserJobRole = await this.tenantUserJobRoleService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('TenantUserJobRole updated successfully!', tenantUserJobRole);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getTenantUserJobRoles(authedUser) {
        try {
            const tenantUserJobRoles = await this.tenantUserJobRoleService.findAll(authedUser.userId);
            return new http_1.SuccessResponseObject('TenantUserJobRoles fetched successfully!', tenantUserJobRoles);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getTenantUserJobRole(authedUser, id) {
        try {
            const tenantUserJobRole = await this.tenantUserJobRoleService.findOne(id, authedUser.userId);
            return new http_1.SuccessResponseObject('TenantUserJobRole fetched successfully!', tenantUserJobRole);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteTenantUserJobRole(authedUser, id) {
        try {
            await this.tenantUserJobRoleService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('TenantUserJobRole successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create tenantUserJobRole' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'TenantUserJobRole created successfully!',
        type: tenantUserJobRole_response_dto_1.TenantUserJobRoleResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_tenantUserJobRole_request_dto_1.CreateTenantUserJobRoleRequestDto]),
    __metadata("design:returntype", Promise)
], TenantUserJobRoleController.prototype, "createTenantUserJobRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update tenantUserJobRole by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'TenantUserJobRole updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_tenantUserJobRole_request_dto_1.UpdateTenantUserJobRoleRequestDto]),
    __metadata("design:returntype", Promise)
], TenantUserJobRoleController.prototype, "updateTenantUserJobRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all tenantUserJobRoles' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'TenantUserJobRoles fetched successfully!',
        type: [tenantUserJobRole_response_dto_1.TenantUserJobRoleResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TenantUserJobRoleController.prototype, "getTenantUserJobRoles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get tenantUserJobRole by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'TenantUserJobRole fetched successfully!',
        type: tenantUserJobRole_response_dto_1.TenantUserJobRoleResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TenantUserJobRoleController.prototype, "getTenantUserJobRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete tenantUserJobRole by id' }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'TenantUserJobRole successfully deleted!',
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TenantUserJobRoleController.prototype, "deleteTenantUserJobRole", null);
TenantUserJobRoleController = __decorate([
    (0, swagger_1.ApiTags)('TenantUserJobRole'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('tenantUserJobRole'),
    __metadata("design:paramtypes", [tenantUserJobRole_service_1.TenantUserJobRoleService])
], TenantUserJobRoleController);
exports.TenantUserJobRoleController = TenantUserJobRoleController;
//# sourceMappingURL=tenantUserJobRole.controller.js.map