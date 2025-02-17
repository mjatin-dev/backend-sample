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
exports.pipelineController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pipeline_service_1 = require("./services/pipeline.service");
const create_pipeline_request_dto_1 = require("./dto/create-pipeline.request.dto");
const update_pipeline_request_dto_1 = require("./dto/update-pipeline.request.dto");
const http_1 = require("../common/http");
const payload_exists_pipe_1 = require("../common/pipes/payload-exists.pipe");
const pipeline_response_dto_1 = require("./dto/pipeline.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const pipeline_repository_1 = require("./repositories/pipeline.repository");
const resource_response_dto_1 = require("../resource/dto/resource.response.dto");
let pipelineController = class pipelineController {
    constructor(pipelineService, pipelineRepository) {
        this.pipelineService = pipelineService;
        this.pipelineRepository = pipelineRepository;
    }
    async createpipeline(authedUser, body) {
        try {
            const pipeline = await this.pipelineService.create(body, authedUser.userId);
            return new http_1.SuccessResponseObject('Pipeline created successfully!', pipeline);
        }
        catch (error) {
            console.log('visit create pipeline:::', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async updatepipeline(authedUser, id, body) {
        try {
            const pipeline = await this.pipelineService.update(id, body, authedUser.userId);
            return new http_1.SuccessResponseObject('Pipeline updated successfully!', pipeline);
        }
        catch (error) {
            console.log(':::Post:::', error);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getpipelines(authedUser) {
        console.log('visit get all pipeline');
        try {
            const pipelines = await this.pipelineService.findAll(authedUser.userId);
            return new http_1.SuccessResponseObject('pipelines fetched successfully!', pipelines);
        }
        catch (error) {
            console.log(':::::error::::', error);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getpipeline(authedUser, id) {
        try {
            const pipeline = await this.pipelineService.findOne(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Pipeline fetched successfully!', pipeline);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async deletepipeline(authedUser, id) {
        try {
            await this.pipelineService.delete(id, authedUser.userId);
            return new http_1.SuccessResponseObject('Pipeline successfully deleted!');
        }
        catch (error) {
            console.log(':::delte::::', error);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAllResources(authedUser, id) {
        try {
            const resouces = await this.pipelineRepository.getAllResouces(authedUser.userId, id);
            return new http_1.SuccessResponseObject('All the resouces for pipline fetched successfully!', resouces);
        }
        catch (error) {
            console.log(' fetching all the resources::::', error);
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create pipeline' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Pipeline created successfully!',
        type: pipeline_response_dto_1.pipelineResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pipeline_request_dto_1.CreatepipelineRequestDto]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "createpipeline", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update pipeline by id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Pipeline updated successfully!' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)(payload_exists_pipe_1.PayloadExistsValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_pipeline_request_dto_1.UpdatepipelineRequestDto]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "updatepipeline", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all pipelines' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'pipelines fetched successfully!',
        type: [pipeline_response_dto_1.pipelineResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "getpipelines", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get pipeline by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Pipeline fetched successfully!',
        type: pipeline_response_dto_1.pipelineResponseDto,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "getpipeline", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete pipeline by id' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Pipeline successfully deleted!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "deletepipeline", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all the resouces by pipline_id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'All the resources for any Pipeline fetched successfully!',
        type: [resource_response_dto_1.ResourceResponseDto],
    }),
    (0, common_1.Get)(':id/resources'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "getAllResources", null);
pipelineController = __decorate([
    (0, swagger_1.ApiTags)('Pipeline'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('pipeline'),
    __metadata("design:paramtypes", [pipeline_service_1.pipelineService,
        pipeline_repository_1.PipelineRepository])
], pipelineController);
exports.pipelineController = pipelineController;
//# sourceMappingURL=pipeline.controller.js.map