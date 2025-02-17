"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRaptorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ai_recommendation_module_1 = require("../ai-recommendation/ai-recommendation.module");
const data_raptor_rule_controller_1 = require("./rule/data-raptor-rule.controller");
const data_raptor_record_controller_1 = require("./rule-record/data-raptor-record.controller");
const rule_service_1 = require("./rule/rule.service");
const rule_department_service_1 = require("./rule-department/rule-department.service");
const rule_risk_service_1 = require("./rule-risk/rule-risk.service");
const rule_type_service_1 = require("./rule-type/rule-type.service");
const rule_repository_1 = require("./rule/rule.repository");
const data_migration_module_1 = require("../data-migration/data-migration.module");
const sqs_module_1 = require("../core/lib/aws/sqs/sqs.module");
const update_gateway_1 = require("./gateway/update.gateway");
const auth_module_1 = require("../auth/auth.module");
const data_raptor_rule_type_controller_1 = require("./rule-type/data-raptor-rule-type.controller");
const data_raptor_rule_risk_controller_1 = require("./rule-risk/data-raptor-rule-risk.controller");
const data_raptor_rule_department_controller_1 = require("./rule-department/data-raptor-rule-department.controller");
const rule_department_repository_1 = require("./rule-department/rule-department.repository");
const rule_risk_repository_1 = require("./rule-risk/rule-risk.repository");
const rule_type_repository_1 = require("./rule-type/rule-type.repository");
const rule_template_repository_1 = require("./rule-template/rule-template.repository");
const rule_object_template_ref_repository_1 = require("./rule-template/rule-object-template-ref.repository");
const data_raptor_template_controller_1 = require("./rule-template/data-raptor-template.controller");
const rule_template_service_1 = require("./rule-template/rule-template.service");
const rule_validation_pattern_repository_1 = require("./rule-validation-pattern/rule-validation-pattern.repository");
const data_raptor_validation_pattern_controller_1 = require("./rule-validation-pattern/data-raptor-validation-pattern.controller");
const rule_validation_pattern_service_1 = require("./rule-validation-pattern/rule-validation-pattern.service");
const rule_data_anomaly_controller_1 = require("./rule-data-anomaly/rule-data-anomaly.controller");
const rule_data_anomaly_service_1 = require("./rule-data-anomaly/rule-data-anomaly.service");
const rule_data_anomaly_repository_1 = require("./rule-data-anomaly/rule-data-anomaly.repository");
const rule_temp_table_controller_1 = require("./rule-temp-table/rule-temp-table.controller");
const rule_temp_table_service_1 = require("./rule-temp-table/rule-temp-table.service");
const rule_temp_table_repository_1 = require("./rule-temp-table/rule-temp-table.repository");
let DataRaptorModule = class DataRaptorModule {
};
DataRaptorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                rule_repository_1.RuleRepository,
                rule_department_repository_1.RuleDepartmentRepository,
                rule_risk_repository_1.RuleRiskRepository,
                rule_type_repository_1.RuleTypeRepository,
                rule_template_repository_1.RuleTemplateRepository,
                rule_object_template_ref_repository_1.RuleObjectTemplateRefRepository,
                rule_validation_pattern_repository_1.DataRaptorValidationPatternRepository,
                rule_temp_table_repository_1.RuleTempTableRepository,
            ]),
            data_migration_module_1.DataMigrationModule,
            sqs_module_1.SqsModule,
            auth_module_1.AuthModule,
            ai_recommendation_module_1.AiRecommendationModule,
        ],
        controllers: [
            data_raptor_rule_controller_1.DataRaptorRuleController,
            data_raptor_record_controller_1.DataRaptorRecordController,
            data_raptor_rule_type_controller_1.DataRaptorRuleTypeController,
            data_raptor_rule_risk_controller_1.DataRaptorRuleRiskController,
            data_raptor_rule_department_controller_1.DataRaptorRuleDepartmentController,
            data_raptor_template_controller_1.DataRaptorTemplateController,
            data_raptor_validation_pattern_controller_1.DataRaptorValidationPatternController,
            rule_data_anomaly_controller_1.RuleDataAnomalyController,
            rule_temp_table_controller_1.RuleTempTableController,
        ],
        providers: [
            rule_service_1.RuleService,
            rule_department_service_1.RuleDepartmentService,
            rule_risk_service_1.RuleRiskService,
            rule_type_service_1.RuleTypeService,
            update_gateway_1.UpdateGateway,
            rule_template_service_1.RuleTemplateService,
            rule_validation_pattern_service_1.DataRaptorValidationPatternService,
            rule_data_anomaly_service_1.RuleDataAnomalyService,
            rule_data_anomaly_repository_1.RuleDataAnomalyRepository,
            rule_temp_table_service_1.RuleTempTableService,
        ],
    })
], DataRaptorModule);
exports.DataRaptorModule = DataRaptorModule;
//# sourceMappingURL=data-raptor.module.js.map