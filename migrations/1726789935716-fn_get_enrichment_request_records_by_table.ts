import { MigrationInterface, QueryRunner } from 'typeorm';

export class fnGetEnrichmentRequestRecordsByTable1726789935716
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP FUNCTION public.get_enrichment_request_records_by_table(text, text, text);`,
    );
  }
}
