"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/services/user.service");
const types_1 = require("../user/types");
const types_2 = require("./types");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService) {
        super(Object.assign(Object.assign({}, types_2.DEFAULT_JWT_STRATEGY_OPTIONS), { jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken() }));
        this.userService = userService;
    }
    async validate(payload) {
        if (!payload.sub) {
            throw new common_1.UnauthorizedException('Invalid user.');
        }
        const role = payload['cognito:groups'][0];
        if (role === types_1.UserType.SUPER_ADMIN) {
            return {
                userId: 0,
                userEmail: payload.email,
                userType: role,
            };
        }
        const user = await this.userService.findOne({
            userCognitoId: payload.sub,
            userActive: true,
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid user.');
        }
        return {
            userId: user.userId,
            userEmail: user.userEmail,
            userType: user.userType,
            tenantId: user.tenantId,
        };
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map