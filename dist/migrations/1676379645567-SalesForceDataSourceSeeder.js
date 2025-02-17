"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesForceDataSourceSeeder1676379645567 = void 0;
class SalesForceDataSourceSeeder1676379645567 {
    async up(queryRunner) {
        await queryRunner.query(`
            INSERT INTO public.data_source( "name", integration_id)
            VALUES('Salesforce', 'salesforce');
          `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
          DELETE FROM public.data_source where "name" = 'Salesforce';
          `);
    }
}
exports.SalesForceDataSourceSeeder1676379645567 = SalesForceDataSourceSeeder1676379645567;
//# sourceMappingURL=1676379645567-SalesForceDataSourceSeeder.js.map