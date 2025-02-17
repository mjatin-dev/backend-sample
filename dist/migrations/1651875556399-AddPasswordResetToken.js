"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPasswordResetToken1651875556399 = void 0;
const typeorm_1 = require("typeorm");
class AddPasswordResetToken1651875556399 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'password_reset_token',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'expires_at',
                    type: 'timestamp',
                },
                {
                    name: 'consumed',
                    type: 'boolean',
                    isNullable: true,
                },
                {
                    name: 'consumed_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'user_id',
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
        await queryRunner.dropTable('password_reset_token');
    }
}
exports.AddPasswordResetToken1651875556399 = AddPasswordResetToken1651875556399;
//# sourceMappingURL=1651875556399-AddPasswordResetToken.js.map