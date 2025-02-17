"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class ActivityResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { activityId: { required: true, type: () => Number }, salePhaseId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, tenantUserId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, activityTypeId: { required: true, type: () => Number }, startDate: { required: true, type: () => Date }, dueDate: { required: true, type: () => Date }, status: { required: true, type: () => String }, contactStageId: { required: true, type: () => Number } };
    }
}
exports.ActivityResponseDto = ActivityResponseDto;
//# sourceMappingURL=activity.response.dto.js.map