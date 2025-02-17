"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spUpsertDuplicateResultRow1698438560015 = void 0;
class spUpsertDuplicateResultRow1698438560015 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE OR REPLACE PROCEDURE public.sp_upsert_duplication_detection_result(IN schemaname text, IN p_id text, IN record_a_id text, IN record_b_id text, IN result jsonb, IN ai_recommendation jsonb, IN duplication_score numeric, IN master_record_id text, IN record_a_table text, IN record_b_table text)
    LANGUAGE plpgsql
   AS $procedure$
      DECLARE
          _exists BOOLEAN;
      begin
          EXECUTE format('SELECT EXISTS (SELECT 1 FROM %I.cc_duplicate_detection WHERE id = $1)', schemaname)
            INTO _exists
            USING p_id;
           
         -- Check if record exists
        IF (_exists) THEN
            -- Update existing record
            EXECUTE format('UPDATE %I."cc_duplicate_detection" SET "record_a_id" = $2, "record_b_id" = $3, "record_a_table" = $4, "record_b_table" = $5, "result" = $6, "ai_recommendation" = $7, "duplication_score" = $8, "master_record_id" = $9 WHERE "id" = $1', schemaName)
            USING p_id, record_a_id, record_b_id, record_a_table, record_b_table, result, ai_recommendation, duplication_score, master_record_id;
         ELSE
            -- Insert new record
            EXECUTE format('INSERT INTO %I."cc_duplicate_detection" ("id", "record_a_id", "record_b_id", "record_a_table", "record_b_table", "result", "ai_recommendation", "duplication_score", "master_record_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', schemaName)
            USING p_id, record_a_id, record_b_id, record_a_table, record_b_table, result, ai_recommendation, duplication_score, master_record_id;
         END IF;
      END;
      $procedure$
   ;
   `);
    }
    async down(queryRunner) {
        await queryRunner.query(`drop procedure public.sp_upsert_duplication_detection_result;`);
    }
}
exports.spUpsertDuplicateResultRow1698438560015 = spUpsertDuplicateResultRow1698438560015;
//# sourceMappingURL=1698438560015-sp_upsert-duplicate-result-row.js.map