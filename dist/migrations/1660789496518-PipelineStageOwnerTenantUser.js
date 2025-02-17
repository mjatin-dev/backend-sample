"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStageOwnerTenantUser1660789496518 = void 0;
const typeorm_1 = require("typeorm");
class PipelineStageOwnerTenantUser1660789496518 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'pipeline_stage_owner_tenant_user',
            columns: [
                {
                    name: 'pipeline_stage_owner_tenant_user_id',
                    type: 'int',
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: 'pipeline_stage_id',
                    type: 'int',
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['pipeline_stage_id'],
                    referencedColumnNames: ['pipeline_stage_id'],
                    referencedTableName: 'pipeline_stage',
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
        await queryRunner.dropTable('pipeline_stage_owner_tenant_user');
    }
}
exports.PipelineStageOwnerTenantUser1660789496518 = PipelineStageOwnerTenantUser1660789496518;
//# sourceMappingURL=1660789496518-PipelineStageOwnerTenantUser.js.map