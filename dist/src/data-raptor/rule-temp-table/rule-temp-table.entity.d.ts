import { Migration } from 'typeorm';
import { RuleDto } from '../rule/dto/rule.dto';
import { FormattedRuleDto } from '../rule/dto/formatted-rule.dto';
import { Rule } from '../rule/rule.entity';
export declare class RuleTempTable {
    ruleTempTableId: string;
    table: string;
    name: string;
    formattedTableName: string;
    definition: RuleDto;
    formattedDefinition: FormattedRuleDto;
    sampleIds?: string[];
    createdAt: Date;
    updatedAt: Date;
    dataMigrationId: string;
    migration?: Migration;
    rules: Rule[];
}
