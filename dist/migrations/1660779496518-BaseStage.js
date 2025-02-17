"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStage1660779496518 = void 0;
const typeorm_1 = require("typeorm");
class BaseStage1660779496518 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'base_stage',
            columns: [
                {
                    name: 'base_stage_id',
                    type: 'int',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('base_stage');
    }
}
exports.BaseStage1660779496518 = BaseStage1660779496518;
//# sourceMappingURL=1660779496518-BaseStage.js.map