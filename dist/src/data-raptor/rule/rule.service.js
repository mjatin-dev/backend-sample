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
exports.RuleService = void 0;
const common_1 = require("@nestjs/common");
const rule_repository_1 = require("./rule.repository");
const types_1 = require("../types");
let RuleService = class RuleService {
    constructor(ruleRepository) {
        this.ruleRepository = ruleRepository;
    }
    async createRule(rule, dataMigrationId) {
        const ruleCreated = this.ruleRepository.create(Object.assign(Object.assign({}, rule), { dataMigrationId }));
        return await this.ruleRepository.save(ruleCreated);
    }
    async deleteRule(id) {
        return await this.ruleRepository.softDelete(id);
    }
    async findOne(options) {
        const rule = await this.ruleRepository.findOne(options);
        return rule;
    }
    async findMany(options) {
        const rule = await this.ruleRepository.find(options);
        return rule;
    }
    async findByMigrationAndTable(dataMigrationId, table) {
        const rules = await this.ruleRepository.find({
            where: { dataMigrationId, table },
        });
        return rules;
    }
    async update(id, data) {
        const rule = await this.ruleRepository.findOne(id);
        const saveRule = await this.ruleRepository.save(Object.assign(Object.assign(Object.assign({}, rule), data), { status: types_1.RuleStatus.REQUESTED, statusDate: new Date() }));
        return saveRule;
    }
};
RuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rule_repository_1.RuleRepository])
], RuleService);
exports.RuleService = RuleService;
//# sourceMappingURL=rule.service.js.map