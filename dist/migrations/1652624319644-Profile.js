"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile1652624319644 = void 0;
const typeorm_1 = require("typeorm");
class Profile1652624319644 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'profile',
            columns: [
                {
                    name: 'profile_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'work_phone_number',
                    type: 'varchar',
                },
                {
                    name: 'additional_phone_number',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'profile_job_role',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'profile_created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'profile_updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
        await queryRunner.createForeignKey('profile', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('profile');
    }
}
exports.Profile1652624319644 = Profile1652624319644;
//# sourceMappingURL=1652624319644-Profile.js.map