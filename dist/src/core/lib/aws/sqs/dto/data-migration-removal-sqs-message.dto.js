"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMigrationRemovalSQSMessageDto = void 0;
const openapi = require("@nestjs/swagger");
class DataMigrationRemovalSQSMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { migrationId: { required: true, type: () => String }, dataSourceId: { required: true, type: () => String }, userOrTenantId: { required: true, type: () => String } };
    }
}
exports.DataMigrationRemovalSQSMessageDto = DataMigrationRemovalSQSMessageDto;
//# sourceMappingURL=data-migration-removal-sqs-message.dto.js.map