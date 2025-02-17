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
exports.DealTaskAssignment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let DealTaskAssignment = class DealTaskAssignment {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealTaskAssignmentId: { required: true, type: () => Number }, dealTaskId: { required: true, type: () => Number }, assignerTenantUserId: { required: true, type: () => Number }, assigneeTenantUserId: { required: true, type: () => Number }, assignDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DealTaskAssignment.prototype, "dealTaskAssignmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealTaskAssignment.prototype, "dealTaskId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealTaskAssignment.prototype, "assignerTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealTaskAssignment.prototype, "assigneeTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DealTaskAssignment.prototype, "assignDate", void 0);
DealTaskAssignment = __decorate([
    (0, typeorm_1.Entity)()
], DealTaskAssignment);
exports.DealTaskAssignment = DealTaskAssignment;
//# sourceMappingURL=dealTaskAssignment.entity.js.map