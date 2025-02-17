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
exports.IndustryService = void 0;
const common_1 = require("@nestjs/common");
const industry_repository_1 = require("./industry.repository");
let IndustryService = class IndustryService {
    constructor(industryRepository) {
        this.industryRepository = industryRepository;
    }
    async create(data, ownerId) {
        const industry = this.industryRepository.create(data);
        const savedIndustry = await this.industryRepository.save(industry);
        return savedIndustry;
    }
    async findOne(id) {
        const findOptions = {
            where: { industryId: id },
            relations: ['industryModifier', 'industryOwner', 'industryAccount'],
        };
        const industry = await this.industryRepository.findOne(undefined, findOptions);
        if (!industry) {
            throw new common_1.NotFoundException('Industry not found!');
        }
        return industry;
    }
    async update(id, data, ownerId) {
        const industry = await this.findOne(id);
        if (!industry) {
            throw new common_1.NotFoundException('Industry not found!');
        }
        await this.industryRepository.update(id, data);
        return await this.findOne(id);
    }
    async findAll() {
        const industryResponse = await this.industryRepository.find();
        return industryResponse;
    }
    async delete(id, ownerId) {
        const industry = await this.industryRepository.findOne(id);
        if (!industry) {
            throw new common_1.NotFoundException('Industry not found!');
        }
        await this.industryRepository.remove([industry]);
    }
};
IndustryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [industry_repository_1.IndustryRepository])
], IndustryService);
exports.IndustryService = IndustryService;
//# sourceMappingURL=industry.service.js.map