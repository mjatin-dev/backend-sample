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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const contact_repository_1 = require("../repositories/contact.repository");
const contactContactInformation_service_1 = require("./contactContactInformation.service");
const contact_normalizer_1 = require("../normalizers/contact.normalizer");
let ContactService = class ContactService {
    constructor(contactRepository, contactContactInfoService) {
        this.contactRepository = contactRepository;
        this.contactContactInfoService = contactContactInfoService;
    }
    async create(data, ownerId) {
        const contact = this.contactRepository.create(Object.assign(Object.assign({}, data), { createdBy: ownerId, tenantUserId: ownerId }));
        const savedContact = await this.contactRepository.save(contact);
        await this.contactContactInfoService.create(Object.assign({ contactId: savedContact.contactId }, data.contactInfo));
        return contact_normalizer_1.contactNormalizer.getContactResponseDto(savedContact);
    }
    async findOne(id, ownerId) {
        const contact = await this.contactRepository.findOne(id, {
            where: { tenantUserId: ownerId },
            relations: ['contactInfo', 'tenantUser', 'account'],
        });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found!');
        }
        return contact_normalizer_1.contactNormalizer.getContactResponseDto(contact);
    }
    async update(id, data, ownerId) {
        const contact = await this.findOne(id, ownerId);
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found!');
        }
        const savedContact = await this.contactRepository.save(Object.assign(Object.assign(Object.assign({}, contact), data), { tenantUserId: ownerId, updateDate: new Date() }));
        return savedContact;
    }
    async findAll(userId) {
        const contactResponse = await this.contactRepository.find({
            where: { tenantUserId: userId },
            relations: ['contactInfo', 'tenantUser'],
        });
        console.log(...contactResponse);
        return contactResponse.map(contact_normalizer_1.contactNormalizer.getContactResponseDto);
    }
    async delete(id, ownerId) {
        const contact = await this.contactRepository.findOne(id, {
            where: { contactOwner: ownerId },
        });
        if (!contact) {
            throw new common_1.NotFoundException('Contact not found!');
        }
        await this.contactRepository.remove([contact]);
    }
};
ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contact_repository_1.ContactRepository,
        contactContactInformation_service_1.ContactContactInformationService])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map