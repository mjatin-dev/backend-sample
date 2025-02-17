import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAuthedUser } from '@/auth/types';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { SuccessResponseObject } from '@/common/http';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import {
  DataValidationDto,
  DataValidationState,
  DuplicatedDetectionDto,
  DuplicatedDetectionState,
  RecordReportDto,
} from '@/data-raptor/rule-record/dto/record-report.dto';
import { UpdateDuplicatedDetectionDto } from './dto/update-record-duplicate-detection';
import { UpdateDataValidationDto } from './dto/update-record-data-validation';

@ApiTags('DataRaptorRecord')
@Controller('dataRaptorRecord')
@UseGuards(AuthGuard('jwt'))
export class DataRaptorRecordController {
  constructor(private readonly dataMigrationService: DataMigrationService) {}

  @Get('/migration/:migrationId/table/:tableName/record/:recordId/report')
  @ApiOperation({
    summary: 'Get record report with all data and AI recommendations',
  })
  @ApiOkResponse({
    description: 'Rule record retrieved successfully',
    type: RecordReportDto,
  })
  async getRecordReport(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const dateMinus1Month = new Date();
    dateMinus1Month.setMonth(currentMonth - 1);
    const dateMinus2Months = new Date();
    dateMinus2Months.setMonth(currentMonth - 2);
    const recordReport: RecordReportDto = {
      confidenceScore: 45,
      rulesAppliedCount: 5,
      lastUpdated: new Date(),
      confidenceScoreHistorical: [
        {
          score: 45,
          timestamp: currentDate,
        },
        {
          score: 45,
          timestamp: dateMinus1Month,
        },
        {
          score: 45,
          timestamp: dateMinus2Months,
        },
      ],
      duplicatedDetection: {
        analysisId: 'a1c7f369-9d3e-43ea-b217-2e45f25a25ec',
        recommendation: 'These records should be merged',
        result: [
          {
            columns: ['name', 'email'],
            id: '001Do00000GJZUIIA5',
            state: DuplicatedDetectionState.INITIAL,
            mergeUrl:
              'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000GJZUIIA5',
          },
          {
            columns: ['name', 'email'],
            id: '001Do00000G5AtLIAV',
            state: DuplicatedDetectionState.INITIAL,
            mergeUrl:
              'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000G5AtLIAV',
          },
        ],
      },
      dataValidation: [
        {
          columnName: 'email',
          recommendation: {
            textRecommendation: 'Email address is incorrect',
            valueRecommendation: 'john.doe@apple.com',
          },
          state: DataValidationState.INITIAL,
        },
        {
          columnName: 'mobileNumber',
          recommendation: {
            textRecommendation: 'Mobile Number is empty',
            valueRecommendation: '1234567890',
          },
          state: DataValidationState.INITIAL,
        },
      ],
    };

    return new SuccessResponseObject(
      'Rule record retrieved successfully',
      recordReport,
    );
  }

  @Put(
    '/migration/:migrationId/table/:tableName/record/:recordId/duplicateDetection',
  )
  @ApiOperation({
    summary: 'Update Duplicate detection analysis',
  })
  @ApiOkResponse({
    description: 'Update Duplicated Detection successful',
    type: DuplicatedDetectionDto,
  })
  async updateDuplicateDetection(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: UpdateDuplicatedDetectionDto,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const newDuplicatedDetection: DuplicatedDetectionDto = {
      analysisId: 'a1c7f369-9d3e-43ea-b217-2e45f25a25ec',
      recommendation: 'These records should be merged',
      result: [
        {
          columns: ['name', 'email'],
          id: '001Do00000GJZUIIA5',
          state: DuplicatedDetectionState.INITIAL,
          mergeUrl:
            'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000GJZUIIA5',
        },
        {
          columns: ['name', 'email'],
          id: '001Do00000G5AtLIAV',
          state: DuplicatedDetectionState.INITIAL,
          mergeUrl:
            'https://www.customercitydev.com/d/data-raptor/duplication/merge/analysis/a1c7f369-9d3e-43ea-b217-2e45f25a25ec/record/001Do00000G5AtLIAV',
        },
      ],
    };

    return new SuccessResponseObject(
      'Update Duplicated Detection successful',
      newDuplicatedDetection,
    );
  }

  @Put(
    '/migration/:migrationId/table/:tableName/record/:recordId/dataValidation',
  )
  @ApiOperation({
    summary: 'Update Data Validation Recommendations',
  })
  @ApiOkResponse({
    description: 'Update Data Validation successful',
    type: [DataValidationDto],
  })
  async updateDataValidation(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: UpdateDataValidationDto,
    @Param('migrationId') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    const newDataValidation: DataValidationDto[] = [
      {
        columnName: 'email',
        recommendation: {
          textRecommendation: 'Email address is incorrect',
          valueRecommendation: 'john.doe@apple.com',
        },
        state: DataValidationState.INITIAL,
      },
      {
        columnName: 'mobileNumber',
        recommendation: {
          textRecommendation: 'Mobile Number is empty',
          valueRecommendation: '1234567890',
        },
        state: DataValidationState.IGNORE,
      },
    ];

    return new SuccessResponseObject(
      'Update Data Validation successful',
      newDataValidation,
    );
  }
}
