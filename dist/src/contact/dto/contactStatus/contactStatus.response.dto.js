"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactStatusResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ContactStatusResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactStatusId: { required: true, type: () => Number }, contactStatusName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.ContactStatusResponseDto = ContactStatusResponseDto;
//# sourceMappingURL=contactStatus.response.dto.js.map