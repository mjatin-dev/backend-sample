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
exports.TenantController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const tenant_service_1 = require("./services/tenant.service");
const create_tenant_request_dto_1 = require("./dto/create-tenant.request.dto");
const http_1 = require("../common/http");
const update_tenant_request_dto_1 = require("./dto/update-tenant.request.dto");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const swagger_1 = require("@nestjs/swagger");
const tenant_response_dto_1 = require("./dto/tenant.response.dto");
let TenantController = class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async createTenant(body) {
        try {
            const tenant = await this.tenantService.create(body);
            return new http_1.SuccessResponseObject('Tenant created successfully!', tenant);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getCompanies() {
        try {
            const companies = await this.tenantService.findAll();
            return new http_1.SuccessResponseObject('Companies fetched successfully!', companies);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getTenant(id) {
        try {
            const tenant = await this.tenantService.findOne(id);
            return new http_1.SuccessResponseObject('Tenant fetched successfully!', tenant);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async updateTenant(id, body) {
        try {
            await this.tenantService.update(id, body);
            return new http_1.SuccessResponseObject('Tenant updated successfully!');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteTenant(id) {
        try {
            await this.tenantService.delete(id);
            return new http_1.SuccessResponseObject('Tenant successfully deleted!');
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
    (0, swagger_1.ApiOperation)({ summary: 'Create tenant' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User created successfully!',
        type: tenant_response_dto_1.TenantResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_request_dto_1.CreateTenantRequestDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createTenant", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all companies' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Companies fetched successfully!',
        type: [tenant_response_dto_1.TenantResponseDto],
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getCompanies", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get tenant by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Tenant fetched successfully!',
        type: tenant_response_dto_1.TenantResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getTenant", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update tenant by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Tenant updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tenant_request_dto_1.UpdateTenantRequestDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "updateTenant", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete tenant by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Tenant successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "deleteTenant", null);
TenantController = __decorate([
    (0, swagger_1.ApiTags)('Tenant'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('tenant'),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantController);
exports.TenantController = TenantController;
//# sourceMappingURL=tenant.controller.js.map