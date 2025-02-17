"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatusResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class AccountStatusResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountStatusId: { required: true, type: () => Number }, accountStatusName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.AccountStatusResponseDto = AccountStatusResponseDto;
//# sourceMappingURL=accountStatus.response.dto.js.map