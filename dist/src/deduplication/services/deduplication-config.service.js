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
exports.DeduplicationConfigService = void 0;
const common_1 = require("@nestjs/common");
const deduplication_config_repository_1 = require("../repositories/deduplication-config.repository");
let DeduplicationConfigService = class DeduplicationConfigService {
    constructor(deduplicationConfig) {
        this.deduplicationConfig = deduplicationConfig;
    }
    async create(data) {
        const deduplicationConfig = this.deduplicationConfig.create(Object.assign({}, data));
        const saveDeduplicationConfig = await this.deduplicationConfig.save(deduplicationConfig);
        return saveDeduplicationConfig;
    }
    async findOneByMigrationAndTable(migrationId, tableName) {
        const deduplicationConfig = await this.deduplicationConfig.findOne({
            where: { migrationId, tableName },
        });
        return deduplicationConfig;
    }
    async findOneById(migrationId, id) {
        const deduplicationConfig = await this.deduplicationConfig.findOne(id, {
            where: { migrationId },
        });
        return deduplicationConfig;
    }
    async update(id, data) {
        const deduplicationConfig = await this.findOneById(data.migrationId, id);
        if (!deduplicationConfig) {
            throw new common_1.NotFoundException('deduplicationConfig not found!');
        }
        await this.deduplicationConfig.update(id, Object.assign({}, data));
        return await this.findOneById(data.migrationId, id);
    }
    async findAll(migrationId) {
        const deduplicationConfigResponse = await this.deduplicationConfig.find({
            where: { migrationId },
        });
        return deduplicationConfigResponse;
    }
    async delete(migrationId, id) {
        const deduplicationConfig = await this.deduplicationConfig.findOne(id, {
            where: { migrationId },
        });
        if (!deduplicationConfig) {
            throw new common_1.NotFoundException('De DuplicationConfig not found!');
        }
        await this.deduplicationConfig.remove([deduplicationConfig]);
    }
};
DeduplicationConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [deduplication_config_repository_1.DeDuplicationConfigRepository])
], DeduplicationConfigService);
exports.DeduplicationConfigService = DeduplicationConfigService;
//# sourceMappingURL=deduplication-config.service.js.map