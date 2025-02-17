"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
const openapi = require("@nestjs/swagger");
class Condition {
    static _OPENAPI_METADATA_FACTORY() {
        return { field: { required: true, type: () => Object }, operator: { required: true, type: () => String }, value: { required: true, type: () => Object } };
    }
}
exports.Condition = Condition;
//# sourceMappingURL=condition.dto.js.map