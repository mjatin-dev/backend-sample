"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStageResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class AccountStageResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountStageId: { required: true, type: () => Number }, accountStageName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.AccountStageResponseDto = AccountStageResponseDto;
//# sourceMappingURL=accountStage.response.dto.js.map