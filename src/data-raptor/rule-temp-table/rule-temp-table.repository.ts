import { EntityRepository, createQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RuleTempTable } from './rule-temp-table.entity';

export interface TempTableDependency {
  ruleTempTableId: string;
  ruleId: string;
}

@EntityRepository(RuleTempTable)
export class RuleTempTableRepository extends BaseRepository<RuleTempTable> {
  async getDependenciesAssociated(
    migrationId: string,
    tableId: string,
  ): Promise<TempTableDependency[]> {
    const query = createQueryBuilder()
      .from('rule_temp_table', 'table')
      .innerJoin(
        'rule_temp_table_dependency',
        'dep',
        'dep.ruleTempTableId = table.rule_temp_table_id',
      )
      .innerJoin('rule', 'r', 'r.rule_id = dep.ruleId')
      .select('dep.ruleTempTableId', 'ruleTempTableId')
      .addSelect('dep.ruleId', 'ruleId')
      .where('table.rule_temp_table_id = :tableId', { tableId })
      .andWhere('table.data_migration_id = :migrationId', { migrationId });

    return query.getRawMany();
  }
}
