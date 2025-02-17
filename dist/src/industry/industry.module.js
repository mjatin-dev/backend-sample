"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const industry_service_1 = require("./industry.service");
const industry_controller_1 = require("./industry.controller");
const industry_repository_1 = require("./industry.repository");
let IndustryModule = class IndustryModule {
};
IndustryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([industry_repository_1.IndustryRepository])],
        providers: [industry_service_1.IndustryService],
        controllers: [industry_controller_1.IndustryController],
    })
], IndustryModule);
exports.IndustryModule = IndustryModule;
//# sourceMappingURL=industry.module.js.map