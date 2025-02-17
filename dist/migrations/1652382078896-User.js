"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User1652382078896 = void 0;
const typeorm_1 = require("typeorm");
class User1652382078896 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'user_name',
                    type: 'varchar',
                },
                {
                    name: 'user_email',
                    type: 'varchar',
                },
                {
                    name: 'contact_id',
                    type: 'int',
                },
                {
                    name: 'contact_first_name',
                    type: 'varchar',
                },
                {
                    name: 'contact_last_name',
                    type: 'varchar',
                },
                {
                    name: 'contact_middle_name',
                    type: 'varchar',
                },
                {
                    name: 'contact_email_id',
                    type: 'varchar',
                },
                {
                    name: 'user_created_on',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'user_modified_on',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'user_created_by',
                    type: 'varchar',
                },
                {
                    name: 'user_modified_by',
                    type: 'varchar',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.User1652382078896 = User1652382078896;
//# sourceMappingURL=1652382078896-User.js.map