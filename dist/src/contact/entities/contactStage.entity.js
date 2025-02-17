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
exports.ContactStage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("./contact.entity");
let ContactStage = class ContactStage {
    static _OPENAPI_METADATA_FACTORY() {
        return { contactStageId: { required: true, type: () => Number }, contactStageName: { required: true, type: () => String }, description: { required: true, type: () => String }, contact: { required: false, type: () => [require("./contact.entity").Contact] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContactStage.prototype, "contactStageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactStage.prototype, "contactStageName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ContactStage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (contact) => contact.contactStage),
    __metadata("design:type", Array)
], ContactStage.prototype, "contact", void 0);
ContactStage = __decorate([
    (0, typeorm_1.Entity)()
], ContactStage);
exports.ContactStage = ContactStage;
//# sourceMappingURL=contactStage.entity.js.map