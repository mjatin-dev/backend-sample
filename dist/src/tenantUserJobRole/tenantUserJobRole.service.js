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
exports.TenantUserJobRoleService = void 0;
const common_1 = require("@nestjs/common");
const tenantUserJobRole_repository_1 = require("./repositories/tenantUserJobRole.repository");
let TenantUserJobRoleService = class TenantUserJobRoleService {
    constructor(tenantUserJobRoleRepository) {
        this.tenantUserJobRoleRepository = tenantUserJobRoleRepository;
    }
    async create(data, ownerId) {
        const tenantUserJobRole = this.tenantUserJobRoleRepository.create(data);
        const savedTenantUserJobRole = await this.tenantUserJobRoleRepository.save(tenantUserJobRole);
        return savedTenantUserJobRole;
    }
    async findOne(id, ownerId) {
        const tenantUserJobRole = await this.tenantUserJobRoleRepository.findOne(id);
        if (!tenantUserJobRole) {
            throw new common_1.NotFoundException('TenantUserJobRole not found!');
        }
        return tenantUserJobRole;
    }
    async update(id, data, ownerId) {
        const tenantUserJobRole = await this.findOne(id, ownerId);
        if (!tenantUserJobRole) {
            throw new common_1.NotFoundException('TenantUserJobRole not found!');
        }
        const savedTenantUserJobRole = await this.tenantUserJobRoleRepository.save(Object.assign(Object.assign({}, tenantUserJobRole), data));
        return savedTenantUserJobRole;
    }
    async findAll(userId) {
        const tenantUserJobRoleResponse = await this.tenantUserJobRoleRepository.find({
            where: { tenantUserJobRoleOwner: userId },
        });
        return tenantUserJobRoleResponse;
    }
    async delete(id, ownerId) {
        const tenantUserJobRole = await this.tenantUserJobRoleRepository.findOne(id);
        if (!tenantUserJobRole) {
            throw new common_1.NotFoundException('TenantUserJobRole not found!');
        }
        await this.tenantUserJobRoleRepository.remove([tenantUserJobRole]);
    }
};
TenantUserJobRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenantUserJobRole_repository_1.TenantUserJobRoleRepository])
], TenantUserJobRoleService);
exports.TenantUserJobRoleService = TenantUserJobRoleService;
//# sourceMappingURL=tenantUserJobRole.service.js.map