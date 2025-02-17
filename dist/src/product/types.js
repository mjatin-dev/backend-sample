"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCurrency = exports.ProductRateChargeType = exports.ProductCategory = void 0;
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["BASE_PRODUCT"] = "base";
    ProductCategory["ADD_ON"] = "add-on";
    ProductCategory["MISC_PRODUCT"] = "misc";
})(ProductCategory = exports.ProductCategory || (exports.ProductCategory = {}));
var ProductRateChargeType;
(function (ProductRateChargeType) {
    ProductRateChargeType["ONE_TIME"] = "one-time";
    ProductRateChargeType["RECURRING"] = "recurring";
    ProductRateChargeType["USAGE"] = "usage";
})(ProductRateChargeType = exports.ProductRateChargeType || (exports.ProductRateChargeType = {}));
var ProductCurrency;
(function (ProductCurrency) {
    ProductCurrency["USD"] = "USD";
})(ProductCurrency = exports.ProductCurrency || (exports.ProductCurrency = {}));
//# sourceMappingURL=types.js.map