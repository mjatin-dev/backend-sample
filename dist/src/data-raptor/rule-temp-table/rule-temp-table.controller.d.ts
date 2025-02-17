import { IAuthedUser } from '@/auth/types';
import { RuleTempTableService } from './rule-temp-table.service';
import { CreateRuleTempTable, UpdateRuleTempTableDto } from './rule-temp-table.dto';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { SuccessResponseObject } from '@/common/http';
export declare enum TemporalTableActions {
    CREATE = "CREATE",
    UPDATE = "UPDATE"
}
export declare class RuleTempTableController {
    private readonly ruleTempTableService;
    private readonly dataMigrationService;
    constructor(ruleTempTableService: RuleTempTableService, dataMigrationService: DataMigrationService);
    validateMigrationIdOwnership(authedUser: IAuthedUser, migrationId: string): Promise<import("../../data-migration/entities/dataMigration.entity").DataMigration>;
    getTempTables(authedUser: IAuthedUser, migrationId: string): Promise<SuccessResponseObject>;
    getCheckNameAvailability(authedUser: IAuthedUser, migrationId: string, name: string): Promise<SuccessResponseObject>;
    getTempTableById(authedUser: IAuthedUser, migrationId: string, tableId: string): Promise<SuccessResponseObject>;
    createTempTable(authedUser: IAuthedUser, migrationId: string, body: CreateRuleTempTable): Promise<SuccessResponseObject>;
    updateTempTable(authedUser: IAuthedUser, migrationId: string, tempTableId: string, body: UpdateRuleTempTableDto): Promise<SuccessResponseObject>;
    deleteTempTable(authedUser: IAuthedUser, migrationId: string, tableId: string): Promise<SuccessResponseObject>;
}
