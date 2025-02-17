"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantNormalizer = void 0;
const types_1 = require("../../user/types");
exports.tenantNormalizer = {
    getTenantResponseDto(tenant) {
        return {
            tenantId: tenant.tenantId,
            tenantName: tenant.tenantName,
            webURL: tenant.webURL,
            employeesNumber: tenant.employeesNumber,
            suggestedDomain: tenant.suggestedDomain,
            createDate: tenant.createDate,
            subscriptionDate: tenant.subscriptionDate,
            ownerId: tenant.owner.userId,
            ownerName: tenant.owner.userName,
            ownerEmail: tenant.owner.userEmail,
            contactInfo: tenant.contactInfos.find((info) => info.addressType === types_1.AddressType.MAILING && info.isCurrent),
            billingContactInfo: tenant.contactInfos.find((info) => info.addressType === types_1.AddressType.BUSINESS && info.isCurrent),
        };
    },
};
//# sourceMappingURL=tenant.normalizer.js.map