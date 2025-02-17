import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import {
  DeduplicationResultByIdsRequestDto,
  DeduplicationResultDto,
} from '../dto/deduplication-result.response.dto';
import { DeduplicationResultService } from '../services/deduplication-result.service';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import {
  MergeDuplicatedRecordsRequest,
  UpdateDeduplicationResultStatusRequest,
} from '../dto/update-deduplication-result-status.dto';
import { SalesforceMergeService } from '@/core/lib/salesforce/salesforce-merge.service';
import { DataSourceNames } from '@/core/types';

@ApiTags('DeduplicationResult')
@UseGuards(AuthGuard('jwt'))
@Controller('deduplication-result')
export class DeduplicationResultController {
  constructor(
    private readonly deduplicationResultService: DeduplicationResultService,
    private readonly dataMigrationService: DataMigrationService,
    private readonly salesforceMergeService: SalesforceMergeService,
  ) {}

  @ApiOperation({ summary: 'Get Deduplication Result' })
  @ApiCreatedResponse({
    description: 'Deduplication Result successfully!',
    type: DeduplicationResultDto,
  })
  @Get('migration/:migrationId/result')
  async getDeduplicationResult(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Query('tables') tables: string | string[],
    @Query('limit') limit = '100',
  ) {
    const migration = await this.checkMigrationReference(
      migrationId,
      authedUser.tenantId,
    );

    let tableToQuery: string[] = tables as string[];
    if (typeof tables === 'string') {
      tableToQuery = tables.split(',');
      tableToQuery = tableToQuery.map((table) => table.trim());
    }

    const limitNumber = isNaN(+limit) ? 100 : +limit;
    const deduplicationResults =
      await this.deduplicationResultService.getDeduplicationResultData(
        authedUser.tenantId,
        migration.dataSourceId,
        { limit: limitNumber, tables: tableToQuery },
      );
    return new SuccessResponseObject(
      'Data table lookups fetched successfully',
      deduplicationResults,
    );
  }

  @ApiOperation({ summary: 'Get Deduplication Result filtered by Id' })
  @ApiCreatedResponse({
    description: 'Deduplication Result successfully!',
    type: DeduplicationResultDto,
  })
  @Post('migration/:migrationId/resultByIds')
  async getDeduplicationResultByIds(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Body() body: DeduplicationResultByIdsRequestDto,
  ) {
    const migration = await this.checkMigrationReference(
      migrationId,
      authedUser.tenantId,
    );

    const deduplicationResults =
      await this.deduplicationResultService.getDeduplicationResultDataByIds(
        authedUser.tenantId,
        migration.dataSourceId,
        body.ids,
      );

    return new SuccessResponseObject(
      'Data table lookups fetched successfully',
      deduplicationResults,
    );
  }

  @ApiOperation({ summary: 'Update deduplication result status' })
  @ApiCreatedResponse({
    description: 'Deduplication result status updated successfully',
  })
  @Put('migration/:migrationId/updateStatus')
  async updateDeduplicationResultStatus(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Body() body: UpdateDeduplicationResultStatusRequest,
  ) {
    const migration = await this.checkMigrationReference(
      migrationId,
      authedUser.tenantId,
    );

    const res =
      await this.deduplicationResultService.updateDeduplicationResultStatus(
        authedUser.tenantId,
        migration.dataSourceId,
        body.status,
        body.resultIds,
      );

    return new SuccessResponseObject(
      'Deduplication result status updated successfully',
      { affected: res.affected },
    );
  }

  @ApiOperation({ summary: 'Merge duplicate Records' })
  @ApiCreatedResponse({
    description: 'Duplicate merge completed Successfully',
  })
  @Put('migration/:migrationId/mergeRecords')
  async mergeRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Body() body: MergeDuplicatedRecordsRequest,
  ) {
    const migration = await this.checkMigrationReference(
      migrationId,
      authedUser.tenantId,
      { relationships: ['dataSource'] },
    );

    const dataSource = migration.dataSource;

    if (dataSource.name !== DataSourceNames.SALESFORCE) {
      throw new BadRequestException('Data source not supported');
    }

    console.log('Merge Request body::', body);

    await this.salesforceMergeService.mergeRecords(
      authedUser,
      body.masterRecordId,
      body.duplicateRecordIds,
      body.overWriteValues,
      body.objectType,
    );

    return new SuccessResponseObject('Duplicate merge completed Successfully');
  }

  async checkMigrationReference(
    migrationId: string,
    tenantId: number,
    options?: { relationships?: string[] },
  ) {
    try {
      const relationships = options?.relationships || undefined;

      const migration = await this.dataMigrationService.findOne({
        where: {
          dataMigrationId: migrationId,
          tenantId: tenantId,
        },
        relations: relationships,
      });

      if (!migration) {
        throw new BadRequestException(
          'You do not have permissions to that migration',
        );
      }

      return migration;
    } catch (err) {
      throw new BadRequestException(
        'You do not have permissions to that migration',
      );
    }
  }
}
