"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnomalyRuleApplierSQSMessageDto = exports.AnomalyRuleAction = exports.AnomalyAnalysisModeEnum = void 0;
const openapi = require("@nestjs/swagger");
var AnomalyAnalysisModeEnum;
(function (AnomalyAnalysisModeEnum) {
    AnomalyAnalysisModeEnum["FROM_RULE"] = "RULE";
    AnomalyAnalysisModeEnum["FROM_RECORD"] = "RECORDS";
})(AnomalyAnalysisModeEnum = exports.AnomalyAnalysisModeEnum || (exports.AnomalyAnalysisModeEnum = {}));
var AnomalyRuleAction;
(function (AnomalyRuleAction) {
    AnomalyRuleAction["APPLY"] = "apply";
    AnomalyRuleAction["RE_APPLY"] = "re-apply";
    AnomalyRuleAction["REMOVE"] = "remove";
})(AnomalyRuleAction = exports.AnomalyRuleAction || (exports.AnomalyRuleAction = {}));
class AnomalyRuleApplierSQSMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantId: { required: true, type: () => Number }, dataSourceId: { required: true, type: () => String }, migrationId: { required: true, type: () => String }, analysisMode: { required: true, enum: require("./anomaly-rule-applier-sqs-message.dto").AnomalyAnalysisModeEnum }, ruleAction: { required: false, enum: require("./anomaly-rule-applier-sqs-message.dto").AnomalyRuleAction }, table: { required: true, type: () => String }, ruleId: { required: false, type: () => String }, records: { required: false, type: () => [String] } };
    }
}
exports.AnomalyRuleApplierSQSMessageDto = AnomalyRuleApplierSQSMessageDto;
//# sourceMappingURL=anomaly-rule-applier-sqs-message.dto.js.map