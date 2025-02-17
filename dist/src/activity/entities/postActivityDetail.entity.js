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
exports.PostActivityDetail = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let PostActivityDetail = class PostActivityDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { postActivityDetailId: { required: true, type: () => Number }, activityId: { required: true, type: () => Number }, postOwnerContactId: { required: true, type: () => Number }, postTitle: { required: true, type: () => String }, postText: { required: true, type: () => String }, postDate: { required: true, type: () => Date }, postTime: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostActivityDetail.prototype, "postActivityDetailId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostActivityDetail.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PostActivityDetail.prototype, "postOwnerContactId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PostActivityDetail.prototype, "postTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PostActivityDetail.prototype, "postText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PostActivityDetail.prototype, "postDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", Date)
], PostActivityDetail.prototype, "postTime", void 0);
PostActivityDetail = __decorate([
    (0, typeorm_1.Entity)()
], PostActivityDetail);
exports.PostActivityDetail = PostActivityDetail;
//# sourceMappingURL=postActivityDetail.entity.js.map