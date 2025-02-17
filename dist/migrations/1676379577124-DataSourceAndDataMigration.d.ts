import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DataSourceAndDataMigration1676379577124 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
