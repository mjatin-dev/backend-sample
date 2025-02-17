import { RuleDto } from './rule.dto';
import { FormattedRuleDto } from './formatted-rule.dto';
export declare class CreateRuleDto {
    table: string;
    name: string;
    rule: RuleDto;
    violationScore: number;
    formattedRule?: FormattedRuleDto;
    active?: boolean;
    description: string;
    type: string;
    risk: string;
    department: string;
    frontEndObject: any;
    tableDependencies?: string[];
}
