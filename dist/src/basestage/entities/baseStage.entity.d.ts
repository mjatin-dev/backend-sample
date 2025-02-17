export declare enum BaseStageType {
    'Pre-Sales' = 0,
    'Sales' = 1,
    'Post-Sales' = 2
}
export declare class BaseStage {
    baseStageId: number;
    title: string;
    description: string;
    type: string;
}
