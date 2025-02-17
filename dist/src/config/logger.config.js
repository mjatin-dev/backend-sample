"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinoLoggerConfig = void 0;
const uuid_1 = require("uuid");
const env_config_1 = __importDefault(require("./env.config"));
exports.pinoLoggerConfig = {
    pinoHttp: {
        genReqId: () => {
            return (0, uuid_1.v4)();
        },
        autoLogging: false,
        level: (0, env_config_1.default)().isProduction ? 'info' : 'debug',
        formatters: {
            level: (label) => ({ level: label }),
        },
        prettyPrint: (0, env_config_1.default)().isDevelopment
            ? { translateTime: true, colorize: true }
            : false,
        redact: [
            "req.headers['x-bs-sk']",
            "req.headers['Authorization']",
            "req.headers['authorization']",
        ],
    },
};
//# sourceMappingURL=logger.config.js.map