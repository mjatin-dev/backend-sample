"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIntegration16578781498194 = void 0;
const typeorm_1 = require("typeorm");
class UserIntegration16578781498194 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_integration',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'integration_id',
                    type: 'int',
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'tokens',
                    type: 'json',
                },
                {
                    name: 'application_status',
                    type: 'enum',
                    enum: ['installed', 'uninstalled'],
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['integration_id'],
                    referencedColumnNames: ['integration_id'],
                    referencedTableName: 'integration',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    columnNames: ['user_id'],
                    referencedColumnNames: ['user_id'],
                    referencedTableName: 'user',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user_integration');
    }
}
exports.UserIntegration16578781498194 = UserIntegration16578781498194;
//# sourceMappingURL=1657871498194-UserIntegration.js.map