"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSynchronizerSqsMessageDto = void 0;
const openapi = require("@nestjs/swagger");
class DataSynchronizerSqsMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, migrationId: { required: true, type: () => String }, dataSourceId: { required: true, type: () => String }, updates: { required: true, type: () => [require("../../../../../data-migration/dto/post-migration-record-update.dto").RecordUpdate] } };
    }
}
exports.DataSynchronizerSqsMessageDto = DataSynchronizerSqsMessageDto;
//# sourceMappingURL=data-synchronizer-sqs-message.dto.js.map