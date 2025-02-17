import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { AIRecommendation } from './ai-recommendation.types';

@Injectable()
export class AiRecommendationService {
  getAiRecommendationByIds(
    tenantId: number,
    dataSourceId: string,
    ids: string[],
    recordUpdatedAt?: Date,
  ): Promise<AIRecommendation[]> {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');

    let conditionalRecordUpdatedAt = '';
    try {
      if (recordUpdatedAt && recordUpdatedAt.toISOString()) {
        conditionalRecordUpdatedAt = `and "created_at" >= '${recordUpdatedAt.toISOString()}'`;
      }
    } catch (e) {
      console.log('Error converting to ISO string date', e);
    }

    console.log({
      conditionalRecordUpdatedAt,
      recordUpdatedAt,
      type: typeof recordUpdatedAt,
    });

    const query = `
    SELECT *
    FROM "${schemaName}".cc_ai_recommendation
    WHERE "Id" = ANY($1) ${conditionalRecordUpdatedAt}
  `;
    return getConnection().query(query, [ids]);
  }

  getAiRecommendationById(
    tenantId: number,
    dataSourceId: string,
    id: string,
  ): Promise<AIRecommendation[]> {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const query = `
    SELECT *
    FROM "${schemaName}".cc_ai_recommendation
    WHERE "Id" = $1
  `;
    return getConnection().query(query, [id]);
  }

  async updateAiRecommendationFeedBack(
    tenantId: number,
    dataSourceId: string,
    id: string,
    feedback: boolean,
  ): Promise<void> {
    const schemaName = `mig_${tenantId}_${dataSourceId}`.replace(/(\-)/g, '_');
    const query = `
    UPDATE "${schemaName}".cc_ai_recommendation
    SET "feedback" = $1
    WHERE "Id" = $2
  `;
    return getConnection().query(query, [feedback, id]);
  }
}
