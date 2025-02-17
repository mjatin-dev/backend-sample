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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const activity_repository_1 = require("./repositories/activity.repository");
const emailActivityDetail_repository_1 = require("./repositories/emailActivityDetail.repository");
const types_1 = require("./types");
const gmail_service_1 = require("../core/lib/google/gmail.service");
let ActivityService = class ActivityService {
    constructor(activityRepository, emailDetailRepository, gmailService) {
        this.activityRepository = activityRepository;
        this.emailDetailRepository = emailDetailRepository;
        this.gmailService = gmailService;
    }
    async create(data, userId) {
        const { emailActivityDetail } = data, newActivity = __rest(data, ["emailActivityDetail"]);
        let emailThreadId, emailMessageId;
        if (newActivity.activityTypeId === types_1.ACTIVITY_TYPE_ID.EMAIL) {
            const email = await this.gmailService.sendEmail(userId, {
                from: emailActivityDetail.emailFrom,
                to: emailActivityDetail.emailTo,
                subject: emailActivityDetail.emailSubject,
                html: emailActivityDetail.emailBody,
            });
            emailThreadId = email === null || email === void 0 ? void 0 : email.threadId;
            emailMessageId = email === null || email === void 0 ? void 0 : email.id;
        }
        const activity = this.activityRepository.create(Object.assign(Object.assign({}, newActivity), { emailActivityThreadId: emailThreadId, tenantUserId: userId }));
        const savedActivity = await this.activityRepository.save(activity);
        if (newActivity.activityTypeId === types_1.ACTIVITY_TYPE_ID.EMAIL) {
            await this.emailDetailRepository.insert(Object.assign(Object.assign({}, emailActivityDetail), { emailMessageId: emailMessageId, activityId: savedActivity.activityId }));
        }
        return savedActivity;
    }
    async findOne(id, userId) {
        const activity = await this.activityRepository.findOne(id, {
            where: {
                tenantUserId: userId,
                relations: ['emailActivityDetails', 'emailActivityDetails.emailType'],
            },
        });
        if (!activity) {
            throw new common_1.NotFoundException('Activity not found!');
        }
        return activity;
    }
    async update(id, data, ownerId) {
        const activity = await this.findOne(id, ownerId);
        if (!activity) {
            throw new common_1.NotFoundException('Activity not found!');
        }
        const savedActivity = await this.activityRepository.save(Object.assign(Object.assign({}, activity), data));
        return savedActivity;
    }
    async syncGmail(userId) {
        const gmailThreads = await this.gmailService.threads(userId);
        if (!gmailThreads)
            return;
        const processSync = gmailThreads === null || gmailThreads === void 0 ? void 0 : gmailThreads.map(async (thread) => {
            const threadId = thread.id;
            const messages = thread.messages;
            const activity = await this.activityRepository.findOne({
                where: { emailActivityThreadId: threadId },
            });
            if (activity) {
                const emailDetails = messages.map((message) => {
                    var _a, _b, _c, _d;
                    return this.emailDetailRepository.create({
                        activityId: activity.activityId,
                        emailMessageId: message.id,
                        emailFrom: (_a = message.payload.headers.find((header) => header.name === 'From')) === null || _a === void 0 ? void 0 : _a.value,
                        emailTo: (_b = message.payload.headers.find((header) => header.name === 'To')) === null || _b === void 0 ? void 0 : _b.value,
                        emailSubject: (_c = message.payload.headers.find((header) => header.name === 'Subject')) === null || _c === void 0 ? void 0 : _c.value,
                        emailBody: message.snippet,
                        emailDate: new Date(),
                        emailTypeId: ((_d = message.payload.headers.find((header) => header.name === 'Delivered-To')) === null || _d === void 0 ? void 0 : _d.value)
                            ? types_1.EMAIL_TYPE_ID.INCOMING
                            : types_1.EMAIL_TYPE_ID.OUTGOING,
                    });
                });
                await this.emailDetailRepository.upsert(emailDetails, {
                    conflictPaths: ['emailMessageId'],
                    skipUpdateIfNoValuesChanged: true,
                });
            }
        });
        await Promise.all(processSync);
    }
    async findAll(userId, contactId) {
        await this.syncGmail(userId);
        const where = { tenantUserId: userId };
        if (contactId) {
            where['contactId'] = contactId;
        }
        const activityResponse = await this.activityRepository.find({
            where,
            order: { startDate: 'DESC' },
            relations: ['emailActivityDetails', 'emailActivityDetails.emailType'],
        });
        return activityResponse;
    }
    async delete(id, ownerId) {
        const activity = await this.activityRepository.findOne(id, {
            where: { tenantUserId: ownerId },
        });
        if (!activity) {
            throw new common_1.NotFoundException('Activity not found!');
        }
        await this.activityRepository.remove([activity]);
    }
};
ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [activity_repository_1.ActivityRepository,
        emailActivityDetail_repository_1.EmailActivityDetailRepository,
        gmail_service_1.GmailService])
], ActivityService);
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map