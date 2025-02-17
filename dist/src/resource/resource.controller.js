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
exports.ResourceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const resource_service_1 = require("./services/resource.service");
const create_resource_request_dto_1 = require("./dto/create-resource.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const resource_response_dto_1 = require("./dto/resource.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const update_resource_request_dto_1 = require("./dto/update-resource.request.dto");
let ResourceController = class ResourceController {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async createResource(authedUser, body) {
        try {
            const Resource = await this.resourceService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Resource created successfully!', Resource);
        }
        catch (error) {
            console.log('visit create Resource:::', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteResource(authedUser, id) {
        try {
            await this.resourceService.delete(id);
            return new http_1.SuccessResponseObject('Resource successfully deleted!');
        }
        catch (error) {
            console.log('visit create Resource:::', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updatepipeline(authedUser, id, body) {
        try {
            const resource = await this.resourceService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Resource updated successfully!', resource);
        }
        catch (error) {
            console.log(':::Post:::', error);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Resource' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Resource created successfully!',
        type: resource_response_dto_1.ResourceResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_resource_request_dto_1.CreateResourceRequestDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "createResource", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Resource' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Resource successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "deleteResource", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update resource by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Resource updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_resource_request_dto_1.UpdateResourceRequestDto]),
    __metadata("design:returntype", Promise)
], ResourceController.prototype, "updatepipeline", null);
ResourceController = __decorate([
    (0, swagger_1.ApiTags)('Resource'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('resource'),
    __metadata("design:paramtypes", [resource_service_1.ResourceService])
], ResourceController);
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map