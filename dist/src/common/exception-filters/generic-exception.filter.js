"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GenericExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const http_1 = require("../http");
let GenericExceptionFilter = GenericExceptionFilter_1 = class GenericExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GenericExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = 'An error occurred';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
        this.logUnknownException(exception);
        response.status(status).json(new http_1.ErrorResponseObject(message));
    }
    logUnknownException(exception) {
        const isInternalServerHttpException = exception instanceof common_1.InternalServerErrorException;
        const isNotHttpException = !(exception instanceof common_1.HttpException);
        if (exception instanceof Error &&
            (isInternalServerHttpException || isNotHttpException)) {
            this.logger.error(exception.message, exception.stack);
        }
    }
};
GenericExceptionFilter = GenericExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GenericExceptionFilter);
exports.GenericExceptionFilter = GenericExceptionFilter;
//# sourceMappingURL=generic-exception.filter.js.map