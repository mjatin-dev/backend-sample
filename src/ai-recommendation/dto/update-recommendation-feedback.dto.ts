import { IsString, IsDefined, IsBoolean, IsEnum } from 'class-validator';

export class UpdateRecommendationFeedbackDto {
  @IsString()
  @IsDefined()
  id: string;

  @IsBoolean()
  @IsDefined()
  liked: boolean;
}

export enum RecommendationActionEnum {
  ACCEPT = 'accept',
  IGNORE = 'reject',
}

export class RecommendationActionDto {
  @IsString()
  @IsDefined()
  recommendationId: string;

  @IsString()
  @IsDefined()
  fieldName: string;

  @IsEnum(RecommendationActionEnum)
  @IsDefined()
  @IsString()
  action: string;

  @IsString()
  @IsDefined()
  value: string;
}
