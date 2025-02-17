import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { CreateDataMigrationDto } from '@/data-migration/dto/create-data-migration.dto';
import { DataSynchronizerSqsMessageDto } from '@/core/lib/aws/sqs/dto/data-synchronizer-sqs-message.dto';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { DataMigrationSchemaService } from '@/data-migration/services/data-migration-schema.service';
import {
  Controller,
  UseGuards,
  Post,
  Get,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SQSMessageProducerService } from '@/core/lib/aws/sqs/sqs-message-producer.service';
import { DataSetMigrationSQSMessageDto } from '@/core/lib/aws/sqs/dto/data-set-migration-sqs-message.dto';
import { DataSourceService } from '@/data-source/data-source.service';
import { DataMigrationStatus, DataSourceNames } from '@/core/types';
import { paginationOptions } from './types';
import { UserType } from '@/user/types';
import {
  PostMigrationRecordUpdateDto,
  PostTableRecordUpdateDto,
} from './dto/post-migration-record-update.dto';
import { FuzzySearchDto } from './dto/post-fuzzy-search';
import { Condition } from './dto/condition.dto';
import { SalesforceSchemaService } from '@/core/lib/salesforce/salesforce-schema.service';
import { PostRecordDto } from './dto/post-record.dto';
import { FunctionValue } from './dto/function-value.dto';
import { GetDataMigrationTableRecordsDto } from './dto/getDataMigrationTableRecords.dto';
import {
  GetRecordStatsScoreDiffParams,
  GetRuleStatParams,
  GetTableStatsParams,
  GetTableStatsQueryParams,
  IntervalType,
  TableStatType,
} from './dto/get-table-stats.dto';

