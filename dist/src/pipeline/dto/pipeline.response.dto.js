"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelineResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class pipelineResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pipelineId: { required: true, type: () => Number }, pipelineName: { required: true, type: () => String }, pipelineDescription: { required: true, type: () => String }, tenantId: { required: true, type: () => Number }, creatorTenantUserId: { required: true, type: () => Number }, isActive: { required: true, type: () => Boolean }, createDate: { required: true, type: () => Date }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date }, pipelineStages: { required: true, type: () => [require("../entities/pipelineStage.entity").PipelineStage] }, pipelineDocuments: { required: true, type: () => [require("../entities/pipelineDocument.entity").PipelineDocument] }, pipelineProducts: { required: true, type: () => [require("../../product/entities/product.entity").Product] }, pipelineUsers: { required: true, type: () => [require("../../user/entities/user.entity").User] } };
    }
}
exports.pipelineResponseDto = pipelineResponseDto;
//# sourceMappingURL=pipeline.response.dto.js.map