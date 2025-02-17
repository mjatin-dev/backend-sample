"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const typeorm_1 = require("@nestjs/typeorm");
const mail_module_1 = require("../mail/mail.module");
const user_module_1 = require("../user/user.module");
const password_reset_token_repository_1 = require("./repositories/password-reset-token.repository");
const jwt_params_strategy_1 = require("./jwt-params.strategy");
const WSAuthGuard_1 = require("./guards/WSAuthGuard");
const salesforce_module_1 = require("../core/lib/salesforce/salesforce.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            typeorm_1.TypeOrmModule.forFeature([password_reset_token_repository_1.PasswordResetTokenRepository]),
            mail_module_1.MailModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            salesforce_module_1.SalesforceModule,
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_params_strategy_1.JwtParamsStrategy, WSAuthGuard_1.WSAuthGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [jwt_strategy_1.JwtStrategy, jwt_params_strategy_1.JwtParamsStrategy, auth_service_1.AuthService, WSAuthGuard_1.WSAuthGuard],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map