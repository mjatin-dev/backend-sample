"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountContactResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class AccountContactResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountContactId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, isPrimary: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: false, type: () => Date }, Account: { required: false, type: () => require("../account/account.response.dto").AccountResponseDto }, Contact: { required: false, type: () => require("../../../contact/dto/contact/contact.response.dto").ContactResponseDto } };
    }
}
exports.AccountContactResponseDto = AccountContactResponseDto;
//# sourceMappingURL=accountContact.response.dto.js.map