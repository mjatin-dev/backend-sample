"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spUpsertAnomalyResult1705698361446 = void 0;
class spUpsertAnomalyResult1705698361446 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE OR REPLACE PROCEDURE public.sp_upsert_anomaly_detection_result(IN p_schema_name text, IN p_id text, IN p_table_name text, IN p_record_id text, IN p_rule_id text, IN p_record jsonb, IN p_details jsonb, IN p_ai_recommendation jsonb)
        LANGUAGE plpgsql
    AS $procedure$ 
        DECLARE
            _exists BOOLEAN;
        begin
            EXECUTE format('SELECT EXISTS (SELECT 1 FROM %I.cc_anomaly_result WHERE id = $1)', p_schema_name)
                INTO _exists
                USING p_id;
            
            -- Check if record exists
            IF (_exists) THEN
                -- Update existing record
                EXECUTE format('UPDATE %I."cc_anomaly_result" SET "table_name" = $2, "record_id" = $3, "rule_id" = $4, "record" = $5, "details" = $6, "ai_recommendation" = $7 WHERE "id" = $1', p_schema_name)
                USING p_id, p_table_name, p_record_id, p_rule_id, p_record, p_details, p_ai_recommendation;
            ELSE
                -- Insert new record
                EXECUTE format('INSERT INTO %I."cc_anomaly_result" ("id", "table_name", "record_id", "rule_id", "record", "details", "ai_recommendation") VALUES ($1, $2, $3, $4, $5, $6, $7)', p_schema_name)
                USING p_id, p_table_name, p_record_id, p_rule_id, p_record, p_details, p_ai_recommendation;
            END IF;
        END;
        $procedure$;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`drop procedure public.sp_upsert_anomaly_detection_result;`);
    }
}
exports.spUpsertAnomalyResult1705698361446 = spUpsertAnomalyResult1705698361446;
//# sourceMappingURL=1705698361446-sp_upsert-anomaly-result.js.map