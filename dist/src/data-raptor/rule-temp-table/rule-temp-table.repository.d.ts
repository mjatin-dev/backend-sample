import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleTempTable } from './rule-temp-table.entity';
export interface TempTableDependency {
    ruleTempTableId: string;
    ruleId: string;
}
export declare class RuleTempTableRepository extends BaseRepository<RuleTempTable> {
    getDependenciesAssociated(migrationId: string, tableId: string): Promise<TempTableDependency[]>;
}
