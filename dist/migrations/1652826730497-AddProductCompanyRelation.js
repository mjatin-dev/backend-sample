"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductCompanyRelation1652826730497 = void 0;
const typeorm_1 = require("typeorm");
class AddProductCompanyRelation1652826730497 {
    async up(queryRunner) {
        await queryRunner.addColumn('product', new typeorm_1.TableColumn({
            name: 'company_id',
            type: 'int',
        }));
        await queryRunner.createForeignKey('product', new typeorm_1.TableForeignKey({
            columnNames: ['company_id'],
            referencedColumnNames: ['company_id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
        await queryRunner.renameColumn('product', 'created_at', 'product_created_at');
        await queryRunner.renameColumn('product', 'updated_at', 'product_updated_at');
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('product');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('company_id') !== -1);
        await queryRunner.dropForeignKey('product', foreignKey);
        await queryRunner.dropColumn('product', 'company_id');
        await queryRunner.renameColumn('product', 'product_created_at', 'created_at');
        await queryRunner.renameColumn('product', 'product_updated_at', 'updated_at');
    }
}
exports.AddProductCompanyRelation1652826730497 = AddProductCompanyRelation1652826730497;
//# sourceMappingURL=1652826730497-AddProductCompanyRelation.js.map