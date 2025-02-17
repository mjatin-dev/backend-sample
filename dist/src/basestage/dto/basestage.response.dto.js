"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseStageResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class baseStageResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { baseStageId: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, type: { required: true, type: () => String } };
    }
}
exports.baseStageResponseDto = baseStageResponseDto;
//# sourceMappingURL=basestage.response.dto.js.map