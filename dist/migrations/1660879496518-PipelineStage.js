"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStage1660879496518 = void 0;
const typeorm_1 = require("typeorm");
class PipelineStage1660879496518 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'pipeline_stage',
            columns: [
                {
                    name: 'pipeline_stage_id',
                    type: 'int',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'pipeline_id',
                    type: 'int',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'goal',
                    type: 'text',
                },
                {
                    name: 'base_stage_id',
                    type: 'int',
                },
                {
                    name: 'order',
                    type: 'int',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('pipeline_stage');
    }
}
exports.PipelineStage1660879496518 = PipelineStage1660879496518;
//# sourceMappingURL=1660879496518-PipelineStage.js.map