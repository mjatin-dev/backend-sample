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
exports.EmailAttachment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let EmailAttachment = class EmailAttachment {
    static _OPENAPI_METADATA_FACTORY() {
        return { emailAttachmentId: { required: true, type: () => Number }, emailActivityDetailId: { required: true, type: () => Number }, attachmentTitle: { required: true, type: () => String }, attachmentDescription: { required: true, type: () => String }, attachmentType: { required: true, type: () => String }, attachmentSizeInMB: { required: true, type: () => Number }, attachment: { required: true, type: () => String } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmailAttachment.prototype, "emailAttachmentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], EmailAttachment.prototype, "emailActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailAttachment.prototype, "attachmentTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], EmailAttachment.prototype, "attachmentDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailAttachment.prototype, "attachmentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], EmailAttachment.prototype, "attachmentSizeInMB", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EmailAttachment.prototype, "attachment", void 0);
EmailAttachment = __decorate([
    (0, typeorm_1.Entity)()
], EmailAttachment);
exports.EmailAttachment = EmailAttachment;
//# sourceMappingURL=emailAttachment.entity.js.map