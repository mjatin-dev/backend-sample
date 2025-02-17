export declare enum FuzzySearchLogicConnector {
    or = "OR",
    and = "AND"
}
export declare class FuzzySearchCondition {
    fieldName: string;
    value: string;
}
export declare class FuzzySearchDto {
    limit?: number;
    skip?: number;
    fallBackSearchField?: string[];
    minPercentage?: number;
    condition: FuzzySearchCondition;
}
