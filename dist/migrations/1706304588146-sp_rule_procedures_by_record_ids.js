"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spRuleProceduresByRecordIds1706304588146 = void 0;
class spRuleProceduresByRecordIds1706304588146 {
    async up(queryRunner) {
        await queryRunner.query(`
    CREATE OR REPLACE PROCEDURE public.clear_data_raptor_rule_by_record_ids(IN p_rule_id text, IN p_target_table text, IN p_record_ids text[], INOUT p_data jsonb DEFAULT '[]'::jsonb)
     LANGUAGE plpgsql
    AS $procedure$
    DECLARE
        r record;
    Begin
        FOR r IN
            EXECUTE format('
                UPDATE %I.%I t1 
                    SET rules_applied = jsonb_strip_nulls(COALESCE(rules_applied, jsonb_build_object())::jsonb - %L), 
                        confidence_score = "confidence_score" + COALESCE((rules_applied -> %L -> %L)::numeric , 0)
                    WHERE t1."Id" = ANY(%L::text[])
                    RETURNING "Id", "confidence_score"', 
                split_part(p_target_table, '.', 1), 
                split_part(p_target_table, '.', 2), 
                p_rule_id, 
                p_rule_id, 
                'violation_score', 
                p_record_ids)
         LOOP
            p_data := jsonb_insert(
                p_data,
                '{0}',
                jsonb_build_object('Id', r."Id", 'confidence_score', r."confidence_score"),
                true
            );
        END LOOP;
    END;
    $procedure$
    ;`);
        await queryRunner.query(`
    CREATE OR REPLACE PROCEDURE public.apply_data_raptor_rule_by_record_ids(IN p_record_ids text[], IN p_rule_id text, IN p_target_table text, IN p_violation_score numeric DEFAULT NULL::numeric, IN p_rule_name text DEFAULT NULL::text, INOUT p_data jsonb[] DEFAULT '{}'::jsonb[])
    LANGUAGE plpgsql
    AS $procedure$
    DECLARE
        r record;
        l_rule_data jsonb;
        result_data jsonb[];
        updated_confidence_score numeric;
    begin
        
        l_rule_data := jsonb_build_object('violation_score', p_violation_score, 'rule_name', p_rule_name);
        
        FOR r IN EXECUTE format('
                    UPDATE %I.%I t1 
                        SET rules_applied = jsonb_set(COALESCE(rules_applied, jsonb_build_object()), %L, %L), 
                            confidence_score = COALESCE(confidence_score, 0) - %s 
                        WHERE t1."Id" = ANY(%L::text[])
                        RETURNING "Id", "confidence_score"', 
                    split_part(p_target_table, '.', 1), 
                    split_part(p_target_table, '.', 2), 
                    '{'||p_rule_id||'}', 
                    l_rule_data, 
                    p_violation_score, 
                    p_record_ids)
            LOOP
                -- Add additional data to the result_data array
                result_data := result_data || jsonb_build_object('Id', r."Id", 'confidence_score', r."confidence_score");
            END LOOP;
        -- Assign the result_data array to p_data
        p_data := result_data;
    END;
    $procedure$
    ;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP PROCEDURE public.clear_data_raptor_rule_by_record_ids(in text, in text, in _text, inout jsonb);`);
        await queryRunner.query(`DROP PROCEDURE public.apply_data_raptor_rule_by_record_ids(in _text, in text, in text, in numeric, in text, inout _jsonb);`);
    }
}
exports.spRuleProceduresByRecordIds1706304588146 = spRuleProceduresByRecordIds1706304588146;
//# sourceMappingURL=1706304588146-sp_rule_procedures_by_record_ids.js.map