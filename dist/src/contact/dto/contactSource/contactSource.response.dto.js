"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSourceResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ContactSourceResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactSourceId: { required: true, type: () => Number }, contactSourceName: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
exports.ContactSourceResponseDto = ContactSourceResponseDto;
//# sourceMappingURL=contactSource.response.dto.js.map