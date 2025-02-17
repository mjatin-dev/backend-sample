import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDefinedProcess1707875203191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public.defined_process (defined_process_id, "name", description, params) VALUES('f494d3b5-1edf-4b76-808e-5e801f5dd16a'::uuid, 'APPLY_DEFAULT_MIGRATION_RULES', 'Apply defined default data raptor rules', '{"templateRuleIds": ["90d1f802-30e8-4961-bc02-12a8a02f56c6", "6bd5387d-10b4-4aab-97e8-c8d2617452a7"]}'::jsonb);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.defined_process;`);
  }
}
