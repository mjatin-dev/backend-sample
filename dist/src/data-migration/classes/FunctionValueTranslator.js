"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionValueTranslator = void 0;
const function_value_dto_1 = require("../dto/function-value.dto");
class FunctionValueTranslator {
    static translateFunctionValue(functionValue) {
        switch (functionValue.function) {
            case function_value_dto_1.FunctionValueEnum.getYear:
                return [`EXTRACT(YEAR FROM "${functionValue.field}")`, 'year'];
            case function_value_dto_1.FunctionValueEnum.getMonth:
                return [`EXTRACT(MONTH FROM "${functionValue.field}")`, 'month'];
            case function_value_dto_1.FunctionValueEnum.getDay:
                return [`EXTRACT(DAY FROM "${functionValue.field}")`, 'day'];
            default:
                throw new Error('Invalid function');
        }
    }
}
exports.FunctionValueTranslator = FunctionValueTranslator;
//# sourceMappingURL=FunctionValueTranslator.js.map