"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCompanyEmail1652716594662 = void 0;
const typeorm_1 = require("typeorm");
class AddCompanyEmail1652716594662 {
    async up(queryRunner) {
        await queryRunner.addColumn('company', new typeorm_1.TableColumn({
            name: 'company_email',
            type: 'varchar',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('company', 'company_email');
    }
}
exports.AddCompanyEmail1652716594662 = AddCompanyEmail1652716594662;
//# sourceMappingURL=1652716594662-AddCompanyEmail.js.map