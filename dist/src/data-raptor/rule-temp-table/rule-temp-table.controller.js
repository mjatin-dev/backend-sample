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
exports.RuleTempTableController = exports.TemporalTableActions = void 0;
const openapi = require("@nestjs/swagger");
const authed_user_decorator_1 = require("../../auth/decorators/authed-user.decorator");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const rule_temp_table_service_1 = require("./rule-temp-table.service");
const rule_temp_table_dto_1 = require("./rule-temp-table.dto");
const data_migration_service_1 = require("../../data-migration/services/data-migration.service");
const http_1 = require("../../common/http");
var TemporalTableActions;
(function (TemporalTableActions) {
    TemporalTableActions["CREATE"] = "CREATE";
    TemporalTableActions["UPDATE"] = "UPDATE";
})(TemporalTableActions = exports.TemporalTableActions || (exports.TemporalTableActions = {}));
let RuleTempTableController = class RuleTempTableController {
    constructor(ruleTempTableService, dataMigrationService) {
        this.ruleTempTableService = ruleTempTableService;
        this.dataMigrationService = dataMigrationService;
    }
    async validateMigrationIdOwnership(authedUser, migrationId) {
        const { tenantId } = authedUser;
        const migration = await this.dataMigrationService.findOne({
            where: { dataMigrationId: migrationId, tenantId },
        });
        if (!migration) {
            throw new common_1.BadRequestException('Migration not found!');
        }
        return migration;
    }
    async getTempTables(authedUser, migrationId) {
        await this.validateMigrationIdOwnership(authedUser, migrationId);
        const tempTables = await this.ruleTempTableService.findAll(migrationId);
        return new http_1.SuccessResponseObject('Temporal Tables retrieved successfully', tempTables);
    }
    async getCheckNameAvailability(authedUser, migrationId, name) {
        await this.validateMigrationIdOwnership(authedUser, migrationId);
        const tableWithSameName = await this.ruleTempTableService.findOneByConditions({
            name: name,
            dataMigrationId: migrationId,
        });
        return new http_1.SuccessResponseObject('Check Name Availability retrieved successfully', { available: tableWithSameName ? false : true });
    }
    async getTempTableById(authedUser, migrationId, tableId) {
        await this.validateMigrationIdOwnership(authedUser, migrationId);
        const tempTable = await this.ruleTempTableService.findOne(tableId, migrationId);
        return new http_1.SuccessResponseObject('Temporal table retrieved successfully', tempTable);
    }
    async createTempTable(authedUser, migrationId, body) {
        const migration = await this.validateMigrationIdOwnership(authedUser, migrationId);
        const tableWithSameName = await this.ruleTempTableService.findOneByConditions({
            name: body.name,
            dataMigrationId: migrationId,
        });
        if (tableWithSameName) {
            throw new common_1.BadRequestException('Temporal Table with the same name already exists');
        }
        const createdTable = await this.ruleTempTableService.processTemporalTable(authedUser, migration, body, TemporalTableActions.CREATE);
        return new http_1.SuccessResponseObject('Temporal table created successfully', createdTable);
    }
    async updateTempTable(authedUser, migrationId, tempTableId, body) {
        const migration = await this.validateMigrationIdOwnership(authedUser, migrationId);
        await this.ruleTempTableService.processTemporalTable(authedUser, migration, body, TemporalTableActions.UPDATE, tempTableId);
        return new http_1.SuccessResponseObject('Temporal table updated successfully');
    }
    async deleteTempTable(authedUser, migrationId, tableId) {
        await this.validateMigrationIdOwnership(authedUser, migrationId);
        const dependencies = await this.ruleTempTableService.getDependenciesAssociated(migrationId, tableId);
        if (dependencies.length > 0) {
            throw new common_1.BadRequestException('Cannot delete a Temporal Table with associated rules');
        }
        await this.ruleTempTableService.delete(tableId);
        return new http_1.SuccessResponseObject('Temporal table deleted successfully');
    }
};
__decorate([
    (0, common_1.Get)('/migration/:migrationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Temp Tables from a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RuleTempTableController.prototype, "getTempTables", null);
__decorate([
    (0, common_1.Get)('/migration/:migrationId/checkName/:name'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Temp Tables from a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RuleTempTableController.prototype, "getCheckNameAvailability", null);
__decorate([
    (0, common_1.Get)('/migration/:migrationId/table/:tableId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Temp Table from a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RuleTempTableController.prototype, "getTempTableById", null);
__decorate([
    (0, common_1.Post)('/migration/:migrationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Temp Table to a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, rule_temp_table_dto_1.CreateRuleTempTable]),
    __metadata("design:returntype", Promise)
], RuleTempTableController.prototype, "createTempTable", null);
__decorate([
    (0, common_1.Put)('/migration/:migrationId/table/:tableId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Temp Table from a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, rule_temp_table_dto_1.UpdateRuleTempTableDto]),
    __metadata("design:returntype", Promise)
], RuleTempTableController.prototype, "updateTempTable", null);
__decorate([
    (0, common_1.Delete)('/migration/:migrationId/table/:tableId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Temp Table from a migration' }),
    __param(0, (0, authed_user_decorator_1.AuthedUser)()),
    __param(1, (0, common_1.Param)('migrationId')),
    __param(2, (0, common_1.Param)('tableId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RuleTempTableController.prototype, "deleteTempTable", null);
RuleTempTableController = __decorate([
    (0, swagger_1.ApiTags)('DataRaptorRule'),
    (0, common_1.Controller)('ruleTempTable'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [rule_temp_table_service_1.RuleTempTableService,
        data_migration_service_1.DataMigrationService])
], RuleTempTableController);
exports.RuleTempTableController = RuleTempTableController;
//# sourceMappingURL=rule-temp-table.controller.js.map