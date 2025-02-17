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
exports.UserPermission = void 0;
const openapi = require("@nestjs/swagger");
const permission_entity_1 = require("../../permission/permission.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserPermission = class UserPermission {
    static _OPENAPI_METADATA_FACTORY() {
        return { tenantUserPermissionId: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, permissionId: { required: true, type: () => Number }, isCurrentPermssion: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: false, type: () => Date }, user: { required: true, type: () => require("./user.entity").User }, permission: { required: true, type: () => require("../../permission/permission.entity").Permission } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPermission.prototype, "tenantUserPermissionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserPermission.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserPermission.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserPermission.prototype, "isCurrentPermssion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserPermission.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserPermission.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userPermissions),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'userId',
    }),
    __metadata("design:type", user_entity_1.User)
], UserPermission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, (permission) => permission.userPermissions),
    (0, typeorm_1.JoinColumn)({ name: 'permission_id', referencedColumnName: 'permissionId' }),
    __metadata("design:type", permission_entity_1.Permission)
], UserPermission.prototype, "permission", void 0);
UserPermission = __decorate([
    (0, typeorm_1.Entity)()
], UserPermission);
exports.UserPermission = UserPermission;
//# sourceMappingURL=userPermission.entity.js.map