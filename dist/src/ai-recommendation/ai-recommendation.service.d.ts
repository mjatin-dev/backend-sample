import { AIRecommendation } from './ai-recommendation.types';
export declare class AiRecommendationService {
    getAiRecommendationByIds(tenantId: number, dataSourceId: string, ids: string[], recordUpdatedAt?: Date): Promise<AIRecommendation[]>;
    getAiRecommendationById(tenantId: number, dataSourceId: string, id: string): Promise<AIRecommendation[]>;
    updateAiRecommendationFeedBack(tenantId: number, dataSourceId: string, id: string, feedback: boolean): Promise<void>;
}
