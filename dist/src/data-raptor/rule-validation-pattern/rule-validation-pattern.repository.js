"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRaptorValidationPatternRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const rule_validation_pattern_entity_1 = require("./rule-validation-pattern.entity");
let DataRaptorValidationPatternRepository = class DataRaptorValidationPatternRepository extends typeorm_transactional_cls_hooked_1.BaseRepository {
};
DataRaptorValidationPatternRepository = __decorate([
    (0, typeorm_1.EntityRepository)(rule_validation_pattern_entity_1.ValidationPattern)
], DataRaptorValidationPatternRepository);
exports.DataRaptorValidationPatternRepository = DataRaptorValidationPatternRepository;
//# sourceMappingURL=rule-validation-pattern.repository.js.map