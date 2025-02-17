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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const create_tenant_request_dto_1 = require("../dto/create-tenant.request.dto");
const update_tenant_request_dto_1 = require("../dto/update-tenant.request.dto");
const types_1 = require("../../user/types");
const user_service_1 = require("../../user/services/user.service");
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const utils_1 = require("../../common/utils");
const tenant_repository_1 = require("../repositories/tenant.repository");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const tenant_normalizer_1 = require("../normalizers/tenant.normalizer");
const auth_service_1 = require("../../auth/auth.service");
const tenantContactInformation_service_1 = require("./tenantContactInformation.service");
const create_user_response_dto_1 = require("../../user/dto/create-user.response.dto");
let TenantService = class TenantService {
    constructor(tenantRepository, userService, authService, tenantContactInfoService) {
        this.tenantRepository = tenantRepository;
        this.userService = userService;
        this.authService = authService;
        this.tenantContactInfoService = tenantContactInfoService;
    }
    async create(data, existingUser) {
        const { ownerName, ownerEmail } = data, tenantData = __rest(data, ["ownerName", "ownerEmail"]);
        let user;
        if (existingUser) {
            user = existingUser;
        }
        else {
            user = await this.userService.create({
                userName: ownerName,
                userEmail: ownerEmail,
                userType: types_1.UserType.TENANT_USER,
                phoneNumber: '',
            });
        }
        const tenant = this.tenantRepository.create(Object.assign(Object.assign({}, tenantData), { ownerId: user.userId }));
        const savedCo = await this.tenantRepository.save(tenant);
        await this.userService.update(user.userId, {
            tenantId: savedCo.tenantId,
        });
        const contactInfo = await this.tenantContactInfoService.create(Object.assign({ tenantId: savedCo.tenantId, addressType: types_1.AddressType.MAILING }, data.contactInfo));
        const billingContactInfo = await this.tenantContactInfoService.create(Object.assign({ tenantId: savedCo.tenantId, addressType: types_1.AddressType.BUSINESS }, data.billingContactInfo));
        return tenant_normalizer_1.tenantNormalizer.getTenantResponseDto(Object.assign(Object.assign({}, savedCo), { contactInfos: [contactInfo, billingContactInfo], owner: Object.assign(Object.assign({}, user), { userCognitoId: '' }) }));
    }
    async findOne(id) {
        const tenant = await this.tenantRepository.findOne(id, {
            relations: ['owner', 'contactInfos'],
        });
        return tenant_normalizer_1.tenantNormalizer.getTenantResponseDto(tenant);
    }
    async findAll() {
        const companies = await this.tenantRepository.find({
            relations: ['owner', 'contactInfos'],
        });
        return companies.map(tenant_normalizer_1.tenantNormalizer.getTenantResponseDto);
    }
    remove(id) {
        return this.tenantRepository.delete(id);
    }
    async update(id, data) {
        const { userName, userEmail } = data, tenantData = __rest(data, ["userName", "userEmail"]);
        const tenant = await this.findOne(id);
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found!');
        }
        if (!(0, lodash_isempty_1.default)(tenantData)) {
            await this.tenantRepository.save(Object.assign(Object.assign({}, tenant), (0, utils_1.cleanObject)(tenantData)));
        }
        if (data.contactInfo) {
            await this.tenantContactInfoService.update(tenant.contactInfo.tenantContInfoId, data.contactInfo);
        }
        if (data.billingContactInfo) {
            await this.tenantContactInfoService.update(tenant.billingContactInfo.tenantContInfoId, data.billingContactInfo);
        }
    }
    async delete(id) {
        const tenant = await this.tenantRepository.findOne(id, {
            relations: ['users', 'contactInfos'],
        });
        if (!tenant) {
            throw new common_1.NotFoundException('Tenant not found!');
        }
        await this.tenantRepository.remove([tenant]);
        await Promise.all(tenant.users.map((user) => this.authService.deleteUser(user.userCognitoId)));
    }
};
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_request_dto_1.CreateTenantRequestDto,
        create_user_response_dto_1.CreateUserResponseDto]),
    __metadata("design:returntype", Promise)
], TenantService.prototype, "create", null);
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tenant_request_dto_1.UpdateTenantRequestDto]),
    __metadata("design:returntype", Promise)
], TenantService.prototype, "update", null);
TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_repository_1.TenantRepository,
        user_service_1.UserService,
        auth_service_1.AuthService,
        tenantContactInformation_service_1.TenantContactInformationService])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map