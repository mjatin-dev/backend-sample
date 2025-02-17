"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ResourceResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, dataType: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean } };
    }
}
exports.ResourceResponseDto = ResourceResponseDto;
//# sourceMappingURL=resource.response.dto.js.map