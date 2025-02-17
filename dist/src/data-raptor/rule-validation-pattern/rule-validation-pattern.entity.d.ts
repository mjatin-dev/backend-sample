import { RuleValidationPatternReturnValue } from './rule-validation-pattern.dto';
declare enum ValidationPatternType {
    REGEX = "REGEX",
    SERVICE = "SERVICE"
}
declare enum ValidationPatternValidityService {
    DATA_VALIDATION_SERVICE = "DATA_VALIDATION_SERVICE"
}
declare enum ValidationPatternCategory {
    EMAIL_FORMAT = "EMAIL_FORMAT",
    EMAIL_VALIDITY = "EMAIL_VALIDITY",
    PHONE_FORMAT = "PHONE_FORMAT",
    PHONE_VALIDITY = "PHONE_VALIDITY"
}
declare enum ValidationDataType {
    EMAIL = "EMAIL",
    PHONE = "PHONE"
}
export declare class ValidationPattern {
    validationPatternId: number;
    description: string;
    label: string;
    expression: string;
    example: string;
    dataType: ValidationDataType;
    type: ValidationPatternType;
    category: ValidationPatternCategory;
    returnValueSchema: RuleValidationPatternReturnValue;
    serviceName: ValidationPatternValidityService;
}
export {};
