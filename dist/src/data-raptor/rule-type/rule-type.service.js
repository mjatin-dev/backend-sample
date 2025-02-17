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
exports.RuleTypeService = void 0;
const common_1 = require("@nestjs/common");
const rule_type_repository_1 = require("./rule-type.repository");
let RuleTypeService = class RuleTypeService {
    constructor(ruleTypeRepository) {
        this.ruleTypeRepository = ruleTypeRepository;
    }
    getRuleTypes(options = {}) {
        return this.ruleTypeRepository.find(options);
    }
};
RuleTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rule_type_repository_1.RuleTypeRepository])
], RuleTypeService);
exports.RuleTypeService = RuleTypeService;
//# sourceMappingURL=rule-type.service.js.map