"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedRuleDto = void 0;
const openapi = require("@nestjs/swagger");
class FormattedRuleDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { table: { required: true, type: () => String }, subQueries: { required: false, type: () => [Object] }, join: { required: false, type: () => [require("./rule.dto").JoinClause] }, where: { required: false, type: () => [Object] }, having: { required: false, type: () => [Object] }, groupBy: { required: false, type: () => [String] }, fields: { required: false, type: () => [String] }, limit: { required: false, type: () => Number } };
    }
}
exports.FormattedRuleDto = FormattedRuleDto;
//# sourceMappingURL=formatted-rule.dto.js.map