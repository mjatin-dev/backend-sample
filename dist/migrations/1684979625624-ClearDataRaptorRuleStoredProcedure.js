"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearDataRaptorRuleStoredProcedure1684979625624 = void 0;
class ClearDataRaptorRuleStoredProcedure1684979625624 {
    async up(queryRunner) {
        await queryRunner.query(`
    CREATE OR REPLACE PROCEDURE public.clear_data_raptor_rule(IN p_rule_id text, IN p_target_table text, INOUT p_data jsonb DEFAULT '[]'::jsonb)
    LANGUAGE plpgsql
   AS $procedure$
   DECLARE
       r record;
   begin
     
     FOR r IN
       EXECUTE format('
         UPDATE %I.%I t1 
           SET rules_applied = jsonb_strip_nulls(COALESCE(rules_applied, jsonb_build_object())::jsonb - %L), 
             confidence_score = confidence_score + (rules_applied -> %L -> %L)::numeric 
           WHERE t1."rules_applied" ? %L 
           RETURNING "Id", confidence_score, rules_applied', 
         split_part(p_target_table, '.', 1), split_part(p_target_table, '.', 2), 
         p_rule_id, 
         p_rule_id, 'violation_score', 
         p_rule_id)
      LOOP
           p_data := jsonb_insert(
               p_data,
               '{0}',
               jsonb_build_object('Id', r."Id", 'confidence_score', r.confidence_score, 'rules_applied', r.rules_applied),
               true
           );
       END LOOP;
     
   END;
   $procedure$;
   `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
    DROP PROCEDURE public.clear_data_raptor_rule
    `);
    }
}
exports.ClearDataRaptorRuleStoredProcedure1684979625624 = ClearDataRaptorRuleStoredProcedure1684979625624;
//# sourceMappingURL=1684979625624-ClearDataRaptorRuleStoredProcedure.js.map