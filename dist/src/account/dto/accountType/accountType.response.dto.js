"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTypeResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class AccountTypeResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountTypeId: { required: true, type: () => Number }, accountTypeName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.AccountTypeResponseDto = AccountTypeResponseDto;
//# sourceMappingURL=accountType.response.dto.js.map