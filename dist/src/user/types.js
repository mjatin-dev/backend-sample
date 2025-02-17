"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressType = exports.Gender = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["SUPER_ADMIN"] = "super_admin";
    UserType["PLATFORM_USER"] = "admin";
    UserType["TENANT_USER"] = "owner";
    UserType["USER"] = "user";
})(UserType = exports.UserType || (exports.UserType = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "mail";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var AddressType;
(function (AddressType) {
    AddressType["MAILING"] = "mailing";
    AddressType["BUSINESS"] = "business";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
//# sourceMappingURL=types.js.map