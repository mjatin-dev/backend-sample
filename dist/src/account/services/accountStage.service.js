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
exports.AccountStageService = void 0;
const common_1 = require("@nestjs/common");
const accountStage_repository_1 = require("../repositories/accountStage.repository");
let AccountStageService = class AccountStageService {
    constructor(accountStageRepository) {
        this.accountStageRepository = accountStageRepository;
    }
    async create(data, ownerId) {
        const accountStage = this.accountStageRepository.create(data);
        const savedAccountStage = await this.accountStageRepository.save(accountStage);
        return savedAccountStage;
    }
    async findOne(id) {
        const accountStage = await this.accountStageRepository.findOne(id);
        if (!accountStage) {
            throw new common_1.NotFoundException('AccountStage not found!');
        }
        return accountStage;
    }
    async update(id, data, ownerId) {
        const accountStage = await this.findOne(id);
        if (!accountStage) {
            throw new common_1.NotFoundException('AccountStage not found!');
        }
        const savedAccountStage = await this.accountStageRepository.save(Object.assign(Object.assign({}, accountStage), data));
        return savedAccountStage;
    }
    async findAll() {
        const accountStageResponse = await this.accountStageRepository.find();
        return accountStageResponse;
    }
    async delete(id, ownerId) {
        const accountStage = await this.accountStageRepository.findOne(id);
        if (!accountStage) {
            throw new common_1.NotFoundException('AccountStage not found!');
        }
        await this.accountStageRepository.remove([accountStage]);
    }
};
AccountStageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accountStage_repository_1.AccountStageRepository])
], AccountStageService);
exports.AccountStageService = AccountStageService;
//# sourceMappingURL=accountStage.service.js.map