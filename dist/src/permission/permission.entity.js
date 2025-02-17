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
exports.Permission = void 0;
const openapi = require("@nestjs/swagger");
const userPermission_entity_1 = require("../user/entities/userPermission.entity");
const typeorm_1 = require("typeorm");
let Permission = class Permission {
    static _OPENAPI_METADATA_FACTORY() {
        return { permissionId: { required: true, type: () => Number }, title: { required: true, type: () => String }, code: { required: true, type: () => String }, description: { required: true, type: () => String }, userPermissions: { required: true, type: () => [require("../user/entities/userPermission.entity").UserPermission] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permission.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Permission.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Permission.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPermission_entity_1.UserPermission, (userPermission) => userPermission.permission),
    __metadata("design:type", Array)
], Permission.prototype, "userPermissions", void 0);
Permission = __decorate([
    (0, typeorm_1.Entity)()
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.entity.js.map