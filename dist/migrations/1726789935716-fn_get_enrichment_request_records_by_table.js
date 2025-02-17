"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnGetEnrichmentRequestRecordsByTable1726789935716 = void 0;
class fnGetEnrichmentRequestRecordsByTable1726789935716 {
    async up(queryRunner) {
        await queryRunner.query(`
    CREATE OR REPLACE FUNCTION public.get_enrichment_request_records_by_table(p_schema text, p_table text, p_type text)
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
                LEFT JOIN %I."Account" a ON c."AccountId" = a."Id"',
                p_schema,
                p_table,
                p_schema
            );
        ELSEIF p_table = 'Lead' THEN 
            RETURN QUERY
            EXECUTE format('
                SELECT 
                    COALESCE(l."Name", l."FirstName" || '' '' || l."LastName") AS name,
                    trim(l."Company") AS company, 
                    trim(l."Email") AS email 
                FROM %I.%I l',
                p_schema,
                p_table
            );
        ELSE
          RETURN QUERY 
        SELECT NULL::RECORD WHERE FALSE;
        END IF;
    END;
    $function$;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP FUNCTION public.get_enrichment_request_records_by_table(text, text, text);`);
    }
}
exports.fnGetEnrichmentRequestRecordsByTable1726789935716 = fnGetEnrichmentRequestRecordsByTable1726789935716;
//# sourceMappingURL=1726789935716-fn_get_enrichment_request_records_by_table.js.map