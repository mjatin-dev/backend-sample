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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const account_repository_1 = require("../repositories/account.repository");
const accountContactInformation_service_1 = require("./accountContactInformation.service");
const account_normalizer_1 = require("../normalizers/account.normalizer");
let AccountService = class AccountService {
    constructor(accountRepository, accountContactInfoService) {
        this.accountRepository = accountRepository;
        this.accountContactInfoService = accountContactInfoService;
    }
    async create(data, ownerId) {
        const account = this.accountRepository.create(Object.assign(Object.assign({}, data), { createdBy: ownerId, tenantUserId: ownerId }));
        const savedAccount = await this.accountRepository.save(account);
        await this.accountContactInfoService.create(Object.assign({ accountId: savedAccount.accountId }, data.contactInfo));
        return savedAccount;
    }
    async findOne(id, ownerId) {
        const account = await this.accountRepository.findOne(id, {
            where: { tenantUserId: ownerId },
            relations: [
                'contactInfo',
                'tenantUser',
                'contacts',
                'contacts.contactInfo',
            ],
        });
        if (!account) {
            throw new common_1.NotFoundException('Account not found!');
        }
        return account_normalizer_1.accountNormalizer.getAccountResponseDto(account);
    }
    async update(id, data, ownerId) {
        const account = await this.findOne(id, ownerId);
        if (!account) {
            throw new common_1.NotFoundException('Account not found!');
        }
        const savedAccount = await this.accountRepository.save(Object.assign(Object.assign(Object.assign({}, account), data), { tenantUserId: ownerId, updateDate: new Date() }));
        return savedAccount;
    }
    async findAll(ownerId) {
        const accountResponse = await this.accountRepository.find({
            where: { tenantUserId: ownerId },
            relations: ['contactInfo'],
        });
        return accountResponse.map(account_normalizer_1.accountNormalizer.getAccountResponseDto);
    }
    async delete(id, ownerId) {
        const account = await this.accountRepository.findOne(id);
        if (!account) {
            throw new common_1.NotFoundException('Account not found!');
        }
        await this.accountRepository.remove([account]);
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository,
        accountContactInformation_service_1.AccountContactInformationService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map