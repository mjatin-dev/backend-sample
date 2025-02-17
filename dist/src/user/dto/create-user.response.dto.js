"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateUserResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, userName: { required: true, type: () => String }, userEmail: { required: true, type: () => String }, userType: { required: true, enum: require("../types").UserType }, userActive: { required: true, type: () => Boolean }, tenantId: { required: false, type: () => Number }, userCreatedAt: { required: true, type: () => Date }, userUpdatedAt: { required: true, type: () => Date } };
    }
}
exports.CreateUserResponseDto = CreateUserResponseDto;
//# sourceMappingURL=create-user.response.dto.js.map