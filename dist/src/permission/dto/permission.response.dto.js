"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class PermissionResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, code: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.PermissionResponseDto = PermissionResponseDto;
//# sourceMappingURL=permission.response.dto.js.map