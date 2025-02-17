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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const create_user_request_dto_1 = require("../dto/create-user.request.dto");
const auth_service_1 = require("../../auth/auth.service");
const mail_service_1 = require("../../mail/mail.service");
const env_config_1 = __importDefault(require("../../config/env.config"));
const utils_1 = require("../../common/utils");
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const user_repository_1 = require("../repositories/user.repository");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const uuid_1 = require("uuid");
const user_normalizer_1 = require("../normalizers/user.normalizer");
const userContactInformation_service_1 = require("./userContactInformation.service");
let UserService = class UserService {
    constructor(userRepository, authService, userContactInfoService, mailService) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.userContactInfoService = userContactInfoService;
        this.mailService = mailService;
    }
    async create(data, creatorId) {
        const { userName, userEmail, userType, phoneNumber, mobileNumber, profileJobRole, } = data;
        let tenantId;
        if (creatorId) {
            const creator = await this.findOne({ userId: creatorId });
            tenantId = creator.tenantId;
        }
        const user = this.userRepository.create({
            userName,
            userEmail,
            userType,
            tenantId,
            userCreatedBy: creatorId,
            userCognitoId: (0, uuid_1.v4)(),
        });
        const savedUser = await this.userRepository.save(user);
        await this.userContactInfoService.create({
            userId: savedUser.userId,
            phoneNumber,
            mobileNumber,
        });
        const cognitoUser = await this.authService.createUser(userEmail, userType);
        await this.userRepository.save(Object.assign(Object.assign({}, savedUser), { userCognitoId: cognitoUser.id }));
        await this.mailService.sendWelcomeEmail(userEmail, {
            password: cognitoUser.password,
            dashboardUrl: `${(0, env_config_1.default)().frontEndUrl}/auth/login?email=${encodeURIComponent(userEmail)}`,
        });
        return user_normalizer_1.userNormalizer.getCreateUserResponseDto(savedUser);
    }
    async findOne(where, ownerId) {
        const findOptions = {
            where,
            relations: ['contactInfo'],
        };
        const user = await this.userRepository.findOne(undefined, findOptions);
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        return user_normalizer_1.userNormalizer.getUserResponseDto(user);
    }
    async findAll(tenantId) {
        const userListResponse = await this.userRepository.find({
            where: { tenantId },
            relations: ['contactInfo'],
        });
        return userListResponse.map(user_normalizer_1.userNormalizer.getUserResponseDto);
    }
    async update(id, data, ownerId) {
        const findOptions = {
            where: { userId: id },
            relations: ['contactInfo'],
        };
        const user = await this.userRepository.findOne(findOptions);
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const { userName, userEmail, userType, tenantId } = data, profileData = __rest(data, ["userName", "userEmail", "userType", "tenantId"]);
        if (userEmail) {
            await this.authService.updateUser(user.userCognitoId, userEmail);
        }
        if (userType && userType !== user.userType) {
            await this.authService.updateUserGroup(user.userCognitoId, user.userType, userType);
        }
        const userUpdate = {
            userName,
            userEmail,
            userType,
            tenantId,
        };
        if (!(0, lodash_isempty_1.default)(userUpdate)) {
            await this.userRepository.save(Object.assign(Object.assign({}, user), (0, utils_1.cleanObject)(Object.assign(Object.assign({}, userUpdate), { userModifiedBy: ownerId }))));
        }
        if (!(0, lodash_isempty_1.default)(profileData)) {
            await this.userContactInfoService.update(user.contactInfo.userContInfoId, profileData);
        }
    }
    async delete(id, ownerId) {
        const findOptions = { where: { userId: id } };
        if (ownerId) {
            findOptions.relations = ['company'];
            findOptions.where = {
                userId: id,
                company: { ownerId },
            };
        }
        const user = await this.userRepository.findOne(findOptions);
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        await this.userRepository.remove([user]);
        await this.authService.deleteUser(user.userCognitoId);
    }
    async inactivate(id, userId, companyId) {
        const user = await this.userRepository.findOne(id, {
            where: { companyId, userId: (0, typeorm_1.Not)(userId) },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        await this.authService.disableUser(user.userCognitoId);
        await this.userRepository.save(Object.assign(Object.assign({}, user), { userActive: false }));
    }
    async reactivate(id, userId, companyId) {
        const user = await this.userRepository.findOne(id, {
            where: { companyId, userId: (0, typeorm_1.Not)(userId) },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        await this.authService.enableUser(user.userCognitoId);
        await this.userRepository.save(Object.assign(Object.assign({}, user), { userActive: true }));
    }
};
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_request_dto_1.CreateUserRequestDto, Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "update", null);
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "delete", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        auth_service_1.AuthService,
        userContactInformation_service_1.UserContactInformationService,
        mail_service_1.MailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map