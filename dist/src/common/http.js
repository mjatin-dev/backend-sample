"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseObject = exports.SuccessResponseObject = exports.PaginatedResponseObject = void 0;
class ResponseObject {
    constructor(success, message, data = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
class PaginatedResponseObject extends ResponseObject {
    constructor(message, data = null, total, perPage, page) {
        super(true, message, Object.assign(Object.assign({}, data), { total, page: Number(page), per_page: Number(perPage) }));
    }
}
exports.PaginatedResponseObject = PaginatedResponseObject;
class SuccessResponseObject extends ResponseObject {
    constructor(message, data = null) {
        super(true, message, data);
    }
}
exports.SuccessResponseObject = SuccessResponseObject;
class ErrorResponseObject extends ResponseObject {
    constructor(message, data = null) {
        super(false, message, data);
    }
}
exports.ErrorResponseObject = ErrorResponseObject;
//# sourceMappingURL=http.js.map