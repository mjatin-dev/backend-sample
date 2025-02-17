"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantUpdateEventDto = void 0;
const openapi = require("@nestjs/swagger");
class TenantUpdateEventDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantId: { required: true, type: () => String }, table: { required: true, type: () => String }, ruleIds: { required: false, type: () => [String] }, type: { required: true, type: () => String } };
    }
}
exports.TenantUpdateEventDto = TenantUpdateEventDto;
//# sourceMappingURL=tenant-update-event.dto.js.map