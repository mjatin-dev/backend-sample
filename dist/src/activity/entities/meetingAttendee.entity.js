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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingAttendee = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let MeetingAttendee = class MeetingAttendee {
    static _OPENAPI_METADATA_FACTORY() {
        return { meetingAttendeeId: { required: true, type: () => Number }, neetingActivityDetailId: { required: true, type: () => Number }, attendeeContactId: { required: true, type: () => Number }, didAttend: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MeetingAttendee.prototype, "meetingAttendeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MeetingAttendee.prototype, "neetingActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MeetingAttendee.prototype, "attendeeContactId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], MeetingAttendee.prototype, "didAttend", void 0);
MeetingAttendee = __decorate([
    (0, typeorm_1.Entity)()
], MeetingAttendee);
exports.MeetingAttendee = MeetingAttendee;
//# sourceMappingURL=meetingAttendee.entity.js.map