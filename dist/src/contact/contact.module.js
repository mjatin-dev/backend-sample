"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contact_service_1 = require("./services/contact.service");
const contact_controller_1 = require("./controllers/contact.controller");
const contact_repository_1 = require("./repositories/contact.repository");
const contactStatus_repository_1 = require("./repositories/contactStatus.repository");
const contactSource_repository_1 = require("./repositories/contactSource.repository");
const contactStage_repository_1 = require("./repositories/contactStage.repository");
const sourceForcontact_repository_1 = require("./repositories/sourceForcontact.repository");
const jobRoleForContact_repository_1 = require("./repositories/jobRoleForContact.repository");
const contactContactInformation_repository_1 = require("./repositories/contactContactInformation.repository");
const workDepartment_repository_1 = require("./repositories/workDepartment.repository");
const contactSocialMedia_repository_1 = require("./repositories/contactSocialMedia.repository");
const contactContactInformation_service_1 = require("./services/contactContactInformation.service");
const contactStage_controller_1 = require("./controllers/contactStage.controller");
const contactStage_service_1 = require("./services/contactStage.service");
const contactSource_service_1 = require("./services/contactSource.service");
const contactStatus_service_1 = require("./services/contactStatus.service");
const contactSource_controller_1 = require("./controllers/contactSource.controller");
const contactStatus_controller_1 = require("./controllers/contactStatus.controller");
let ContactModule = class ContactModule {
};
ContactModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                contact_repository_1.ContactRepository,
                contactStatus_repository_1.ContactStatusRepository,
                contactSource_repository_1.ContactSourceRepository,
                contactStage_repository_1.ContactStageRepository,
                sourceForcontact_repository_1.SourceForContactRepository,
                jobRoleForContact_repository_1.JobRoleForContactRepository,
                contactContactInformation_repository_1.ContactContactInformationRepository,
                workDepartment_repository_1.WorkDepartmentRepository,
                contactSocialMedia_repository_1.ContactSocialMediaRepository,
            ]),
        ],
        providers: [
            contact_service_1.ContactService,
            contactContactInformation_service_1.ContactContactInformationService,
            contactStage_service_1.ContactStageService,
            contactSource_service_1.ContactSourceService,
            contactStatus_service_1.ContactStatusService,
        ],
        controllers: [
            contact_controller_1.ContactController,
            contactStage_controller_1.ContactStageController,
            contactSource_controller_1.ContactSourceController,
            contactStatus_controller_1.ContactStatusController,
        ],
    })
], ContactModule);
exports.ContactModule = ContactModule;
//# sourceMappingURL=contact.module.js.map