"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserActive1652897047992 = void 0;
const typeorm_1 = require("typeorm");
class AddUserActive1652897047992 {
    async up(queryRunner) {
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'user_active',
            type: 'boolean',
            default: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('user', 'user_active');
    }
}
exports.AddUserActive1652897047992 = AddUserActive1652897047992;
//# sourceMappingURL=1652897047992-AddUserActive.js.map