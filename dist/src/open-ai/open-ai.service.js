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
exports.OpenAIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let OpenAIService = class OpenAIService {
    constructor() {
        this.openai = new openai_1.OpenAIApi(new openai_1.Configuration({ apiKey: process.env.OPENAI_KEY }));
    }
    async generateAISummary(prompt) {
        const model = 'text-davinci-003';
        const maxTokens = 100;
        const temperature = 0.5;
        const response = await this.openai.createCompletion({
            model,
            prompt,
            max_tokens: maxTokens,
            n: 1,
            temperature,
        });
        return response.data.choices
            .map((item) => item.text)
            .join('\n')
            .split('. ')
            .slice(0, -1)
            .join('. ')
            .concat('.');
    }
};
OpenAIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], OpenAIService);
exports.OpenAIService = OpenAIService;
//# sourceMappingURL=open-ai.service.js.map