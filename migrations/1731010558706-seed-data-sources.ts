import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedDataSources1731010558706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public.data_source
    ("name", integration_id, data_source_id, "type")
    VALUES('Salesforce', 'salesforce', '4ccd6956-f0a9-4b22-b6e0-c203f2ba4a8a'::uuid, 'tenant');
    INSERT INTO public.data_source
    ("name", integration_id, data_source_id, "type")
    VALUES('Office 365', 'office365', 'c6cda2f1-c50d-41e6-bdc5-7b9267dfd653'::uuid, 'user'); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM public.data_source WHERE data_source_id = '4ccd6956-f0a9-4b22-b6e0-c203f2ba4a8a'::uuid;
    DELETE FROM public.data_source WHERE data_source_id = 'c6cda2f1-c50d-41e6-bdc5-7b9267dfd653'::uuid;
    `);
  }
}
