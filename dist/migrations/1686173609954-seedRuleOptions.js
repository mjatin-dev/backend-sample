"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRuleOptions1686173609954 = void 0;
class seedRuleOptions1686173609954 {
    async up(queryRunner) {
        await queryRunner.query(`
        INSERT INTO rule_department ("name", "label", "description")
        values('sales', 'Sales', 'Sales department'),
        ('marketing', 'Marketing', 'Marketing department'),
        ('finance', 'Finance', 'Finance department'),
        ('customer-success', 'Customer Success', 'Customer Success department'),
        ('others', 'Others', 'Others departments');
    

        INSERT INTO rule_risk ("name", "label", "description")
        values('low', 'Low', 'Low risk'),
        ('medium', 'Medium', 'Medium risk'),
        ('high', 'High', 'High department');

        INSERT INTO public.rule_type (rule_type_id, "name", "label", description, deleted_at, color) VALUES('63b552f2-7a29-4830-8a87-3b763cce4c96'::uuid, 'duplicate-detection', 'Duplicate Detection', 'Duplicate Detection rule type', '2024-02-27 10:07:48.657', NULL);
        INSERT INTO public.rule_type (rule_type_id, "name", "label", description, deleted_at, color) VALUES('5dbcb728-1d5a-43b9-b04a-778f7ebf5bdd'::uuid, 'data-validation', 'Data Validation', 'Data Validation rule type', NULL, '#60C67C');
        INSERT INTO public.rule_type (rule_type_id, "name", "label", description, deleted_at, color) VALUES('b73abc64-71b9-4186-a97a-e83917fe7a09'::uuid, 'anomaly-detection', 'Anomaly Detection', 'Anomaly Detection rule type', NULL, '#FFE500');
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`

    Delete from rule_department
    where "name" in ('sales', 'marketing', 'finance', 'customer-success', 'others');

    Delete from rule_risk
    where "name" in ('low', 'medium', 'high');

    Delete from rule_type
    where "name" in ('duplicate-detection', 'data-validation');
    `);
    }
}
exports.seedRuleOptions1686173609954 = seedRuleOptions1686173609954;
//# sourceMappingURL=1686173609954-seedRuleOptions.js.map