"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRulesSpToGatherTableAndRecordStats1727989769261 = void 0;
class updateRulesSpToGatherTableAndRecordStats1727989769261 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE public.upsert_schema_table_stat_record(IN p_schema_name text, IN p_table_name text, IN p_record_type text, IN p_avg_score numeric, IN p_row_count numeric default 0, in p_row_affected_count numeric default 0)
        LANGUAGE plpgsql
        AS $procedure$
            BEGIN

            EXECUTE format('INSERT INTO %I."cc_schema_table_stats" ("table_name", "date", "type", "avg_confidence_score", "row_count", "row_affected_count") values($1, $2, $3, $4, $5, $6)
                on conflict ("table_name", "date", "type")
                do update set "avg_confidence_score" = $7, "row_count" = $8, "row_affected_count" = $9', p_schema_name)
                USING p_table_name, now(), p_record_type, p_avg_score, p_row_count, p_row_affected_count, p_avg_score, p_row_count, p_row_affected_count;

            EXCEPTION
                WHEN OTHERS THEN
                    RAISE NOTICE 'An error occurred';

            END;
        $procedure$;`);
        await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE public.upsert_schema_record_stat_record(p_record_id TEXT, p_schema_name TEXT, p_table_name TEXT, p_record_type TEXT, p_score NUMERIC)
            LANGUAGE plpgsql
        AS $procedure$
            BEGIN

            EXECUTE format('INSERT INTO %I."cc_schema_record_stats" ("record_id", "table_name", "date", "type", "confidence_score") values($1, $2, $3, $4, $5)
                on conflict ("record_id","table_name", "date", "type")
                do update set "confidence_score" = $6', p_schema_name)
                USING p_record_id, p_table_name, now(), p_record_type, p_score, p_score;

            EXCEPTION
                WHEN OTHERS THEN
                    RAISE NOTICE 'An error occurred';

            END;
        $procedure$;`);
        await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE public.update_data_raptor_table_info(IN p_table_name text)
        LANGUAGE plpgsql
        AS $procedure$
        DECLARE
            l_row_count NUMERIC;
            l_confidence_score_avg NUMERIC;
            l_row_affected_count NUMERIC;
        BEGIN
            EXECUTE format('SELECT COUNT(*), AVG(confidence_score) FROM %I.%I', split_part(p_table_name, '.', 1), split_part(p_table_name, '.', 2))
            INTO l_row_count, l_confidence_score_avg;
        
            EXECUTE format('SELECT COUNT(*) FROM %I.%I WHERE rules_applied != $1', 
                split_part(p_table_name, '.', 1), 
                split_part(p_table_name, '.', 2))
            using '{}'::JSONB
            INTO l_row_affected_count;
        
            EXECUTE format('UPDATE %I.%I SET row_count = %s, avg_confidence_score = %s, affected_rows = %s, updated_at = now() where table_name = %L', 
                split_part(p_table_name, '.', 1), 
                'schema_tables', 
                l_row_count, 
                l_confidence_score_avg, 
                l_row_affected_count,
                split_part(p_table_name, '.', 2));

            CALL public.upsert_schema_table_stat_record(
                split_part(p_table_name, '.', 1), 
                split_part(p_table_name, '.', 2), 
                'score', 
                l_confidence_score_avg,
                l_row_count,
		        l_row_affected_count
            );

        END;
        $procedure$;`);
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

                CALL public.upsert_schema_record_stat_record(
                    r."Id", 
                    split_part(p_target_table, '.', 1), 
                    split_part(p_target_table, '.', 2), 
                    'score', 
                    r."confidence_score"
                );

            END LOOP;
            
        END;
        $procedure$;`);
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

                CALL public.upsert_schema_record_stat_record(
                    r."Id", 
                    split_part(p_target_table, '.', 1), 
                    split_part(p_target_table, '.', 2), 
                    'score', 
                    r."confidence_score"
                );

            END LOOP;
        END;
        $procedure$;    
    `);
        await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE public.apply_data_raptor_rule(IN p_query text, IN p_action text, IN p_rule_id text, IN p_target_table text, IN p_violation_score numeric DEFAULT NULL::numeric, IN p_rule_name text DEFAULT NULL::text, INOUT p_data jsonb[] DEFAULT '{}'::jsonb[])
        LANGUAGE plpgsql
        AS $procedure$
        DECLARE
            r record;
            l_rule_data jsonb;
            result_data jsonb[];
            updated_confidence_score numeric;
        BEGIN
            l_rule_data := jsonb_build_object('violation_score', p_violation_score, 'rule_name', p_rule_name);
            
            FOR r IN EXECUTE p_query LOOP
                IF p_action = 'remove' AND r.rules_applied ? p_rule_id THEN
                    EXECUTE format('
                        UPDATE %I.%I t1 
                            SET rules_applied = jsonb_strip_nulls(COALESCE(rules_applied, jsonb_build_object())::jsonb - %L), 
                                confidence_score = confidence_score + (rules_applied -> %L -> %L)::numeric 
                            WHERE t1."Id" = %L 
                            RETURNING confidence_score',
                        split_part(p_target_table, '.', 1), split_part(p_target_table, '.', 2), 
                        p_rule_id, 
                        p_rule_id, 'violation_score', 
                        r."Id") 
                    INTO updated_confidence_score;
                ELSIF p_action = 'apply' AND NOT r.rules_applied ? p_rule_id THEN
                    EXECUTE format('
                        UPDATE %I.%I t1 
                            SET rules_applied = jsonb_set(COALESCE(rules_applied, jsonb_build_object()), %L, %L), 
                                confidence_score = confidence_score - %s 
                            WHERE t1."Id" = %L 
                            RETURNING confidence_score', 
                        split_part(p_target_table, '.', 1), split_part(p_target_table, '.', 2), 
                        '{'||p_rule_id||'}', l_rule_data, 
                        p_violation_score, 
                        r."Id") 
                    INTO updated_confidence_score;
                END IF;

                CALL public.upsert_schema_record_stat_record(
                    r."Id", split_part(p_target_table, '.', 1), 
                    split_part(p_target_table, '.', 2), 
                    'score', 
                    updated_confidence_score
                );

                -- Add additional data to the result_data array
                result_data := result_data || jsonb_build_object('Id', r."Id", 'confidence_score', updated_confidence_score);
            END LOOP;
            
            -- Assign the result_data array to p_data
            p_data := result_data;
        END;
        $procedure$;`);
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

                    CALL public.upsert_schema_record_stat_record(
                        r."Id", 
                        split_part(p_target_table, '.', 1), 
                        split_part(p_target_table, '.', 2), 
                        'score', 
                        r."confidence_score"
                    );

                END LOOP;
            -- Assign the result_data array to p_data
            p_data := result_data;
        END;
        $procedure$;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`
    DROP PROCEDURE public.upsert_schema_table_stat_record();
    DROP PROCEDURE public.upsert_schema_record_stat_record();
    DROP PROCEDURE public.update_data_raptor_table_info(text);
    DROP PROCEDURE public.clear_data_raptor_rule(in text, in text, inout jsonb);
    DROP PROCEDURE public.clear_data_raptor_rule_by_record_ids(in text, in text, in _text, inout jsonb);
    DROP PROCEDURE public.apply_data_raptor_rule(in text, in text, in text, in text, in numeric, in text, inout _jsonb);
    DROP PROCEDURE public.apply_data_raptor_rule_by_record_ids(in _text, in text, in text, in numeric, in text, inout _jsonb);`);
    }
}
exports.updateRulesSpToGatherTableAndRecordStats1727989769261 = updateRulesSpToGatherTableAndRecordStats1727989769261;
//# sourceMappingURL=1727989769261-update-rules-sp-to-gather-table-and-record-stats.js.map