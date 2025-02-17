"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./user.controller");
const auth_module_1 = require("../auth/auth.module");
const profile_module_1 = require("../profile/profile.module");
const mail_module_1 = require("../mail/mail.module");
const user_repository_1 = require("./repositories/user.repository");
const userContactInformation_repository_1 = require("./repositories/userContactInformation.repository");
const userPermission_repository_1 = require("./repositories/userPermission.repository");
const userContactAttribute_repository_1 = require("./repositories/userContactAttribute.repository");
const userContactInformation_service_1 = require("./services/userContactInformation.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_repository_1.UserRepository,
                userContactInformation_repository_1.UserContactInformationRepository,
                userPermission_repository_1.UserPermissionRepository,
                userContactAttribute_repository_1.UserContactAttributeRepository,
            ]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            profile_module_1.ProfileModule,
            mail_module_1.MailModule,
        ],
        providers: [user_service_1.UserService, userContactInformation_service_1.UserContactInformationService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map