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
const basestage_service_1 = require("./basestage.service");
const http_1 = require("../common/http");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
const basestage_response_dto_1 = require("./dto/basestage.response.dto");
let pipelineController = class pipelineController {
    constructor(baseStageService) {
        this.baseStageService = baseStageService;
    }
    async getpipelines(authedUser) {
        try {
            const pipelines = await this.baseStageService.findAll();
            return new http_1.SuccessResponseObject('all the base stages fetched successfully!', pipelines);
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all base stages' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'all the base stages fetched successfully!',
        type: [basestage_response_dto_1.baseStageResponseDto],
    }),
    (0, common_1.Get)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], pipelineController.prototype, "getpipelines", null);
pipelineController = __decorate([
    (0, swagger_1.ApiTags)('Basepipeline'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('basestage'),
    __metadata("design:paramtypes", [basestage_service_1.baseStageService])
], pipelineController);
exports.pipelineController = pipelineController;
//# sourceMappingURL=basestage.controller.js.map