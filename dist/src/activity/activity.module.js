"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModule = void 0;
const google_module_1 = require("../core/lib/google/google.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_controller_1 = require("./activity.controller");
const activity_service_1 = require("./activity.service");
const activity_repository_1 = require("./repositories/activity.repository");
const activityType_repository_1 = require("./repositories/activityType.repository");
const callActivityDetail_repository_1 = require("./repositories/callActivityDetail.repository");
const emailActivityDetail_repository_1 = require("./repositories/emailActivityDetail.repository");
const emailType_repository_1 = require("./repositories/emailType.repository");
const incomingEmailRecipient_repository_1 = require("./repositories/incomingEmailRecipient.repository");
const meetingActivityDetail_repository_1 = require("./repositories/meetingActivityDetail.repository");
const meetingAttendee_repository_1 = require("./repositories/meetingAttendee.repository");
const outgoingEmailRecipient_repository_1 = require("./repositories/outgoingEmailRecipient.repository");
const PostActivityDetail_repository_1 = require("./repositories/PostActivityDetail.repository");
const salePhase_repository_1 = require("./repositories/salePhase.repository");
const smsActivityDetail_repository_1 = require("./repositories/smsActivityDetail.repository");
let ActivityModule = class ActivityModule {
};
ActivityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                activity_repository_1.ActivityRepository,
                meetingActivityDetail_repository_1.MeetingActivityDetailRepository,
                smsActivityDetail_repository_1.SmsActivityDetailRepository,
                meetingAttendee_repository_1.MeetingAttendeeRepository,
                PostActivityDetail_repository_1.PostActivityDetailRepository,
                callActivityDetail_repository_1.CallActivityDetailRepository,
                emailActivityDetail_repository_1.EmailActivityDetailRepository,
                activityType_repository_1.ActivityTypeRepository,
                salePhase_repository_1.SalePhaseRepository,
                emailType_repository_1.EmailTypeRepository,
                emailActivityDetail_repository_1.EmailActivityDetailRepository,
                outgoingEmailRecipient_repository_1.OutgoingEmailRecipientRepository,
                incomingEmailRecipient_repository_1.IncomingEmailRecipientRepository,
            ]),
            google_module_1.GoogleModule,
        ],
        providers: [activity_service_1.ActivityService],
        controllers: [activity_controller_1.ActivityController],
        exports: [activity_service_1.ActivityService],
    })
], ActivityModule);
exports.ActivityModule = ActivityModule;
//# sourceMappingURL=activity.module.js.map