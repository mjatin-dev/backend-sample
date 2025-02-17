"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const common_1 = require("@nestjs/common");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
require("reflect-metadata");
const app_module_1 = require("./app.module");
const generic_exception_filter_1 = require("./common/exception-filters/generic-exception.filter");
const http_exception_filter_1 = require("./common/exception-filters/http-exception.filter");
const validation_exception_filter_1 = require("./common/exception-filters/validation-exception.filter");
const env_config_1 = __importDefault(require("./config/env.config"));
const swagger_config_1 = require("./config/swagger.config");
const transform_interceptor_1 = require("./data-raptor/interceptors/transform.interceptor");
const corsOrigin = (0, env_config_1.default)().isDevelopment ? '*' : (0, env_config_1.default)().frontEndUrl;
const corsOptions = {
    origin: corsOrigin,
    optionsSuccessStatus: 200,
};
(0, typeorm_transactional_cls_hooked_1.initializeTransactionalContext)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: corsOptions });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new generic_exception_filter_1.GenericExceptionFilter(), new http_exception_filter_1.HttpExceptionFilter(), new validation_exception_filter_1.ValidationExceptionFilter());
    (0, swagger_config_1.setupSwagger)(app);
    app.use((0, helmet_1.default)());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map