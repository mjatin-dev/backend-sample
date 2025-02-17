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
exports.AccountTypeService = void 0;
const common_1 = require("@nestjs/common");
const accountType_repository_1 = require("../repositories/accountType.repository");
let AccountTypeService = class AccountTypeService {
    constructor(accountTypeRepository) {
        this.accountTypeRepository = accountTypeRepository;
    }
    async create(data, ownerId) {
        const accountType = this.accountTypeRepository.create(data);
        const savedAccountType = await this.accountTypeRepository.save(accountType);
        return savedAccountType;
    }
    async findOne(id) {
        const accountType = await this.accountTypeRepository.findOne(id);
        if (!accountType) {
            throw new common_1.NotFoundException('AccountType not found!');
        }
        return accountType;
    }
    async update(id, data, ownerId) {
        const accountType = await this.findOne(id);
        if (!accountType) {
            throw new common_1.NotFoundException('AccountType not found!');
        }
        const savedAccountType = await this.accountTypeRepository.save(Object.assign(Object.assign({}, accountType), data));
        return savedAccountType;
    }
    async findAll() {
        const accountTypeResponse = await this.accountTypeRepository.find();
        return accountTypeResponse;
    }
    async delete(id, ownerId) {
        const accountType = await this.accountTypeRepository.findOne(id);
        if (!accountType) {
            throw new common_1.NotFoundException('AccountType not found!');
        }
        await this.accountTypeRepository.remove([accountType]);
    }
};
AccountTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accountType_repository_1.AccountTypeRepository])
], AccountTypeService);
exports.AccountTypeService = AccountTypeService;
//# sourceMappingURL=accountType.service.js.map