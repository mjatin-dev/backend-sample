import { RuleDto } from './rule.dto';
import { FrontEndRuleDto } from './front-end-rule.dto';
import { FormattedRuleDto } from './formatted-rule.dto';
export declare class UpdateRuleDto {
    table?: string;
    name?: string;
    rule?: RuleDto;
    violationScore?: number;
    formattedRule?: FormattedRuleDto;
    active?: boolean;
    description?: string;
    type?: string;
    risk?: string;
    department?: string;
    frontEndObject?: FrontEndRuleDto;
    previousFormattedRule?: FormattedRuleDto;
    tableDependencies?: string[];
}
