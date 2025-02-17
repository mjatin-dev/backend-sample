"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleTypeRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const rule_type_entity_1 = require("./rule-type.entity");
let RuleTypeRepository = class RuleTypeRepository extends typeorm_transactional_cls_hooked_1.BaseRepository {
};
RuleTypeRepository = __decorate([
    (0, typeorm_1.EntityRepository)(rule_type_entity_1.RuleType)
], RuleTypeRepository);
exports.RuleTypeRepository = RuleTypeRepository;
//# sourceMappingURL=rule-type.repository.js.map