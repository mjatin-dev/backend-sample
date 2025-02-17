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
exports.DealService = void 0;
const common_1 = require("@nestjs/common");
const deal_repository_1 = require("./repositories/deal.repository");
let DealService = class DealService {
    constructor(dealRepository) {
        this.dealRepository = dealRepository;
    }
    async create(data, userId) {
        const deal = this.dealRepository.create(Object.assign(Object.assign({}, data), { createdBy: userId, tenantUserId: userId }));
        const savedDeal = await this.dealRepository.save(deal);
        return savedDeal;
    }
    async findOne(id, ownerId) {
        const deal = await this.dealRepository.findOne(id, {
            where: { tenantUserId: ownerId },
        });
        if (!deal) {
            throw new common_1.NotFoundException('Deal not found!');
        }
        return deal;
    }
    async update(id, data, ownerId) {
        const deal = await this.findOne(id, ownerId);
        if (!deal) {
            throw new common_1.NotFoundException('Deal not found!');
        }
        await this.dealRepository.update(id, Object.assign(Object.assign({}, data), { tenantUserId: ownerId, updateDate: new Date() }));
        return await this.findOne(id, ownerId);
    }
    async findAll(ownerId) {
        const dealResponse = await this.dealRepository.find({
            where: { tenantUserId: ownerId },
        });
        return dealResponse;
    }
    async delete(id, ownerId) {
        const deal = await this.dealRepository.findOne(id);
        if (!deal) {
            throw new common_1.NotFoundException('Deal not found!');
        }
        await this.dealRepository.remove([deal]);
    }
};
DealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [deal_repository_1.DealRepository])
], DealService);
exports.DealService = DealService;
//# sourceMappingURL=deal.service.js.map