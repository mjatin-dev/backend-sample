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
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const resource_repository_1 = require("../repositories/resource.repository");
let ResourceService = class ResourceService {
    constructor(resourceRepository) {
        this.resourceRepository = resourceRepository;
    }
    async create(data, ownerId) {
        const insertable = Object.assign(Object.assign({}, data), { createdBy: ownerId, isActive: true });
        const Resource = this.resourceRepository.create(insertable);
        const savedResource = await this.resourceRepository.save(Resource);
        return savedResource;
    }
    async findAll(userId, pipelineId) {
        const ResourceResponse = await this.resourceRepository.find({
            where: { creator: userId, piplineId: pipelineId },
        });
        return ResourceResponse;
    }
    async delete(id) {
        const resource = await this.resourceRepository.findOne(id);
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found!');
        }
        await this.resourceRepository.remove([resource]);
    }
    async update(id, data, ownerId) {
        const existing = await this.resourceRepository.findOne(id);
        if (!existing) {
            throw new common_1.NotFoundException('Resource not found!');
        }
        const updated = Object.assign(Object.assign({}, existing), data);
        const res = await this.resourceRepository.save(updated);
        return res;
    }
};
ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resource_repository_1.ResourceRepository])
], ResourceService);
exports.ResourceService = ResourceService;
//# sourceMappingURL=resource.service.js.map