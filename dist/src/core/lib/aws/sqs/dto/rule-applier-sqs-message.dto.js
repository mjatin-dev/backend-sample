"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleApplierActions = exports.RuleApplierSqsMessageDto = void 0;
const openapi = require("@nestjs/swagger");
class RuleApplierSqsMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, migrationId: { required: true, type: () => String }, ruleIds: { required: true, type: () => [String] }, action: { required: true, enum: require("./rule-applier-sqs-message.dto").RuleApplierActions } };
    }
}
exports.RuleApplierSqsMessageDto = RuleApplierSqsMessageDto;
var RuleApplierActions;
(function (RuleApplierActions) {
    RuleApplierActions["APPLY"] = "apply";
    RuleApplierActions["REMOVE"] = "remove";
    RuleApplierActions["UPDATE"] = "update";
    RuleApplierActions["RE_APPLY"] = "re-apply";
})(RuleApplierActions = exports.RuleApplierActions || (exports.RuleApplierActions = {}));
//# sourceMappingURL=rule-applier-sqs-message.dto.js.map