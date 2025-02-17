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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const permission_repository_1 = require("./permission.repository");
let PermissionService = class PermissionService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(data, ownerId) {
        const permission = this.permissionRepository.create(data);
        const savedPermission = await this.permissionRepository.save(permission);
        return savedPermission;
    }
    async findOne(id, ownerId) {
        const permission = await this.permissionRepository.findOne(id);
        if (!permission) {
            throw new common_1.NotFoundException('Permission not found!');
        }
        return permission;
    }
    async update(id, data, ownerId) {
        const permission = await this.findOne(id, ownerId);
        if (!permission) {
            throw new common_1.NotFoundException('Permission not found!');
        }
        const savedPermission = await this.permissionRepository.save(Object.assign(Object.assign({}, permission), data));
        return savedPermission;
    }
    async findAll(userId) {
        const permissionResponse = await this.permissionRepository.find({
            where: { permissionOwner: userId },
        });
        return permissionResponse;
    }
    async delete(id, ownerId) {
        const permission = await this.permissionRepository.findOne(id);
        if (!permission) {
            throw new common_1.NotFoundException('Permission not found!');
        }
        await this.permissionRepository.remove([permission]);
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map