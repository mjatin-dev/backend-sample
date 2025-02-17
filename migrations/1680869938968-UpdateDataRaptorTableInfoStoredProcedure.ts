import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDataRaptorTableInfoStoredProcedure1680869938968
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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
      END;
      $procedure$;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP PROCEDURE public.update_data_raptor_table_info(text);`,
    );
  }
}
