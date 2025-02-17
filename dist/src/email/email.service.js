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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const email_repository_1 = require("./email.repository");
const gmail_service_1 = require("../core/lib/google/gmail.service");
let EmailService = class EmailService {
    constructor(emailRepository, gmailService) {
        this.emailRepository = emailRepository;
        this.gmailService = gmailService;
    }
    async create(data, ownerId) {
        const email = this.emailRepository.create(data);
        try {
            await this.gmailService.sendEmail(ownerId, {
                from: email.emailFrom,
                to: email.emailTo,
                subject: email.emailSubject,
                html: email.emailContent,
            });
            const savedEmail = await this.emailRepository.save(email);
            return savedEmail;
        }
        catch (err) {
            console.log('ERROR SENDING EMAIL', err);
            throw new common_1.HttpException('error send email', 500);
        }
    }
    async findOne(id) {
        const findOptions = {
            where: { emailId: id },
            relations: ['emailModifier', 'emailOwner', 'emailAccount'],
        };
        const email = await this.emailRepository.findOne(undefined, findOptions);
        if (!email) {
            throw new common_1.NotFoundException('Email not found!');
        }
        return email;
    }
    async findAll() {
        const emailResponse = await this.emailRepository.find();
        return emailResponse;
    }
    async delete(id, ownerId) {
        const email = await this.emailRepository.findOne(id);
        if (!email) {
            throw new common_1.NotFoundException('Email not found!');
        }
        await this.emailRepository.remove([email]);
    }
    getGmailAccount(ownerId) {
        return this.gmailService.getAccount(ownerId);
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_repository_1.EmailRepository,
        gmail_service_1.GmailService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map