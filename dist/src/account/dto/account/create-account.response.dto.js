"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateAccountResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountId: { required: true, type: () => Number }, accountName: { required: true, type: () => String }, description: { required: true, type: () => String }, company: { required: true, type: () => String }, webURL: { required: true, type: () => String }, industryId: { required: true, type: () => Number }, foundedDate: { required: true, type: () => Date }, employeesNumber: { required: true, type: () => Number }, revenuePerYear: { required: true, type: () => Number }, childOf: { required: true, type: () => Number }, createDate: { required: true, type: () => Date }, createdBy: { required: true, type: () => Number } };
    }
}
exports.CreateAccountResponseDto = CreateAccountResponseDto;
//# sourceMappingURL=create-account.response.dto.js.map