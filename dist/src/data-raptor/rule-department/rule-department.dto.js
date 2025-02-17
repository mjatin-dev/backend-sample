"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleDepartmentDto = void 0;
const openapi = require("@nestjs/swagger");
class RuleDepartmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, label: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.RuleDepartmentDto = RuleDepartmentDto;
//# sourceMappingURL=rule-department.dto.js.map