import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DataMigrationIdFromNumberToUUID1676635717509 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
