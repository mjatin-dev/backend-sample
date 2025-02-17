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
exports.ContactStageService = void 0;
const common_1 = require("@nestjs/common");
const contactStage_repository_1 = require("../repositories/contactStage.repository");
let ContactStageService = class ContactStageService {
    constructor(contactStageRepository) {
        this.contactStageRepository = contactStageRepository;
    }
    async create(data, ownerId) {
        const contactStage = this.contactStageRepository.create(data);
        const savedContactStage = await this.contactStageRepository.save(contactStage);
        return savedContactStage;
    }
    async findOne(id) {
        const contactStage = await this.contactStageRepository.findOne(id);
        if (!contactStage) {
            throw new common_1.NotFoundException('ContactStage not found!');
        }
        return contactStage;
    }
    async update(id, data, ownerId) {
        const contactStage = await this.findOne(id);
        if (!contactStage) {
            throw new common_1.NotFoundException('ContactStage not found!');
        }
        const savedContactStage = await this.contactStageRepository.save(Object.assign(Object.assign({}, contactStage), data));
        return savedContactStage;
    }
    async findAll() {
        const contactStageResponse = await this.contactStageRepository.find();
        return contactStageResponse;
    }
    async delete(id, ownerId) {
        const contactStage = await this.contactStageRepository.findOne(id);
        if (!contactStage) {
            throw new common_1.NotFoundException('ContactStage not found!');
        }
        await this.contactStageRepository.remove([contactStage]);
    }
};
ContactStageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contactStage_repository_1.ContactStageRepository])
], ContactStageService);
exports.ContactStageService = ContactStageService;
//# sourceMappingURL=contactStage.service.js.map