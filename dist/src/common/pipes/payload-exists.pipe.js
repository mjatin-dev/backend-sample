"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadExistsValidationPipe = void 0;
const common_1 = require("@nestjs/common");
(0, common_1.Injectable)();
class PayloadExistsValidationPipe {
    transform(payload) {
        if (!Object.keys(payload).length) {
            throw new common_1.BadRequestException('Payload should not be empty');
        }
        return payload;
    }
}
exports.PayloadExistsValidationPipe = PayloadExistsValidationPipe;
//# sourceMappingURL=payload-exists.pipe.js.map