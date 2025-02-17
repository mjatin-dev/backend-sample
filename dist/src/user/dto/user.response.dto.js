"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class UserResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, userName: { required: true, type: () => String }, userEmail: { required: true, type: () => String }, userType: { required: true, enum: require("../types").UserType }, userActive: { required: true, type: () => Boolean }, tenantId: { required: false, type: () => Number }, userCreatedAt: { required: true, type: () => Date }, userUpdatedAt: { required: true, type: () => Date }, contactInfo: { required: false, type: () => ({ userContInfoId: { required: true, type: () => Number }, phoneNumber: { required: false, type: () => String }, mobileNumber: { required: false, type: () => String } }) } };
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=user.response.dto.js.map