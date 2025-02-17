import { ApiProperty } from '@nestjs/swagger';
import { DataValidationState } from './record-report.dto';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateDataValidationDto {
  @IsEnum(DataValidationState)
  @IsNotEmpty()
  @ApiProperty({ enum: DataValidationState, required: true })
  action: DataValidationState;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  columnName: string;
}
