"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntervalType = exports.TableStatType = void 0;
const openapi = require("@nestjs/swagger");
var TableStatType;
(function (TableStatType) {
    TableStatType["SCORE"] = "score";
})(TableStatType = exports.TableStatType || (exports.TableStatType = {}));
var IntervalType;
(function (IntervalType) {
    IntervalType["DAY"] = "day";
    IntervalType["WEEK"] = "week";
    IntervalType["MONTH"] = "month";
    IntervalType["QUARTER"] = "quarter";
    IntervalType["YEAR"] = "year";
})(IntervalType = exports.IntervalType || (exports.IntervalType = {}));
//# sourceMappingURL=get-table-stats.dto.js.map