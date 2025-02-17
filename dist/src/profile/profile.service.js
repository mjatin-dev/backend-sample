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
exports.ProfileService = void 0;
const utils_1 = require("../common/utils");
const common_1 = require("@nestjs/common");
const profile_repository_1 = require("./profile.repository");
let ProfileService = class ProfileService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async create(data) {
        const profile = this.profileRepository.create(data);
        const savedProfile = await this.profileRepository.save(profile);
        return savedProfile;
    }
    async update(id, data) {
        const profile = await this.profileRepository.findOne(id);
        if (!profile) {
            throw new common_1.NotFoundException('PRofile not found!');
        }
        await this.profileRepository.save(Object.assign(Object.assign({}, profile), (0, utils_1.cleanObject)(data)));
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_repository_1.ProfileRepository])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map