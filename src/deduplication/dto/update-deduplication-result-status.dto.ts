import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export enum DeduplicationResultStatus {
  ACTIVE = 'A',
  IGNORED = 'I',
}

export class UpdateDeduplicationResultStatusRequest {
  @IsEnum(DeduplicationResultStatus)
  status: DeduplicationResultStatus;

  @IsString({ each: true })
  @ArrayNotEmpty()
  resultIds: string[];
}

export class MergeDuplicatedRecordsRequest {
  @IsString()
  @IsNotEmpty()
  masterRecordId: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  duplicateRecordIds: string[];

  @IsOptional()
  @IsObject()
  overWriteValues: Record<string, any>;

  @IsString()
  @IsNotEmpty()
  objectType: string;
}
