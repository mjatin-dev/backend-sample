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
exports.DeduplicationConfigController = void 0;
const openapi = require("@nestjs/swagger");
const http_1 = require("../../common/http");
const create_deduplication_config_request_dto_1 = require("../dto/create-deduplication-config.request.dto");
const deduplication_config_response_dto_1 = require("../dto/deduplication-config.response.dto");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const deduplication_config_service_1 = require("../services/deduplication-config.service");
const data_migration_service_1 = require("../../data-migration/services/data-migration.service");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
let DeduplicationConfigController = class DeduplicationConfigController {
    constructor(deduplicationConfigService, dataMigrationService) {
        this.deduplicationConfigService = deduplicationConfigService;
        this.dataMigrationService = dataMigrationService;
    }
    async createDeDuplicationConfig(authedUser, body) {
        await this.checkMigrationReference(body.migrationId, authedUser.tenantId);
        const existingConfig = await this.deduplicationConfigService.findOneByMigrationAndTable(body.migrationId, body.tableName);
        if (existingConfig) {
            return new common_1.BadRequestException('Deduplication config already exists for that migration and table!');
        }
        const config = await this.deduplicationConfigService.create(body);
        return new http_1.SuccessResponseObject('Deduplication config created successfully!', config);
    }
    async updateDeDuplicationConfig(authedUser, body, id) {
        console.log('precheck id');
        console.log(body, authedUser);
        await this.checkMigrationReference(body.migrationId, authedUser.tenantId);
        console.log('pass id');
        const existingConfig = await this.deduplicationConfigService.findOneById(body.migrationId, id);
        console.log('exists id');
        if (!existingConfig) {
            throw new common_1.BadRequestException('Deduplication configuration does not exists');
        }
        console.log('update id');
        const config = await this.deduplicationConfigService.update(id, body);
        return new http_1.SuccessResponseObject('Deduplication config Updated successfully!', config);
    }
    async getDeDuplicationConfigs(authedUser, migrationId) {
        await this.checkMigrationReference(migrationId, authedUser.tenantId);
        const configs = await this.deduplicationConfigService.findAll(migrationId);
        return new http_1.SuccessResponseObject('Deduplication config fetched successfully!', configs);
    }
    async getDeDuplicationConfig(authedUser, migrationId, id) {
        await this.checkMigrationReference(migrationId, authedUser.tenantId);
        const config = await this.deduplicationConfigService.findOneById(migrationId, id);
        if (!config) {
            throw new common_1.BadRequestException('DeDuplicationConfig does not exists!');
        }
        return new http_1.SuccessResponseObject('DeDuplicationConfig fetched successfully!', config);
    }
    async getDeDuplicationConfigByMigrationAndTable(authedUser, migrationId, table) {
        await this.checkMigrationReference(migrationId, authedUser.tenantId);
        const config = await this.deduplicationConfigService.findOneByMigrationAndTable(migrationId, table);
        if (!config) {
            throw new common_1.BadRequestException('DeDuplicationConfig does not exists!');
        }
        return new http_1.SuccessResponseObject('DeDuplicationConfig fetched successfully!', config);
    }
    async deleteDeDuplicationConfig(authedUser, migrationId, id) {
        await this.checkMigrationReference(migrationId, authedUser.tenantId);
        await this.deduplicationConfigService.delete(migrationId, id);
        return new http_1.SuccessResponseObject('DeDuplicationConfig successfully deleted!');
    }
    async checkMigrationReference(migrationId, tenantId) {
        try {
            const migration = await this.dataMigrationService.findOne({
                where: {
                    dataMigrationId: migrationId,
                    tenantId: tenantId,
                },
            });
            if (!migration) {
                throw new common_1.BadRequestException('You do not have permissions to that migration');
            }
            return migration;
        }
        catch (err) {
            throw new common_1.BadRequestException('You do not have permissions to that migration');
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'created deduplication config' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deduplication config created successfully!',
        type: deduplication_config_response_dto_1.CreateDeduplicationConfigResponseDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_deduplication_config_request_dto_1.CreateDeduplicationConfigRequestDto]),
    __metadata("design:returntype", Promise)
], DeduplicationConfigController.prototype, "createDeDuplicationConfig", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update deduplication config' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Deduplication config Updated successfully!',
        type: deduplication_config_response_dto_1.CreateDeduplicationConfigResponseDto,
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_deduplication_config_request_dto_1.CreateDeduplicationConfigRequestDto, String]),
    __metadata("design:returntype", Promise)
], DeduplicationConfigController.prototype, "updateDeDuplicationConfig", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all deduplication configs' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Deals fetched successfully!',
        type: [deduplication_config_response_dto_1.CreateDeduplicationConfigResponseDto],
    }),
    (0, common_1.Get)('migration/:migrationId'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DeduplicationConfigController.prototype, "getDeDuplicationConfigs", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get deduplication config by id' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'DeDuplicationConfig fetched successfully!',
        type: deduplication_config_response_dto_1.CreateDeduplicationConfigResponseDto,
    }),
    (0, common_1.Get)('migration/:migrationId/id/:id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DeduplicationConfigController.prototype, "getDeDuplicationConfig", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get deduplication config by migration and table' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'DeDuplicationConfig fetched successfully!',
        type: deduplication_config_response_dto_1.CreateDeduplicationConfigResponseDto,
    }),
    (0, common_1.Get)('migration/:migrationId/table/:table'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('table')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DeduplicationConfigController.prototype, "getDeDuplicationConfigByMigrationAndTable", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete deduplication config by id' }),
    (0, swagger_1.ApiNoContentResponse)({
        description: 'DeDuplicationConfig successfully deleted!',
    }),
    (0, common_1.Delete)('migration/:migrationId/id/:id'),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DeduplicationConfigController.prototype, "deleteDeDuplicationConfig", null);
DeduplicationConfigController = __decorate([
    (0, common_1.Controller)('deduplication-config'),
    (0, swagger_1.ApiTags)('DeDuplication Config'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [deduplication_config_service_1.DeduplicationConfigService,
        data_migration_service_1.DataMigrationService])
], DeduplicationConfigController);
exports.DeduplicationConfigController = DeduplicationConfigController;
//# sourceMappingURL=deduplication-config.controller.js.map