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
exports.DeduplicationResultService = void 0;
const common_1 = require("@nestjs/common");
const deduplication_result_repository_1 = require("../repositories/deduplication-result.repository");
let DeduplicationResultService = class DeduplicationResultService {
    constructor(deduplicationResultRepository) {
        this.deduplicationResultRepository = deduplicationResultRepository;
    }
    getDeduplicationResultData(tenantId, dataSourceId, queryOption) {
        return this.deduplicationResultRepository.getDeduplicationResultData(tenantId, dataSourceId, queryOption);
    }
    getDeduplicationResultDataByIds(tenantId, dataSourceId, ids) {
        return this.deduplicationResultRepository.getDeduplicationResultDataByIds(tenantId, dataSourceId, ids);
    }
    updateDeduplicationResultStatus(tenantId, dataSourceId, newStatus, ids) {
        return this.deduplicationResultRepository.updateDeduplicationResultStatus(tenantId, dataSourceId, newStatus, ids);
    }
};
DeduplicationResultService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [deduplication_result_repository_1.DeduplicationResultRepository])
], DeduplicationResultService);
exports.DeduplicationResultService = DeduplicationResultService;
//# sourceMappingURL=deduplication-result.service.js.map