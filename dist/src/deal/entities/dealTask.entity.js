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
exports.DealTask = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let DealTask = class DealTask {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealTaskId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, taskTitle: { required: true, type: () => String }, description: { required: true, type: () => String }, creatorTenantUserId: { required: true, type: () => Number }, isDone: { required: true, type: () => Boolean }, createdDate: { required: true, type: () => Date }, taskDueDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DealTask.prototype, "dealTaskId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealTask.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DealTask.prototype, "taskTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DealTask.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealTask.prototype, "creatorTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], DealTask.prototype, "isDone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], DealTask.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DealTask.prototype, "taskDueDate", void 0);
DealTask = __decorate([
    (0, typeorm_1.Entity)()
], DealTask);
exports.DealTask = DealTask;
//# sourceMappingURL=dealTask.entity.js.map