@ApiTags('DataMigration')
@Controller('dataMigration')
@UseGuards(AuthGuard('jwt'))
export class DataMigrationController {
  constructor(
    private readonly salesforceSchemaService: SalesforceSchemaService,
    private readonly dataMigrationService: DataMigrationService,
    private readonly dataMigrationSchemaService: DataMigrationSchemaService,
    private readonly sqsQueueMessageProducerService: SQSMessageProducerService,
    private readonly dataSourceService: DataSourceService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new data migration connection to a user' })
  async createDataMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateDataMigrationDto,
  ) {
    this.validateAuthorization(authedUser);
    const existingMigration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataSourceId: body.dataSourceId },
    });
    if (existingMigration) {
      throw new BadRequestException('Data migration already registered');
    }

    const dataSource = await this.dataSourceService.findOne({
      where: { dataSourceId: body.dataSourceId },
    });
    if (!dataSource) {
      throw new BadRequestException('Data Source id provided does not exists');
    }

    const integrationExists =
      await this.dataMigrationService.validateIntegrationExists(
        authedUser.userId,
        body.dataSourceId,
        authedUser.tenantId,
      );
    if (!integrationExists) {
      throw new NotFoundException(
        `Missing integration with data source ${dataSource.name}`,
      );
    }

    const dataMigrationCreated = await this.dataMigrationService.create(
      authedUser.tenantId,
      body.dataSourceId,
    );

    const sqsMessage: DataSetMigrationSQSMessageDto = {
      userId: authedUser.userId,
      tenantId: authedUser.tenantId,
      migrationId: dataMigrationCreated.dataMigrationId,
      dataSourceId: dataSource.dataSourceId,
    };

    await this.sqsQueueMessageProducerService.sendDataSetQueueMessage(
      sqsMessage,
    );

    return new SuccessResponseObject(
      'User data migration created successfully',
      dataMigrationCreated,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all data migrations from a User' })
  async getDataMigration(@AuthedUser() authedUser: IAuthedUser) {
    const dataMigrations = await this.dataMigrationService.findAllByTenant(
      authedUser.tenantId,
    );
    return new SuccessResponseObject(
      'User data migrations found successfully',
      dataMigrations,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get migration by ID' })
  async getMigrationByID(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
  ) {
    const dataMigration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!dataMigration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }
    return new SuccessResponseObject(
      'Data migration found successfully',
      dataMigration,
    );
  }

  @Get('/dataSource/:dataSourceId')
  @ApiOperation({ summary: 'Get migration by Data source Id' })
  async getMigrationByDataSourceId(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('dataSourceId') dataSourceId: string,
  ) {
    const dataMigration =
      await this.dataMigrationService.getMigrationByDataSourceName(
        authedUser.userId,
        authedUser.tenantId,
        dataSourceId,
      );
    if (!dataMigration) {
      throw new NotFoundException(
        `Migration not found by Data Source ${dataSourceId}`,
      );
    }
    return new SuccessResponseObject(
      'Data migration found successfully',
      dataMigration,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a user data migration record by Id' })
  async deleteDataMigration(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') id: string,
  ) {
    this.validateAuthorization(authedUser);
    const deletedDataMigration = await this.dataMigrationService.delete(
      id,
      authedUser.tenantId,
    );
    return new SuccessResponseObject(
      'User data migration deleted successfully',
      deletedDataMigration,
    );
  }

  @Get('/:id/tables')
  @ApiOperation({ summary: 'Get available tables from the migration' })
  async getDataMigrationTables(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const tables = await this.dataMigrationSchemaService.getSchemaTables(
      migration.tenantId,
      migration.dataSourceId,
    );

    return new SuccessResponseObject(
      'Data tables fetched successfully',
      tables,
    );
  }

  @Get('/:id/table/:tableId/totalCounts')
  @ApiOperation({ summary: 'Get total counts of data from table Id' })
  async getDataMigrationDataTotalCount(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const totalCount =
      await this.dataMigrationSchemaService.getSchemaDataTotalCount(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
      );

    return new SuccessResponseObject(
      'Data total count fetched successfully',
      totalCount.length,
    );
  }

  @Get('/:id/table/:tableId/fields')
  @ApiOperation({ summary: 'Get fields of table from table Id' })
  async getDataMigrationTableFields(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const fields = await this.dataMigrationSchemaService.getSchemaTableFields(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
    );

    return new SuccessResponseObject(
      'Data table fields fetched successfully',
      fields,
    );
  }

  @Get('/:id/table/:tableId/foreignReferences')
  @ApiOperation({ summary: 'Get Foreign references to the table' })
  async getDataMigrationTableForeignReferences(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const fields =
      await this.dataMigrationSchemaService.getSchemaTableForeignReferences(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
      );

    return new SuccessResponseObject(
      'Data table foreign references fetched successfully',
      fields,
    );
  }

  @Get('/:id/table/:tableId/lookups')
  @ApiOperation({ summary: 'Get look ups reference of table from table Id' })
  async getDataMigrationTableLookups(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const fields = await this.dataMigrationSchemaService.getSchemaTableLookups(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
    );

    return new SuccessResponseObject(
      'Data table lookups fetched successfully',
      fields,
    );
  }

  @Post('/:id/table/:tableId/data')
  @ApiOperation({ summary: 'Get data from the migrated tables' })
  async getDataMigrationTableRecords(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('action') action = 'retrieve',
    @Body() body: GetDataMigrationTableRecordsDto,
  ) {
    const { conditions = [], fields = [], orderBy = [] } = body;
    console.log('conditions', conditions);
    console.log('fields', fields);
    console.log('orderBy', orderBy);
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    const paginationOptions: paginationOptions = {
      skip: skip || 0,
      take: take || 20,
    };

    const data = await this.dataMigrationSchemaService.getTableData(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
      action,
      paginationOptions,
      conditions,
      fields,
      orderBy,
    );

    return new SuccessResponseObject('Data Fetch successfully', data);
  }
  @Post('/:id/emails')
  @ApiOperation({ summary: 'Get emails data from the tasks ids' })
  async getEmailsDataFromTaskId(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Body() body: any,
  ) {
    const { tasksIds = [] } = body;

    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }
    const data = await this.dataMigrationSchemaService.getEmailsData(
      migration.tenantId,
      migration.dataSourceId,
      tasksIds,
    );

    return new SuccessResponseObject('Data Fetch successfully', data);
  }

  @Post('/:id/table/:tableId/groupCount')
  @ApiOperation({ summary: 'Get data from the migrated tables' })
  async getDataMigrationTableRecordsCount(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Body('conditions') conditions: Condition[],
    @Body('groupBy') groupBy: (string | FunctionValue)[],
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (
      migration.status === DataMigrationStatus.DATA_MIGRATION_FAILED ||
      migration.status === DataMigrationStatus.DATA_SCHEMA_FAILED
    ) {
      return new SuccessResponseObject('The Migration has a failed status', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    if (migration.status !== DataMigrationStatus.DATA_MIGRATION_COMPLETED) {
      return new SuccessResponseObject('Migration is still being processed', {
        migrationStatus: migration.status,
        data: [],
      });
    }

    const data = await this.dataMigrationSchemaService.getTableDataGroupCounter(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
      conditions,
      groupBy,
    );

    return new SuccessResponseObject('Data Fetch successfully', data);
  }

  validateAuthorization(authedUser: IAuthedUser) {
    if (authedUser.userType === UserType.USER) {
      throw new UnauthorizedException(
        'You are not authorized to modify migrations',
      );
    }
  }

  @Get('/:id/table/:tableId/data/fuzzy-search')
  @ApiOperation({ summary: 'Migration Data Fuzzy search' })
  async postMigrationDataFuzzySearch(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('field') field: string,
    @Query('value') value: string,
    @Query('limit') limit: string,
    @Query('skip') skip: string,
    @Query('minPercentage') minPercentage: string,
    @Query('fallBackSearchField') fallBackSearchField: string[],
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    if (!field || !value) {
      throw new BadRequestException(
        'Field and Value query params are required',
      );
    }

    const payload: FuzzySearchDto = {
      condition: { fieldName: field, value },
      ...(limit && { limit: +limit }),
      ...(skip && { skip: +skip }),
      ...(minPercentage && { minPercentage: +minPercentage }),
      ...(fallBackSearchField &&
        fallBackSearchField.length > 0 && {
          fallBackSearchField,
        }),
    };

    const data = await this.dataMigrationSchemaService.getFuzzySearch(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
      payload,
    );

    return new SuccessResponseObject('Search retrieved successfully', data);
  }

  @Post('/:id/recordUpdate')
  @ApiOperation({ summary: 'Post migration record update' })
  async postMigrationReportUpdate(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Body() body: PostMigrationRecordUpdateDto,
  ) {
    console.log('recordUpdate:::', JSON.stringify(body, null, 2));
    const dataMigration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!dataMigration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }
    const sqsMessageBody: DataSynchronizerSqsMessageDto = {
      userId: authedUser.userId,
      migrationId: migrationId,
      tenantId: authedUser.tenantId,
      updates: body.updates,
      dataSourceId: dataMigration.dataSourceId,
    };

    await this.sqsQueueMessageProducerService.sendDataSynchronizerQueueMessage(
      sqsMessageBody,
    );
    return new SuccessResponseObject('Update Received', body.updates);
  }

  @Post('/:id/table/:tableId/recordUpdate')
  @ApiOperation({ summary: 'Post migration record update' })
  async postTableRecordUpdate(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Body() body: PostTableRecordUpdateDto,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { tenantId: authedUser.tenantId, dataMigrationId: migrationId },
    });
    if (!migration) {
      throw new NotFoundException(`Migration not found ${migrationId}`);
    }

    try {
      await this.dataMigrationSchemaService.updateTableData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        body.updates,
      );

      return new SuccessResponseObject('Update Received', body.updates);
    } catch {
      throw new BadRequestException('Update failed');
    }
  }

  @Get('/:id/table/:tableId/bookmarkedTotal')
  @ApiOperation({ summary: 'Get total counts of data from table Id' })
  async getBookmarkedDataOnMigrationDataTotal(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const totalCount =
      await this.dataMigrationSchemaService.getBookmarkedTableData(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
      );

    return new SuccessResponseObject(
      'Bookmarked data total count fetched successfully',
      totalCount,
    );
  }

  @Get('/:id/table/:tableId/field/:fieldName/minAndMaxValue')
  @ApiOperation({ summary: 'Get min and max value of a field' })
  async getMinAndMaxValue(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Param('fieldName') fieldName: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
    });

    const res = await this.dataMigrationSchemaService.getMinAndMaxValue(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
      fieldName,
    );

    return new SuccessResponseObject(
      'Min and Max value fetched successfully',
      res,
    );
  }

  @Get('/:id/table/:tableId/field/:fieldName/value-options')
  @ApiOperation({ summary: 'Get value options of a field' })
  async getFieldValueOptions(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Param('fieldName') fieldName: string,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
      relations: ['dataSource'],
    });
    const field = await this.dataMigrationSchemaService.getSchemaTableField(
      migration.tenantId,
      migration.dataSourceId,
      tableId,
      fieldName,
    );
    let values: string[];
    if (
      field.type === 'picklist' &&
      migration.dataSource.name === DataSourceNames.SALESFORCE
    ) {
      try {
        console.log('Trying to get values from Salesforce');
        values = await this.salesforceSchemaService.getFieldPickListValues(
          authedUser,
          tableId,
          fieldName,
        );
      } catch (e: any) {
        console.log(
          `Error trying to get Pick list values from salesforce: ${e}`,
        );
      }
    }

    if (!values) {
      const res = await this.dataMigrationSchemaService.getFieldValueOptions(
        migration.tenantId,
        migration.dataSourceId,
        tableId,
        fieldName,
      );

      values = res.map((item) => item.option);
    }

    return new SuccessResponseObject(
      'value options fetched successfully',
      values || [],
    );
  }

  @Post('/:id/table/:tableId/create-record')
  @ApiOperation({
    summary: 'Create a record using the integration related to the migration',
  })
  async createRecord(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Body() body: PostRecordDto,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
      relations: ['dataSource'],
    });

    let newRecord;

    console.log(
      'migration.dataSource.name',
      JSON.stringify(migration.dataSource),
    );

    console.log('body', JSON.stringify(body));

    if (migration.dataSource.name == DataSourceNames.SALESFORCE) {
      console.log('entered salesforce if handle create record');
      newRecord = await this.salesforceSchemaService.createRecord(
        authedUser,
        tableId,
        body.record,
      );
    }

    return new SuccessResponseObject(
      'New Record created successfully',
      newRecord,
    );
  }

  @Get('/:id/table/:tableId/stats')
  @ApiOperation({
    summary: 'Get stats of a table from the migration',
  })
  async getTableStats(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('type') statType: TableStatType,
    @Query('startDate') startDate: string,
    @Query('interval') interval: IntervalType,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
      relations: ['dataSource'],
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    if (!statType || !Object.values(TableStatType).includes(statType)) {
      throw new BadRequestException('Invalid stat type');
    }

    if (!interval || !Object.values(IntervalType).includes(interval)) {
      throw new BadRequestException('Invalid interval type');
    }

    const params: GetTableStatsParams = {
      tableId,
      migration,
      statType,
      startDate,
      interval,
    };

    const stats = await this.dataMigrationSchemaService.getTableStats(params);

    return new SuccessResponseObject('Data retrieved successfully', stats);
  }

  @Get('/:id/table/:tableId/rule-stats')
  @ApiOperation({
    summary: 'Get stats of a Table Rules from the migration',
  })
  async getTableRuleStats(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('date') date: string,
    @Query('interval') interval: IntervalType,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
      relations: ['dataSource'],
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    if (!interval || !Object.values(IntervalType).includes(interval)) {
      throw new BadRequestException('Invalid interval type');
    }

    const params: GetRuleStatParams = {
      tableId,
      migration,
      date,
      interval,
    };

    const stats = await this.dataMigrationSchemaService.getRuleStats(params);
    return new SuccessResponseObject('Data retrieved successfully', stats);
  }

  @Get('/:id/table/:tableId/record-stats/score-diff')
  @ApiOperation({
    summary: 'Get stats score diff calculation from record stats',
  })
  async getTableRecordStats(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('id') migrationId: string,
    @Param('tableId') tableId: string,
    @Query('type') statType: TableStatType,
    @Query('startDate1') startDate1: string,
    @Query('startDate2') startDate2: string,
    @Query('interval') interval: IntervalType,
  ) {
    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId: authedUser.tenantId },
      relations: ['dataSource'],
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    if (!statType || !Object.values(TableStatType).includes(statType)) {
      throw new BadRequestException('Invalid stat type');
    }

    if (!interval || !Object.values(IntervalType).includes(interval)) {
      throw new BadRequestException('Invalid interval type');
    }

    const params: GetRecordStatsScoreDiffParams = {
      tableId,
      migration,
      statType,
      startDate1,
      startDate2,
      interval,
    };

    const stats = await this.dataMigrationSchemaService.getRecordStatsScoreDiff(
      params,
    );

    return new SuccessResponseObject('Data retrieved successfully', stats);
  }
}
