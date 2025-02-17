"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class verifyEmailResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { verified: { required: false, type: () => Boolean }, message: { required: false, type: () => String } };
    }
}
exports.verifyEmailResponseDto = verifyEmailResponseDto;
//# sourceMappingURL=verify-email.response.dto.js.map