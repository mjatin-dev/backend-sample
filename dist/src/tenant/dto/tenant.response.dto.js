"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class TenantResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantId: { required: true, type: () => Number }, tenantName: { required: true, type: () => String }, webURL: { required: true, type: () => String }, employeesNumber: { required: true, type: () => String }, suggestedDomain: { required: true, type: () => String }, subscriptionDate: { required: true, type: () => Date }, createDate: { required: true, type: () => Date }, ownerId: { required: true, type: () => Number }, ownerName: { required: true, type: () => String }, ownerEmail: { required: true, type: () => String }, contactInfo: { required: false, type: () => require("../entities/tenantContactInformation.entity").TenantContactInformation }, billingContactInfo: { required: false, type: () => require("../entities/tenantContactInformation.entity").TenantContactInformation } };
    }
}
exports.TenantResponseDto = TenantResponseDto;
//# sourceMappingURL=tenant.response.dto.js.map