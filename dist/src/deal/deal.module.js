"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const deal_service_1 = require("./deal.service");
const deal_controller_1 = require("./deal.controller");
const deal_repository_1 = require("./repositories/deal.repository");
const typeForDeal_repository_1 = require("./repositories/typeForDeal.repository");
const dealTask_repository_1 = require("./repositories/dealTask.repository");
const dealTaskAssignment_repository_1 = require("./repositories/dealTaskAssignment.repository");
const dealProduct_repository_1 = require("./repositories/dealProduct.repository");
const dealNote_repository_1 = require("./repositories/dealNote.repository");
const dealStage_repository_1 = require("./repositories/dealStage.repository");
const stageForDeal_repository_1 = require("./repositories/stageForDeal.repository");
const dealCampaign_repository_1 = require("./repositories/dealCampaign.repository");
const forecastCategory_repository_1 = require("./repositories/forecastCategory.repository");
const dealForecastCategory_repository_1 = require("./repositories/dealForecastCategory.repository");
let DealModule = class DealModule {
};
DealModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                deal_repository_1.DealRepository,
                typeForDeal_repository_1.TypeForDealRepository,
                dealTask_repository_1.DealTaskRepository,
                dealTaskAssignment_repository_1.DealTaskAssignmentRepository,
                dealProduct_repository_1.DealProductRepository,
                dealNote_repository_1.DealNoteRepository,
                dealStage_repository_1.DealStageRepository,
                stageForDeal_repository_1.StageForDealRepository,
                dealCampaign_repository_1.DealCampaignRepository,
                forecastCategory_repository_1.ForecastCategoryRepository,
                dealForecastCategory_repository_1.DealForecastCategoryRepository,
            ]),
        ],
        providers: [deal_service_1.DealService],
        controllers: [deal_controller_1.DealController],
    })
], DealModule);
exports.DealModule = DealModule;
//# sourceMappingURL=deal.module.js.map