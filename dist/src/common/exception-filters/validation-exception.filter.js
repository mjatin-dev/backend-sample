"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const http_1 = require("../http");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus();
        let message, errors;
        const exceptionResponse = exception.getResponse();
        if (!exceptionResponse) {
            return response
                .status(status)
                .json(new http_1.ErrorResponseObject('An error occurred'));
        }
        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
            return response.status(status).json(new http_1.ErrorResponseObject(message));
        }
        if (Array.isArray(exceptionResponse.message)) {
            message = 'Provided parameters failed input validation';
            errors = exceptionResponse.message;
        }
        else {
            message = exceptionResponse === null || exceptionResponse === void 0 ? void 0 : exceptionResponse.message;
            errors = null;
        }
        const data = errors ? { errors } : null;
        response.status(status).json(new http_1.ErrorResponseObject(message, data));
    }
};
ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], ValidationExceptionFilter);
exports.ValidationExceptionFilter = ValidationExceptionFilter;
//# sourceMappingURL=validation-exception.filter.js.map