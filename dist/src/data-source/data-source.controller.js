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
exports.DataSourceController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const data_source_service_1 = require("./data-source.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const http_1 = require("../common/http");
const authed_user_decorator_1 = require("../auth/decorators/authed-user.decorator");
let DataSourceController = class DataSourceController {
    constructor(dataSourceService) {
        this.dataSourceService = dataSourceService;
    }
    async getAllDataSources() {
        const dataSources = await this.dataSourceService.findAll({
            relations: ['integration'],
        });
        return new http_1.SuccessResponseObject('Data Sources Retrieved', dataSources);
    }
    async getIntegratedDataSources(authedUser) {
        const dataSources = await this.dataSourceService.getAvailableDataSources(authedUser.userId, authedUser.tenantId);
        return new http_1.SuccessResponseObject('Data Sources Retrieved', dataSources);
    }
    async getDataSourceFromIntegrationId(integrationId) {
        const dataSources = await this.dataSourceService.findOne({
            where: { integrationId },
        });
        if (!dataSources) {
            throw new common_1.NotFoundException('Data source not found');
        }
        return new http_1.SuccessResponseObject('Data Source Retrieved', dataSources);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available data sources to connect with' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataSourceController.prototype, "getAllDataSources", null);
__decorate([
    (0, common_1.Get)('/available'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all available data sources that user is integrated with',
    }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataSourceController.prototype, "getIntegratedDataSources", null);
__decorate([
    (0, common_1.Get)('/integration/:integrationId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Data sources base on an integration id e.g.(salesforce, google, etc)',
    }),
    __param(0, (0, common_1.Param)('integrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DataSourceController.prototype, "getDataSourceFromIntegrationId", null);
DataSourceController = __decorate([
    (0, swagger_1.ApiTags)('DataSource'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('DataSource'),
    __metadata("design:paramtypes", [data_source_service_1.DataSourceService])
], DataSourceController);
exports.DataSourceController = DataSourceController;
//# sourceMappingURL=data-source.controller.js.map