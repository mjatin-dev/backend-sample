"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Office365Module = void 0;
const common_1 = require("@nestjs/common");
const office365_service_1 = require("./office365.service");
const kms_module_1 = require("../aws/kms/kms.module");
const typeorm_1 = require("@nestjs/typeorm");
const integrationState_repository_1 = require("../../../integration/integrationState.repository");
const integration_repository_1 = require("../../../integration/integration.repository");
let Office365Module = class Office365Module {
};
Office365Module = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                integration_repository_1.IntegrationRepository,
                integrationState_repository_1.IntegrationStateRepository,
            ]),
            kms_module_1.KmsModule,
        ],
        providers: [office365_service_1.Office365Service],
        exports: [office365_service_1.Office365Service],
    })
], Office365Module);
exports.Office365Module = Office365Module;
//# sourceMappingURL=office365.module.js.map