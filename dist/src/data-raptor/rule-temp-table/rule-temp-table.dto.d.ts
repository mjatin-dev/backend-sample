import { RuleDto } from '../rule/dto/rule.dto';
export declare class UpdateRuleTempTableDto {
    table: string;
    name: string;
    definition: RuleDto;
}
export declare class CreateRuleTempTable {
    table: string;
    name: string;
    definition: RuleDto;
}
