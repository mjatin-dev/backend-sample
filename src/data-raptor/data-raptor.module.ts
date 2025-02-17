import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiRecommendationModule } from '@/ai-recommendation/ai-recommendation.module';
import { DataRaptorRuleController } from './rule/data-raptor-rule.controller';
import { DataRaptorRecordController } from './rule-record/data-raptor-record.controller';
import { RuleService } from './rule/rule.service';
import { RuleDepartmentService } from './rule-department/rule-department.service';
import { RuleRiskService } from './rule-risk/rule-risk.service';
import { RuleTypeService } from './rule-type/rule-type.service';
import { RuleRepository } from './rule/rule.repository';
import { DataMigrationModule } from '@/data-migration/data-migration.module';
import { SqsModule } from '@/core/lib/aws/sqs/sqs.module';
import { UpdateGateway } from './gateway/update.gateway';
import { AuthModule } from '@/auth/auth.module';
import { DataRaptorRuleTypeController } from './rule-type/data-raptor-rule-type.controller';
import { DataRaptorRuleRiskController } from './rule-risk/data-raptor-rule-risk.controller';
import { DataRaptorRuleDepartmentController } from './rule-department/data-raptor-rule-department.controller';
import { RuleDepartmentRepository } from './rule-department/rule-department.repository';
import { RuleRiskRepository } from './rule-risk/rule-risk.repository';
import { RuleTypeRepository } from './rule-type/rule-type.repository';
import { RuleTemplateRepository } from './rule-template/rule-template.repository';
import { RuleObjectTemplateRefRepository } from './rule-template/rule-object-template-ref.repository';
import { DataRaptorTemplateController } from './rule-template/data-raptor-template.controller';
import { RuleTemplateService } from './rule-template/rule-template.service';
import { DataRaptorValidationPatternRepository } from './rule-validation-pattern/rule-validation-pattern.repository';
import { DataRaptorValidationPatternController } from './rule-validation-pattern/data-raptor-validation-pattern.controller';
import { DataRaptorValidationPatternService } from './rule-validation-pattern/rule-validation-pattern.service';
import { RuleDataAnomalyController } from './rule-data-anomaly/rule-data-anomaly.controller';
import { RuleDataAnomalyService } from './rule-data-anomaly/rule-data-anomaly.service';
import { RuleDataAnomalyRepository } from './rule-data-anomaly/rule-data-anomaly.repository';
import { RuleTempTableController } from './rule-temp-table/rule-temp-table.controller';
import { RuleTempTableService } from './rule-temp-table/rule-temp-table.service';
import { RuleTempTableRepository } from './rule-temp-table/rule-temp-table.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RuleRepository,
      RuleDepartmentRepository,
      RuleRiskRepository,
      RuleTypeRepository,
      RuleTemplateRepository,
      RuleObjectTemplateRefRepository,
      DataRaptorValidationPatternRepository,
      RuleTempTableRepository,
    ]),
    DataMigrationModule,
    SqsModule,
    AuthModule,
    AiRecommendationModule,
  ],
  controllers: [
    DataRaptorRuleController,
    DataRaptorRecordController,
    DataRaptorRuleTypeController,
    DataRaptorRuleRiskController,
    DataRaptorRuleDepartmentController,
    DataRaptorTemplateController,
    DataRaptorValidationPatternController,
    RuleDataAnomalyController,
    RuleTempTableController,
  ],
  providers: [
    RuleService,
    RuleDepartmentService,
    RuleRiskService,
    RuleTypeService,
    UpdateGateway,
    RuleTemplateService,
    DataRaptorValidationPatternService,
    RuleDataAnomalyService,
    RuleDataAnomalyRepository,
    RuleTempTableService,
  ],
})
export class DataRaptorModule {}
