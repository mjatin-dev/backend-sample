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
exports.AccountStage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const account_entity_1 = require("./account.entity");
let AccountStage = class AccountStage {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountStageId: { required: true, type: () => Number }, accountStageName: { required: true, type: () => String }, description: { required: true, type: () => String }, account: { required: false, type: () => [require("./account.entity").Account] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccountStage.prototype, "accountStageId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AccountStage.prototype, "accountStageName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AccountStage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, (account) => account.accountStage),
    __metadata("design:type", Array)
], AccountStage.prototype, "account", void 0);
AccountStage = __decorate([
    (0, typeorm_1.Entity)()
], AccountStage);
exports.AccountStage = AccountStage;
//# sourceMappingURL=accountStage.entity.js.map