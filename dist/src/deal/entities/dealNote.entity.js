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
exports.DealNote = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let DealNote = class DealNote {
    static _OPENAPI_METADATA_FACTORY() {
        return { dealNoteId: { required: true, type: () => Number }, dealId: { required: true, type: () => Number }, noteTitle: { required: true, type: () => String }, noteText: { required: true, type: () => String }, description: { required: true, type: () => String }, ownerTenantUserId: { required: true, type: () => Number }, createdDate: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DealNote.prototype, "dealNoteId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealNote.prototype, "dealId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DealNote.prototype, "noteTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DealNote.prototype, "noteText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DealNote.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DealNote.prototype, "ownerTenantUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], DealNote.prototype, "createdDate", void 0);
DealNote = __decorate([
    (0, typeorm_1.Entity)()
], DealNote);
exports.DealNote = DealNote;
//# sourceMappingURL=dealNote.entity.js.map