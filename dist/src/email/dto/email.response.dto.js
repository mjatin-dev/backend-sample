"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class EmailResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { emailId: { required: true, type: () => Number }, emailFrom: { required: true, type: () => String }, emailTo: { required: true, type: () => String }, emailSubject: { required: true, type: () => String }, emailContent: { required: true, type: () => String }, emailCreatedAt: { required: true, type: () => Date } };
    }
}
exports.EmailResponseDto = EmailResponseDto;
//# sourceMappingURL=email.response.dto.js.map