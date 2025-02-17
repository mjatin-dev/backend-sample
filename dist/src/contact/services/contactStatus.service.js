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
exports.ContactStatusService = void 0;
const common_1 = require("@nestjs/common");
const contactStatus_repository_1 = require("../repositories/contactStatus.repository");
let ContactStatusService = class ContactStatusService {
    constructor(contactStatusRepository) {
        this.contactStatusRepository = contactStatusRepository;
    }
    async create(data, ownerId) {
        const contactStatus = this.contactStatusRepository.create(data);
        const savedContactStatus = await this.contactStatusRepository.save(contactStatus);
        return savedContactStatus;
    }
    async findOne(id) {
        const contactStatus = await this.contactStatusRepository.findOne(id);
        if (!contactStatus) {
            throw new common_1.NotFoundException('ContactStatus not found!');
        }
        return contactStatus;
    }
    async update(id, data, ownerId) {
        const contactStatus = await this.findOne(id);
        if (!contactStatus) {
            throw new common_1.NotFoundException('ContactStatus not found!');
        }
        const savedContactStatus = await this.contactStatusRepository.save(Object.assign(Object.assign({}, contactStatus), data));
        return savedContactStatus;
    }
    async findAll() {
        const contactStatusResponse = await this.contactStatusRepository.find();
        return contactStatusResponse;
    }
    async delete(id, ownerId) {
        const contactStatus = await this.contactStatusRepository.findOne(id);
        if (!contactStatus) {
            throw new common_1.NotFoundException('ContactStatus not found!');
        }
        await this.contactStatusRepository.remove([contactStatus]);
    }
};
ContactStatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contactStatus_repository_1.ContactStatusRepository])
], ContactStatusService);
exports.ContactStatusService = ContactStatusService;
//# sourceMappingURL=contactStatus.service.js.map