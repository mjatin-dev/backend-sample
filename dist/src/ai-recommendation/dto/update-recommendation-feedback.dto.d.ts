export declare class UpdateRecommendationFeedbackDto {
    id: string;
    liked: boolean;
}
export declare enum RecommendationActionEnum {
    ACCEPT = "accept",
    IGNORE = "reject"
}
export declare class RecommendationActionDto {
    recommendationId: string;
    fieldName: string;
    action: string;
    value: string;
}
