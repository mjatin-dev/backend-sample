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
exports.ContactSourceService = void 0;
const common_1 = require("@nestjs/common");
const contactSource_repository_1 = require("../repositories/contactSource.repository");
let ContactSourceService = class ContactSourceService {
    constructor(contactSourceRepository) {
        this.contactSourceRepository = contactSourceRepository;
    }
    async create(data, ownerId) {
        const contactSource = this.contactSourceRepository.create(data);
        const savedContactSource = await this.contactSourceRepository.save(contactSource);
        return savedContactSource;
    }
    async findOne(id) {
        const contactSource = await this.contactSourceRepository.findOne(id);
        if (!contactSource) {
            throw new common_1.NotFoundException('ContactSource not found!');
        }
        return contactSource;
    }
    async update(id, data, ownerId) {
        const contactSource = await this.findOne(id);
        if (!contactSource) {
            throw new common_1.NotFoundException('ContactSource not found!');
        }
        const savedContactSource = await this.contactSourceRepository.save(Object.assign(Object.assign({}, contactSource), data));
        return savedContactSource;
    }
    async findAll() {
        const contactSourceResponse = await this.contactSourceRepository.find();
        return contactSourceResponse;
    }
    async delete(id, ownerId) {
        const contactSource = await this.contactSourceRepository.findOne(id);
        if (!contactSource) {
            throw new common_1.NotFoundException('ContactSource not found!');
        }
        await this.contactSourceRepository.remove([contactSource]);
    }
};
ContactSourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contactSource_repository_1.ContactSourceRepository])
], ContactSourceService);
exports.ContactSourceService = ContactSourceService;
//# sourceMappingURL=contactSource.service.js.map