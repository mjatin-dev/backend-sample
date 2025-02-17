"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class DealResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealId: { required: true, type: () => Number }, dealName: { required: true, type: () => String }, description: { required: true, type: () => String }, pipelineId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, tenantUserId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, campaignId: { required: true, type: () => Number }, createdBy: { required: true, type: () => Number }, totalAmount: { required: true, type: () => Number }, currency: { required: true, type: () => String }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date }, createdDate: { required: true, type: () => Date } };
    }
}
exports.DealResponseDto = DealResponseDto;
//# sourceMappingURL=deal.response.dto.js.map