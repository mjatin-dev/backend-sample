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
exports.DefinedProcess = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let DefinedProcess = class DefinedProcess {
    static _OPENAPI_METADATA_FACTORY() {
        return { definedProcessId: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, params: { required: true, type: () => Object } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DefinedProcess.prototype, "definedProcessId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text', unique: true }),
    __metadata("design:type", String)
], DefinedProcess.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], DefinedProcess.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'jsonb' }),
    __metadata("design:type", Object)
], DefinedProcess.prototype, "params", void 0);
DefinedProcess = __decorate([
    (0, typeorm_1.Entity)()
], DefinedProcess);
exports.DefinedProcess = DefinedProcess;
//# sourceMappingURL=defined-process.entity.js.map