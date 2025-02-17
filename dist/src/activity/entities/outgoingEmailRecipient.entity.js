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
exports.OutgoingEmailRecipient = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let OutgoingEmailRecipient = class OutgoingEmailRecipient {
    static _OPENAPI_METADATA_FACTORY() {
        return { outgoingEmailRecipientId: { required: true, type: () => Number }, emailActivityDetailId: { required: true, type: () => Number }, recipientContactId: { required: true, type: () => Number }, isReceived: { required: true, type: () => Boolean }, receivedDate: { required: true, type: () => Date }, receivedTime: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OutgoingEmailRecipient.prototype, "outgoingEmailRecipientId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OutgoingEmailRecipient.prototype, "emailActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OutgoingEmailRecipient.prototype, "recipientContactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], OutgoingEmailRecipient.prototype, "isReceived", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OutgoingEmailRecipient.prototype, "receivedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OutgoingEmailRecipient.prototype, "receivedTime", void 0);
OutgoingEmailRecipient = __decorate([
    (0, typeorm_1.Entity)()
], OutgoingEmailRecipient);
exports.OutgoingEmailRecipient = OutgoingEmailRecipient;
//# sourceMappingURL=outgoingEmailRecipient.entity.js.map