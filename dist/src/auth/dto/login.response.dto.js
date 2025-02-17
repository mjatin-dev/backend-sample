"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class LoginResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: false, type: () => String }, session: { required: false, type: () => String } };
    }
}
exports.LoginResponseDto = LoginResponseDto;
//# sourceMappingURL=login.response.dto.js.map