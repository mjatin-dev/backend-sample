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
exports.EmailType = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const emailActivityDetail_entity_1 = require("./emailActivityDetail.entity");
let EmailType = class EmailType {
    static _OPENAPI_METADATA_FACTORY() {
        return { emailTypeId: { required: true, type: () => Number }, emailType: { required: true, type: () => String }, description: { required: true, type: () => Number }, emailActivityDetails: { required: true, type: () => [require("./emailActivityDetail.entity").EmailActivityDetail] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmailType.prototype, "emailTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmailType.prototype, "emailType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", Number)
], EmailType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => emailActivityDetail_entity_1.EmailActivityDetail, (emailActivityDetail) => emailActivityDetail.emailType),
    __metadata("design:type", Array)
], EmailType.prototype, "emailActivityDetails", void 0);
EmailType = __decorate([
    (0, typeorm_1.Entity)()
], EmailType);
exports.EmailType = EmailType;
//# sourceMappingURL=emailType.entity.js.map