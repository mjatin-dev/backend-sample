"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integration1657858372094 = void 0;
const typeorm_1 = require("typeorm");
class Integration1657858372094 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'integration',
            columns: [
                {
                    name: 'integration_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'application_name',
                    type: 'varchar',
                },
                {
                    name: 'application_description',
                    type: 'varchar',
                },
                {
                    name: 'application_icon',
                    type: 'varchar',
                },
                {
                    name: 'provider_name',
                    type: 'varchar',
                },
                {
                    name: 'provider_link',
                    type: 'varchar',
                },
                {
                    name: 'total_installs',
                    type: 'varchar',
                },
                {
                    name: 'categories',
                    type: 'text',
                    isArray: true,
                },
                {
                    name: 'features',
                    type: 'text',
                    isArray: true,
                },
                {
                    name: 'languages',
                    type: 'varchar',
                },
                {
                    name: 'requirement_permissions',
                    type: 'text',
                    isNullable: true,
                    isArray: true,
                },
                {
                    name: 'subscription_title',
                    type: 'varchar',
                },
                {
                    name: 'subscriptions',
                    type: 'varchar',
                },
                {
                    name: 'subscription_link',
                    type: 'varchar',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('integration');
    }
}
exports.Integration1657858372094 = Integration1657858372094;
//# sourceMappingURL=1657858372094-Integration.js.map