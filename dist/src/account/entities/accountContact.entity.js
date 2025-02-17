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
exports.AccountContact = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let AccountContact = class AccountContact {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountContactId: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, contactId: { required: true, type: () => Number }, isPrimary: { required: true, type: () => Boolean }, startDate: { required: true, type: () => Date }, endDate: { required: false, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccountContact.prototype, "accountContactId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AccountContact.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AccountContact.prototype, "contactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AccountContact.prototype, "isPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'now()' }),
    __metadata("design:type", Date)
], AccountContact.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], AccountContact.prototype, "endDate", void 0);
AccountContact = __decorate([
    (0, typeorm_1.Entity)()
], AccountContact);
exports.AccountContact = AccountContact;
//# sourceMappingURL=accountContact.entity.js.map