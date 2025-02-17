"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDeduplicationConfigResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateDeduplicationConfigResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { DeDuplicationConfigId: { required: true, type: () => String }, migrationId: { required: true, type: () => String }, tableName: { required: true, type: () => String }, fields: { required: true, type: () => [String] }, migrationObject: { required: false, type: () => require("../../data-migration/entities/dataMigration.entity").DataMigration } };
    }
}
exports.CreateDeduplicationConfigResponseDto = CreateDeduplicationConfigResponseDto;
//# sourceMappingURL=deduplication-config.response.dto.js.map