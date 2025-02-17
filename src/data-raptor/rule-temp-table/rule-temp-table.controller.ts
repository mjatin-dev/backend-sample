import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RuleTempTableService } from './rule-temp-table.service';
import {
  CreateRuleTempTable,
  UpdateRuleTempTableDto,
} from './rule-temp-table.dto';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { SuccessResponseObject } from '@/common/http';

export enum TemporalTableActions {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

@ApiTags('DataRaptorRule')
@Controller('ruleTempTable')
@UseGuards(AuthGuard('jwt'))
export class RuleTempTableController {
  constructor(
    private readonly ruleTempTableService: RuleTempTableService,
    private readonly dataMigrationService: DataMigrationService,
  ) {}

  async validateMigrationIdOwnership(
    authedUser: IAuthedUser,
    migrationId: string,
  ) {
    const { tenantId } = authedUser;

    const migration = await this.dataMigrationService.findOne({
      where: { dataMigrationId: migrationId, tenantId },
    });

    if (!migration) {
      throw new BadRequestException('Migration not found!');
    }

    return migration;
  }

  @Get('/migration/:migrationId')
  @ApiOperation({ summary: 'Get all Temp Tables from a migration' })
  async getTempTables(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
  ) {
    await this.validateMigrationIdOwnership(authedUser, migrationId);
    const tempTables = await this.ruleTempTableService.findAll(migrationId);
    return new SuccessResponseObject(
      'Temporal Tables retrieved successfully',
      tempTables,
    );
  }

  @Get('/migration/:migrationId/checkName/:name')
  @ApiOperation({ summary: 'Get all Temp Tables from a migration' })
  async getCheckNameAvailability(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('name') name: string,
  ) {
    await this.validateMigrationIdOwnership(authedUser, migrationId);
    const tableWithSameName =
      await this.ruleTempTableService.findOneByConditions({
        name: name,
        dataMigrationId: migrationId,
      });
    return new SuccessResponseObject(
      'Check Name Availability retrieved successfully',
      { available: tableWithSameName ? false : true },
    );
  }

  @Get('/migration/:migrationId/table/:tableId')
  @ApiOperation({ summary: 'Get a Temp Table from a migration' })
  async getTempTableById(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    await this.validateMigrationIdOwnership(authedUser, migrationId);
    const tempTable = await this.ruleTempTableService.findOne(
      tableId,
      migrationId,
    );
    return new SuccessResponseObject(
      'Temporal table retrieved successfully',
      tempTable,
    );
  }

  @Post('/migration/:migrationId')
  @ApiOperation({ summary: 'Create a Temp Table to a migration' })
  async createTempTable(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Body() body: CreateRuleTempTable,
  ) {
    const migration = await this.validateMigrationIdOwnership(
      authedUser,
      migrationId,
    );
    const tableWithSameName =
      await this.ruleTempTableService.findOneByConditions({
        name: body.name,
        dataMigrationId: migrationId,
      });
    if (tableWithSameName) {
      throw new BadRequestException(
        'Temporal Table with the same name already exists',
      );
    }
    const createdTable = await this.ruleTempTableService.processTemporalTable(
      authedUser,
      migration,
      body,
      TemporalTableActions.CREATE,
    );
    return new SuccessResponseObject(
      'Temporal table created successfully',
      createdTable,
    );
  }

  @Put('/migration/:migrationId/table/:tableId')
  @ApiOperation({ summary: 'Update a Temp Table from a migration' })
  async updateTempTable(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tempTableId: string,
    @Body() body: UpdateRuleTempTableDto,
  ) {
    const migration = await this.validateMigrationIdOwnership(
      authedUser,
      migrationId,
    );
    await this.ruleTempTableService.processTemporalTable(
      authedUser,
      migration,
      body,
      TemporalTableActions.UPDATE,
      tempTableId,
    );
    return new SuccessResponseObject('Temporal table updated successfully');
  }

  @Delete('/migration/:migrationId/table/:tableId')
  @ApiOperation({ summary: 'Delete a Temp Table from a migration' })
  async deleteTempTable(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('tableId') tableId: string,
  ) {
    await this.validateMigrationIdOwnership(authedUser, migrationId);
    const dependencies =
      await this.ruleTempTableService.getDependenciesAssociated(
        migrationId,
        tableId,
      );
    if (dependencies.length > 0) {
      throw new BadRequestException(
        'Cannot delete a Temporal Table with associated rules',
      );
    }
    await this.ruleTempTableService.delete(tableId);
    return new SuccessResponseObject('Temporal table deleted successfully');
  }
}
