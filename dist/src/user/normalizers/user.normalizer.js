"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNormalizer = void 0;
exports.userNormalizer = {
    getCreateUserResponseDto(user) {
        return {
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
            userType: user.userType,
            userActive: user.userActive,
            tenantId: user.tenantId,
            userCreatedAt: user.userCreatedAt,
            userUpdatedAt: user.userUpdatedAt,
        };
    },
    getUserResponseDto(user) {
        return {
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
            userType: user.userType,
            userActive: user.userActive,
            tenantId: user.tenantId,
            userCreatedAt: user.userCreatedAt,
            userUpdatedAt: user.userUpdatedAt,
            contactInfo: user.contactInfo
                ? {
                    userContInfoId: user.contactInfo.userContInfoId,
                    mobileNumber: user.contactInfo.mobileNumber,
                    phoneNumber: user.contactInfo.phoneNumber,
                }
                : undefined,
        };
    },
};
//# sourceMappingURL=user.normalizer.js.map