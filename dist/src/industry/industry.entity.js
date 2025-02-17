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
exports.Industry = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../account/entities/account.entity");
const typeorm_1 = require("typeorm");
let Industry = class Industry {
    static _OPENAPI_METADATA_FACTORY() {
        return { industryId: { required: true, type: () => Number }, title: { required: true, type: () => String }, code: { required: true, type: () => String }, description: { required: true, type: () => String }, accounts: { required: false, type: () => [require("../account/entities/account.entity").Account] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Industry.prototype, "industryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Industry.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Industry.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Industry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, (account) => account.industry),
    __metadata("design:type", Array)
], Industry.prototype, "accounts", void 0);
Industry = __decorate([
    (0, typeorm_1.Entity)()
], Industry);
exports.Industry = Industry;
//# sourceMappingURL=industry.entity.js.map