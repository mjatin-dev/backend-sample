"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = void 0;
const lodash_omitby_1 = __importDefault(require("lodash.omitby"));
const lodash_isundefined_1 = __importDefault(require("lodash.isundefined"));
const cleanObject = (object) => {
    return (0, lodash_omitby_1.default)(object, lodash_isundefined_1.default);
};
exports.cleanObject = cleanObject;
//# sourceMappingURL=utils.js.map