import { MigrationInterface, QueryRunner } from 'typeorm';

export class spToGatherRuleStatInformation1729684720477
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE PROCEDURE public.upsert_schema_rule_stat_record(IN p_schema_name text, IN p_table_name text, IN p_rule_id text, IN p_row_affected_count numeric)
    LANGUAGE plpgsql
    AS $procedure$
        BEGIN
        
        EXECUTE format('INSERT INTO %I."cc_schema_rule_stats" ("rule_id", "table", "date", "affected_row_count") values($1, $2, $3, $4)
            on conflict ("rule_id", "date", "table")
            do update set "affected_row_count" = $5', p_schema_name)
            USING p_rule_id, p_table_name, now(), p_row_affected_count, p_row_affected_count;

        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE 'An error occurred';
            
        END;
    $procedure$;`);

    await queryRunner.query(`
    CREATE OR REPLACE PROCEDURE public.update_data_raptor_rule_info(IN p_rule_id text)
    LANGUAGE plpgsql
    AS $procedure$
        DECLARE 
            v_affected_row_count NUMERIC;
            v_schema TEXT;
            v_table TEXT;
        BEGIN

            select r."table", 'mig_' || coalesce(dm.tenant_id, dm.user_id) || '_' || replace(dm.data_source_id::text, '-', '_') schema_name 
            into v_table, v_schema
            from public."rule" r inner join public."data_migration" dm on r.data_migration_id::UUID = dm.data_migration_id 
            where r.rule_id = p_rule_id::UUID limit 1;

            if(v_table is not null and v_schema is not null) then

                Execute(format('
                select count(*) 
                from %I.%I c
                where c.rules_applied ? $1', v_schema, v_table))
                into v_affected_row_count
                using p_rule_id;
        
                CALL public.upsert_schema_rule_stat_record(
                    v_schema, 
                    v_table, 
                    p_rule_id,
                    v_affected_row_count
                );
        
                update public."rule" 
                set "violated_row_count" = v_affected_row_count
                where "rule_id" = p_rule_id::UUID;

            end if;
        END;
    $procedure$;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP PROCEDURE public.upsert_schema_rule_stat_record(text, text, text, numeric);
    DROP PROCEDURE public.update_data_raptor_rule_info(text);
    `);
  }
}
