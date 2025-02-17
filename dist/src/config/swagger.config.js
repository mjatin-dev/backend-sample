"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const env_config_1 = __importDefault(require("./env.config"));
const getUnauthorizedResponse = (req) => {
    return req.auth
        ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
        : 'No credentials provided';
};
const setupSwagger = (app) => {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Customer City API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.use('/docs', (0, express_basic_auth_1.default)({
        challenge: true,
        users: { [(0, env_config_1.default)().swaggerUsername]: (0, env_config_1.default)().swaggerPassword },
        unauthorizedResponse: getUnauthorizedResponse,
    }));
    swagger_1.SwaggerModule.setup('docs', app, document);
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.config.js.map