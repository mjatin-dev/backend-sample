"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthedUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthedUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
});
//# sourceMappingURL=authed-user.decorator.js.map