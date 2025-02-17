"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product1652551000290 = void 0;
const typeorm_1 = require("typeorm");
class Product1652551000290 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'product',
            columns: [
                {
                    name: 'product_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'product_name',
                    type: 'varchar',
                },
                {
                    name: 'product_description',
                    type: 'varchar',
                },
                {
                    name: 'product_category',
                    type: 'varchar',
                },
                {
                    name: 'product_rate_charge_type',
                    type: 'varchar',
                },
                {
                    name: 'product_currency',
                    type: 'varchar',
                },
                {
                    name: 'product_price',
                    type: 'float4',
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
        await queryRunner.dropTable('product');
    }
}
exports.Product1652551000290 = Product1652551000290;
//# sourceMappingURL=1652551000290-Product.js.map