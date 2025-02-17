"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_service_1 = require("./services/account.service");
const account_controller_1 = require("./controllers/account.controller");
const account_repository_1 = require("./repositories/account.repository");
const accountContact_repository_1 = require("./repositories/accountContact.repository");
const typeForAccount_repository_1 = require("./repositories/typeForAccount.repository");
const stageForAccount_repository_1 = require("./repositories/stageForAccount.repository");
const accountStage_repository_1 = require("./repositories/accountStage.repository");
const accountType_repository_1 = require("./repositories/accountType.repository");
const accountContactInformation_repository_1 = require("./repositories/accountContactInformation.repository");
const accountContactInformation_service_1 = require("./services/accountContactInformation.service");
const accountStage_controller_1 = require("./controllers/accountStage.controller");
const accountStage_service_1 = require("./services/accountStage.service");
const accountType_controller_1 = require("./controllers/accountType.controller");
const accountType_service_1 = require("./services/accountType.service");
const accountContact_service_1 = require("./services/accountContact.service");
const accountContact_controller_1 = require("./controllers/accountContact.controller");
let AccountModule = class AccountModule {
};
AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                account_repository_1.AccountRepository,
                accountContact_repository_1.AccountContactRepository,
                typeForAccount_repository_1.TypeForAccountRepository,
                stageForAccount_repository_1.StageForAccountRepository,
                accountStage_repository_1.AccountStageRepository,
                accountType_repository_1.AccountTypeRepository,
                accountContactInformation_repository_1.AccountContactInformationRepository,
            ]),
        ],
        providers: [
            account_service_1.AccountService,
            accountContact_service_1.AccountContactService,
            accountContactInformation_service_1.AccountContactInformationService,
            accountStage_service_1.AccountStageService,
            accountType_service_1.AccountTypeService,
        ],
        controllers: [
            account_controller_1.AccountController,
            accountContact_controller_1.AccountContactController,
            accountStage_controller_1.AccountStageController,
            accountType_controller_1.AccountTypeController,
        ],
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map