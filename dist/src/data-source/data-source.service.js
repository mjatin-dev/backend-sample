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
exports.DataSourceService = void 0;
const common_1 = require("@nestjs/common");
const dataSource_repository_1 = require("./dataSource.repository");
let DataSourceService = class DataSourceService {
    constructor(dataSourceRepository) {
        this.dataSourceRepository = dataSourceRepository;
    }
    findAll(findManyOptions = {}) {
        return this.dataSourceRepository.find(findManyOptions);
    }
    findOne(findConditions) {
        return this.dataSourceRepository.findOne(findConditions);
    }
    async getAvailableDataSources(userId, tenantId) {
        const records = await this.dataSourceRepository.getAvailableDataSources(userId, tenantId);
        const recordProcessed = records.map((record) => {
            let dataSourceIntegrated = false;
            if (record.integration_state_id) {
                dataSourceIntegrated = true;
            }
            return Object.assign(Object.assign({}, record), { is_integrated: dataSourceIntegrated });
        });
        return recordProcessed;
    }
};
DataSourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dataSource_repository_1.DataSourceRepository])
], DataSourceService);
exports.DataSourceService = DataSourceService;
//# sourceMappingURL=data-source.service.js.map