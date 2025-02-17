import { ApiProperty } from '@nestjs/swagger';
import { DuplicatedDetectionState } from './record-report.dto';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateDuplicatedDetectionDto {
  @IsEnum(DuplicatedDetectionState)
  @IsNotEmpty()
  @ApiProperty({ enum: DuplicatedDetectionState })
  action: DuplicatedDetectionState;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  analysisId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  duplicatedId: string;
}
