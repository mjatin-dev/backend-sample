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
exports.TenantContactInformationService = void 0;
const utils_1 = require("../../common/utils");
const common_1 = require("@nestjs/common");
const tenantContactInformation_repository_1 = require("../repositories/tenantContactInformation.repository");
let TenantContactInformationService = class TenantContactInformationService {
    constructor(accountContactInformationRepository) {
        this.accountContactInformationRepository = accountContactInformationRepository;
    }
    async create(data) {
        const tenantContactInformation = this.accountContactInformationRepository.create(data);
        const savedUserContactInformation = await this.accountContactInformationRepository.save(tenantContactInformation);
        return savedUserContactInformation;
    }
    async update(id, data) {
        const tenantContactInformation = await this.accountContactInformationRepository.findOne(id);
        if (!tenantContactInformation) {
            throw new common_1.NotFoundException('TenantContactInformation not found!');
        }
        await this.accountContactInformationRepository.save(Object.assign(Object.assign({}, tenantContactInformation), (0, utils_1.cleanObject)(data)));
    }
};
TenantContactInformationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenantContactInformation_repository_1.TenantContactInformationRepository])
], TenantContactInformationService);
exports.TenantContactInformationService = TenantContactInformationService;
//# sourceMappingURL=tenantContactInformation.service.js.map