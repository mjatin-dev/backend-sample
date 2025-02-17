interface Option {
    label: string;
    value: string;
}
export interface valueSchema {
    keyName: string;
    label: string;
    type: string;
    options?: Option[];
}
export interface RuleValidationPatternReturnValue {
    [valueName: string]: valueSchema;
}
export {};
