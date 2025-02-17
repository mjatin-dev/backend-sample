"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_JWT_STRATEGY_OPTIONS = void 0;
const jwks_rsa_1 = require("jwks-rsa");
const env_config_1 = __importDefault(require("../config/env.config"));
exports.DEFAULT_JWT_STRATEGY_OPTIONS = {
    secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${(0, env_config_1.default)().cognitoAuthority}/.well-known/jwks.json`,
    }),
    audience: (0, env_config_1.default)().cognitoClientId,
    issuer: (0, env_config_1.default)().cognitoAuthority,
    algorithms: ['RS256'],
};
//# sourceMappingURL=types.js.map