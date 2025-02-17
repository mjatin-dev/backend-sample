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
exports.IntegrationService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../core/types");
const integration_repository_1 = require("./integration.repository");
const integrationState_repository_1 = require("./integrationState.repository");
const user_service_1 = require("../user/services/user.service");
const tenant_service_1 = require("../tenant/services/tenant.service");
const types_2 = require("../core/types");
const types_3 = require("../user/types");
const google_auth_service_1 = require("../core/lib/google/google-auth.service");
const salesforce_auth_service_1 = require("../core/lib/salesforce/salesforce-auth.service");
const http_1 = require("../common/http");
const dataSource_repository_1 = require("../data-source/dataSource.repository");
const dataMigration_repository_1 = require("../data-migration/repositories/dataMigration.repository");
const sqs_message_producer_service_1 = require("../core/lib/aws/sqs/sqs-message-producer.service");
const office365_service_1 = require("../core/lib/office365/office365.service");
let IntegrationService = class IntegrationService {
    constructor(integrationRepository, integrationStateRepository, dataSourceRepository, dataMigrationRepository, sqsMessageProducerService, office365Service, userService, tenantService, googleAuthService, salesforceAuthService) {
        this.integrationRepository = integrationRepository;
        this.integrationStateRepository = integrationStateRepository;
        this.dataSourceRepository = dataSourceRepository;
        this.dataMigrationRepository = dataMigrationRepository;
        this.sqsMessageProducerService = sqsMessageProducerService;
        this.office365Service = office365Service;
        this.userService = userService;
        this.tenantService = tenantService;
        this.googleAuthService = googleAuthService;
        this.salesforceAuthService = salesforceAuthService;
    }
    async handleAuthCallBack(authedUser, appId, query) {
        let triggerDataMigration = false;
        switch (appId) {
            case types_2.AppIds.GMAIL:
                await this.googleAuthService.handleAuthCallback(query, authedUser);
                break;
            case types_2.AppIds.SALESFORCE:
                await this.salesforceAuthService.handleAuthCallback(query, types_2.AppIds.SALESFORCE, authedUser);
                break;
            case types_2.AppIds.SALESFORCE_USER:
                await this.salesforceAuthService.handleAuthCallback(query, types_2.AppIds.SALESFORCE_USER, authedUser);
                break;
            case types_2.AppIds.OFFICE365:
                triggerDataMigration = true;
                await this.office365Service.handleAuthCallback(query, authedUser);
                break;
            default:
                throw new common_1.NotFoundException('integration callback not found');
        }
        if (triggerDataMigration) {
            const dataSource = await this.dataSourceRepository.findOne({
                where: { integrationId: appId },
            });
            if (!dataSource) {
                console.log('Data source not found');
                return;
            }
            const whereConditions = { dataSourceId: dataSource.dataSourceId };
            if (dataSource.type === 'tenant') {
                whereConditions['tenantId'] = authedUser.tenantId;
            }
            else {
                whereConditions['userId'] = authedUser.userId;
            }
            const dataMigration = await this.dataMigrationRepository.findOne({
                where: whereConditions,
            });
            if (dataMigration) {
                console.log('Data migration already exists');
                return;
            }
            const newMigrationPayload = {
                dataSourceId: dataSource.dataSourceId,
            };
            if (dataSource.type === 'user') {
                newMigrationPayload['userId'] = authedUser.userId;
            }
            else {
                newMigrationPayload['tenantId'] = authedUser.tenantId;
            }
            const newMigrationBody = this.dataMigrationRepository.create(newMigrationPayload);
            const newMigration = await this.dataMigrationRepository.save(newMigrationBody);
            await this.sqsMessageProducerService.sendDataSetQueueMessage({
                migrationId: newMigration.dataMigrationId,
                userId: authedUser.userId,
                tenantId: authedUser.tenantId,
                dataSourceId: dataSource.dataSourceId,
            });
        }
    }
    async handleAuthorize(authedUser, appId, optionalArgs) {
        switch (appId) {
            case types_2.AppIds.GMAIL:
                const googleRedirectUrl = await this.googleAuthService.authorize(appId, authedUser);
                return new http_1.SuccessResponseObject('success', googleRedirectUrl);
            case types_2.AppIds.SALESFORCE:
                const salesforceRedirectUrl = await this.salesforceAuthService.authorize(authedUser, optionalArgs);
                return new http_1.SuccessResponseObject('success', salesforceRedirectUrl);
            case types_2.AppIds.SALESFORCE_USER:
                const salesforceUserRedirectUrl = await this.salesforceAuthService.authorizeUserIntegration(authedUser, optionalArgs);
                return new http_1.SuccessResponseObject('success', salesforceUserRedirectUrl);
            case types_2.AppIds.OFFICE365:
                const redirectUrl = await this.office365Service.authorize(authedUser);
                return new http_1.SuccessResponseObject('success', redirectUrl);
            default:
                throw new common_1.NotFoundException('Not implemented yet');
        }
    }
    async getIntegrationsApps(userId, tenantId) {
        const integrationsByUser = await this.integrationRepository.getIntegrationsWithStateByUser(userId);
        const integrationsByTenant = await this.integrationRepository.getIntegrationsWithStateByTenant(tenantId);
        const allIntegrations = [...integrationsByUser, ...integrationsByTenant];
        return allIntegrations.map((integration) => {
            var _a;
            integration.applicationStatus = ((_a = integration.integratedApps) === null || _a === void 0 ? void 0 : _a.some((app) => {
                return app.userId === userId || app.tenantId === tenantId;
            }))
                ? types_1.APPLICATION_STATUS.INSTALLED
                : types_1.APPLICATION_STATUS.NOT_INSTALLED;
            delete integration.integratedApps;
            return integration;
        });
    }
    async getIntegration(applicationId) {
        const integration = await this.integrationRepository.findOne({
            where: { applicationId },
        });
        return integration;
    }
    async upgradeUserToTenantOwner(userId, contactInfo, orgName) {
        const user = await this.userService.findOne({ userId: userId });
        if (user.userType !== types_3.UserType.TENANT_USER && !user.tenantId) {
            const tenant = await this.tenantService.create({
                tenantName: orgName,
                billingContactInfo: contactInfo,
                contactInfo: contactInfo,
                ownerName: '',
                ownerEmail: '',
            }, user);
            await this.userService.update(userId, {
                tenantId: tenant.tenantId,
                userType: types_3.UserType.TENANT_USER,
            });
            return { tenantId: tenant.tenantId };
        }
        return { tenantId: user.tenantId };
    }
    async getIntegrationWithInstallStatus(applicationId, userId, tenantId) {
        var _a;
        const integrationByUser = await this.integrationRepository.getOneIntegrationWithStateByUser(userId, applicationId);
        const integrationByTenant = await this.integrationRepository.getOneIntegrationWithStateByTenant(tenantId, applicationId);
        const integration = integrationByUser == null ? integrationByTenant : integrationByUser;
        if (!integration)
            throw new common_1.NotFoundException('Not integrated app yet');
        integration.applicationStatus = ((_a = integration.integratedApps) === null || _a === void 0 ? void 0 : _a.some((app) => app.userId === userId || app.tenantId === tenantId))
            ? types_1.APPLICATION_STATUS.INSTALLED
            : types_1.APPLICATION_STATUS.NOT_INSTALLED;
        delete integration.integratedApps;
        return integration;
    }
    async uninstall(appId, userId, tenantId) {
        const integrationByUser = await this.integrationRepository.getOneIntegrationWithStateByUser(userId, appId);
        const integrationByTenant = await this.integrationRepository.getOneIntegrationWithStateByTenant(tenantId, appId);
        const integration = integrationByUser == null ? integrationByTenant : integrationByUser;
        if (!integration ||
            !(integration === null || integration === void 0 ? void 0 : integration.integratedApps) ||
            !(integration === null || integration === void 0 ? void 0 : integration.integratedApps[0].id)) {
            throw new common_1.NotFoundException('Not integrated app yet');
        }
        await this.integrationStateRepository.delete(integration === null || integration === void 0 ? void 0 : integration.integratedApps[0].id);
        const dataSource = await this.dataSourceRepository.findOne({
            where: { integrationId: integration.applicationId },
        });
        if (!dataSource) {
            return;
        }
        const whereConditions = { dataSourceId: dataSource.dataSourceId };
        if (dataSource.type === 'tenant') {
            whereConditions['tenantId'] = tenantId;
        }
        else {
            whereConditions['userId'] = userId;
        }
        const dataMigration = await this.dataMigrationRepository.findOne({
            where: whereConditions,
        });
        if (!dataMigration) {
            return;
        }
        await this.sqsMessageProducerService.sendDataMigrationRemovalQueueMessage({
            migrationId: dataMigration.dataMigrationId,
            userOrTenantId: dataSource.type === 'tenant' ? tenantId.toString() : userId.toString(),
            dataSourceId: dataSource.dataSourceId,
        });
    }
};
IntegrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(9, (0, common_1.Inject)((0, common_1.forwardRef)(() => salesforce_auth_service_1.SalesforceAuthService))),
    __metadata("design:paramtypes", [integration_repository_1.IntegrationRepository,
        integrationState_repository_1.IntegrationStateRepository,
        dataSource_repository_1.DataSourceRepository,
        dataMigration_repository_1.DataMigrationRepository,
        sqs_message_producer_service_1.SQSMessageProducerService,
        office365_service_1.Office365Service,
        user_service_1.UserService,
        tenant_service_1.TenantService,
        google_auth_service_1.GoogleAuthService,
        salesforce_auth_service_1.SalesforceAuthService])
], IntegrationService);
exports.IntegrationService = IntegrationService;
//# sourceMappingURL=integration.service.js.map