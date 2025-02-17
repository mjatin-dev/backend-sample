"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionValue = exports.FunctionValueEnum = void 0;
const openapi = require("@nestjs/swagger");
var FunctionValueEnum;
(function (FunctionValueEnum) {
    FunctionValueEnum["getYear"] = "getYear";
    FunctionValueEnum["getMonth"] = "getMonth";
    FunctionValueEnum["getDay"] = "getDay";
})(FunctionValueEnum = exports.FunctionValueEnum || (exports.FunctionValueEnum = {}));
class FunctionValue {
    static _OPENAPI_METADATA_FACTORY() {
        return { function: { required: true, enum: require("./function-value.dto").FunctionValueEnum }, field: { required: true, type: () => String } };
    }
}
exports.FunctionValue = FunctionValue;
//# sourceMappingURL=function-value.dto.js.map