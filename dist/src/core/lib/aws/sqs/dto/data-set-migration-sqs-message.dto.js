"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetMigrationSQSMessageDto = void 0;
const openapi = require("@nestjs/swagger");
class DataSetMigrationSQSMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, tenantId: { required: true, type: () => Number }, migrationId: { required: true, type: () => String }, dataSourceId: { required: true, type: () => String } };
    }
}
exports.DataSetMigrationSQSMessageDto = DataSetMigrationSQSMessageDto;
//# sourceMappingURL=data-set-migration-sqs-message.dto.js.map