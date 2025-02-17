"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class IndustryResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { industryId: { required: true, type: () => Number }, title: { required: true, type: () => String }, code: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.IndustryResponseDto = IndustryResponseDto;
//# sourceMappingURL=industry.response.dto.js.map