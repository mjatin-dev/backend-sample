"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnGetEnrichmentRequestRecords1726707642985 = void 0;
class fnGetEnrichmentRequestRecords1726707642985 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE OR REPLACE FUNCTION public.get_enrichment_request_records(p_schema text, p_table text, p_type text, p_ids text[])
      RETURNS SETOF record
      LANGUAGE plpgsql
      AS $function$
      BEGIN
          IF p_table = 'Contact' THEN 
              RETURN QUERY
              EXECUTE format('
                  SELECT 
                      COALESCE(c."Name", c."FirstName" || '' '' || c."LastName") AS name,
                      trim(a."Name") AS company, 
                      trim(c."Email") AS email 
                  FROM %I.%I c
                  LEFT JOIN %I."Account" a ON c."AccountId" = a."Id"
                  WHERE c."Id" = ANY($1)',
                  p_schema,
                  p_table,
                  p_schema
              )
              USING p_ids;
          ELSEIF p_table = 'Lead' THEN 
              RETURN QUERY
              EXECUTE format('
                  SELECT 
                      COALESCE(l."Name", l."FirstName" || '' '' || l."LastName") AS name,
                      trim(l."Company") AS company, 
                      trim(l."Email") AS email 
                  FROM %I.%I l
                  WHERE l."Id" = ANY($1)',
                  p_schema,
                  p_table
              )
              USING p_ids;
          ELSE
            RETURN QUERY 
          SELECT NULL::RECORD WHERE FALSE;
          END IF;
      END;
      $function$;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP FUNCTION public.get_enrichment_request_records(text, text, text, _text);`);
    }
}
exports.fnGetEnrichmentRequestRecords1726707642985 = fnGetEnrichmentRequestRecords1726707642985;
//# sourceMappingURL=1726707642985-fn_get_enrichment_request_records.js.map