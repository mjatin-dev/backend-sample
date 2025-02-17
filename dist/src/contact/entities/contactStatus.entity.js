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
exports.ContactStatus = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("./contact.entity");
let ContactStatus = class ContactStatus {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactStatusId: { required: true, type: () => Number }, contactStatusName: { required: true, type: () => String }, description: { required: true, type: () => String }, contact: { required: false, type: () => [require("./contact.entity").Contact] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContactStatus.prototype, "contactStatusId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactStatus.prototype, "contactStatusName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ContactStatus.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (contact) => contact.contactStatus),
    __metadata("design:type", Array)
], ContactStatus.prototype, "contact", void 0);
ContactStatus = __decorate([
    (0, typeorm_1.Entity)()
], ContactStatus);
exports.ContactStatus = ContactStatus;
//# sourceMappingURL=contactStatus.entity.js.map