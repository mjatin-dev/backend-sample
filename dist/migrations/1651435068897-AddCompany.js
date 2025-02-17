"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCompany1651435068897 = void 0;
const typeorm_1 = require("typeorm");
class AddCompany1651435068897 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'company',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'billing_address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'owner_id',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('company');
    }
}
exports.AddCompany1651435068897 = AddCompany1651435068897;
//# sourceMappingURL=1651435068897-AddCompany.js.map