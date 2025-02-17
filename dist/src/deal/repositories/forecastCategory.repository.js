"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastCategoryRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
const forecastCategory_entity_1 = require("../entities/forecastCategory.entity");
let ForecastCategoryRepository = class ForecastCategoryRepository extends typeorm_transactional_cls_hooked_1.BaseRepository {
};
ForecastCategoryRepository = __decorate([
    (0, typeorm_1.EntityRepository)(forecastCategory_entity_1.ForecastCategory)
], ForecastCategoryRepository);
exports.ForecastCategoryRepository = ForecastCategoryRepository;
//# sourceMappingURL=forecastCategory.repository.js.map