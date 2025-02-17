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
exports.AccountContactService = void 0;
const common_1 = require("@nestjs/common");
const accountContact_repository_1 = require("../repositories/accountContact.repository");
let AccountContactService = class AccountContactService {
    constructor(accountContactRepository) {
        this.accountContactRepository = accountContactRepository;
    }
    async create(data, ownerId) {
        const oldAccConts = await this.accountContactRepository.find({
            where: { accountId: data.accountId, contactId: data.contactId },
        });
        if (oldAccConts.length > 0) {
            throw new common_1.NotFoundException('Account and Contact relation is alreay existed!');
        }
        const accountContact = this.accountContactRepository.create(data);
        const savedAccountContact = await this.accountContactRepository.save(accountContact);
        return savedAccountContact;
    }
    async findOne(id) {
        const accountContact = await this.accountContactRepository.findOne(id);
        if (!accountContact) {
            throw new common_1.NotFoundException('AccountContact not found!');
        }
        return accountContact;
    }
    async getContactsByAccountId(id) {
        const accountContact = await this.accountContactRepository.find({
            where: { accountId: id },
            relations: ['contact', 'contact.contactInfo'],
        });
        if (!accountContact) {
            throw new common_1.NotFoundException('AccountContact not found!');
        }
        return accountContact;
    }
    async getAccountsByContactId(id) {
        const accountContact = await this.accountContactRepository.find({
            where: { contactId: id },
            relations: ['account', 'account.contactInfo'],
        });
        if (!accountContact) {
            throw new common_1.NotFoundException('AccountContact not found!');
        }
        return accountContact;
    }
    async update(id, data, ownerId) {
        const accountContact = await this.findOne(id);
        if (!accountContact) {
            throw new common_1.NotFoundException('AccountContact not found!');
        }
        const savedAccountContact = await this.accountContactRepository.save(Object.assign(Object.assign({}, accountContact), data));
        return savedAccountContact;
    }
    async findAll() {
        const accountContactResponse = await this.accountContactRepository.find();
        return accountContactResponse;
    }
    async delete(id, ownerId) {
        const accountContact = await this.accountContactRepository.findOne(id);
        if (!accountContact) {
            throw new common_1.NotFoundException('AccountContact not found!');
        }
        await this.accountContactRepository.remove([accountContact]);
    }
};
AccountContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accountContact_repository_1.AccountContactRepository])
], AccountContactService);
exports.AccountContactService = AccountContactService;
//# sourceMappingURL=accountContact.service.js.map