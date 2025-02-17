"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactStageResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ContactStageResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactStageId: { required: true, type: () => Number }, contactStageName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.ContactStageResponseDto = ContactStageResponseDto;
//# sourceMappingURL=contactStage.response.dto.js.map