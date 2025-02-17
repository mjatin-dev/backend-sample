"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const typeorm_1 = require("@nestjs/typeorm");
const logger_config_1 = require("./config/logger.config");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const orm_config_1 = require("./config/orm.config");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const profile_module_1 = require("./profile/profile.module");
const contact_module_1 = require("./contact/contact.module");
const account_module_1 = require("./account/account.module");
const deal_module_1 = require("./deal/deal.module");
const email_module_1 = require("./email/email.module");
const permission_module_1 = require("./permission/permission.module");
const tenant_module_1 = require("./tenant/tenant.module");
const tenantUserJobRole_module_1 = require("./tenantUserJobRole/tenantUserJobRole.module");
const industry_module_1 = require("./industry/industry.module");
const pipeline_module_1 = require("./pipeline/pipeline.module");
const activity_module_1 = require("./activity/activity.module");
const integration_module_1 = require("./integration/integration.module");
const firebase_module_1 = require("./core/lib/firebase/firebase.module");
const basestage_module_1 = require("./basestage/basestage.module");
const resource_module_1 = require("./resource/resource.module");
const data_source_module_1 = require("./data-source/data-source.module");
const data_migration_module_1 = require("./data-migration/data-migration.module");
const sqs_module_1 = require("./core/lib/aws/sqs/sqs.module");
const kms_module_1 = require("./core/lib/aws/kms/kms.module");
const data_raptor_module_1 = require("./data-raptor/data-raptor.module");
const open_ai_module_1 = require("./open-ai/open-ai.module");
const deduplication_module_1 = require("./deduplication/deduplication.module");
const internal_process_module_1 = require("./internal-process/internal-process.module");
const ai_recommendation_module_1 = require("./ai-recommendation/ai-recommendation.module");
const salesforce_module_1 = require("./core/lib/salesforce/salesforce.module");
const office365_module_1 = require("./core/lib/office365/office365.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRoot(logger_config_1.pinoLoggerConfig),
            typeorm_1.TypeOrmModule.forRoot(orm_config_1.typeOrmConfig),
            firebase_module_1.FirebaseModule.forRoot({
                firestoreMainDoc: 'main',
            }),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => salesforce_module_1.SalesforceModule),
            mail_module_1.MailModule,
            product_module_1.ProductModule,
            profile_module_1.ProfileModule,
            contact_module_1.ContactModule,
            account_module_1.AccountModule,
            deal_module_1.DealModule,
            email_module_1.EmailModule,
            user_module_1.UserModule,
            permission_module_1.PermissionModule,
            tenant_module_1.TenantModule,
            tenantUserJobRole_module_1.TenantUserJobRoleModule,
            industry_module_1.IndustryModule,
            pipeline_module_1.pipelineModule,
            resource_module_1.ResourceModule,
            activity_module_1.ActivityModule,
            integration_module_1.IntegrationModule,
            basestage_module_1.BaseStageModule,
            data_source_module_1.DataSourceModule,
            data_migration_module_1.DataMigrationModule,
            sqs_module_1.SqsModule,
            kms_module_1.KmsModule,
            data_raptor_module_1.DataRaptorModule,
            open_ai_module_1.OpenAIModule,
            deduplication_module_1.DeduplicationModule,
            internal_process_module_1.InternalProcessModule,
            ai_recommendation_module_1.AiRecommendationModule,
            office365_module_1.Office365Module,
        ],
        providers: [],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map