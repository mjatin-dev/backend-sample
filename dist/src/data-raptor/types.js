"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleObjectTemplateRefType = exports.RuleDepartmentEnum = exports.RuleRiskLevelEnum = exports.RuleTypeEnum = exports.RuleStatus = void 0;
var RuleStatus;
(function (RuleStatus) {
    RuleStatus["REQUESTED"] = "requested";
    RuleStatus["PROCESSING"] = "processing";
    RuleStatus["COMPLETED"] = "completed";
    RuleStatus["FAILED"] = "failed";
})(RuleStatus = exports.RuleStatus || (exports.RuleStatus = {}));
var RuleTypeEnum;
(function (RuleTypeEnum) {
    RuleTypeEnum["DuplicateDetection"] = "duplicate-detection";
    RuleTypeEnum["DataValidation"] = "data-validation";
    RuleTypeEnum["AnomalyDetection"] = "anomaly-detection";
})(RuleTypeEnum = exports.RuleTypeEnum || (exports.RuleTypeEnum = {}));
var RuleRiskLevelEnum;
(function (RuleRiskLevelEnum) {
    RuleRiskLevelEnum["Low"] = "low";
    RuleRiskLevelEnum["Medium"] = "medium";
    RuleRiskLevelEnum["High"] = "high";
})(RuleRiskLevelEnum = exports.RuleRiskLevelEnum || (exports.RuleRiskLevelEnum = {}));
var RuleDepartmentEnum;
(function (RuleDepartmentEnum) {
    RuleDepartmentEnum["Sales"] = "sales";
    RuleDepartmentEnum["Marketing"] = "marketing";
    RuleDepartmentEnum["Finance"] = "finance";
    RuleDepartmentEnum["Customer_Success"] = "customer-success";
    RuleDepartmentEnum["Others"] = "others";
})(RuleDepartmentEnum = exports.RuleDepartmentEnum || (exports.RuleDepartmentEnum = {}));
var RuleObjectTemplateRefType;
(function (RuleObjectTemplateRefType) {
    RuleObjectTemplateRefType["table"] = "table";
    RuleObjectTemplateRefType["field"] = "field";
})(RuleObjectTemplateRefType = exports.RuleObjectTemplateRefType || (exports.RuleObjectTemplateRefType = {}));
//# sourceMappingURL=types.js.map