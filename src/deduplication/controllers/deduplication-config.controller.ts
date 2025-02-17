import { SuccessResponseObject } from '@/common/http';
import { CreateDeduplicationConfigRequestDto } from '../dto/create-deduplication-config.request.dto';
import { CreateDeduplicationConfigResponseDto } from '../dto/deduplication-config.response.dto';
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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeduplicationConfigService } from '../services/deduplication-config.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';

@Controller('deduplication-config')
@ApiTags('DeDuplication Config')
@UseGuards(AuthGuard('jwt'))
export class DeduplicationConfigController {
  constructor(
    private readonly deduplicationConfigService: DeduplicationConfigService,
    private readonly dataMigrationService: DataMigrationService,
  ) {}

  @ApiOperation({ summary: 'created deduplication config' })
  @ApiCreatedResponse({
    description: 'Deduplication config created successfully!',
    type: CreateDeduplicationConfigResponseDto,
  })
  @Post()
  async createDeDuplicationConfig(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateDeduplicationConfigRequestDto,
  ) {
    await this.checkMigrationReference(body.migrationId, authedUser.tenantId);

    const existingConfig =
      await this.deduplicationConfigService.findOneByMigrationAndTable(
        body.migrationId,
        body.tableName,
      );

    if (existingConfig) {
      return new BadRequestException(
        'Deduplication config already exists for that migration and table!',
      );
    }

    const config = await this.deduplicationConfigService.create(body);

    return new SuccessResponseObject(
      'Deduplication config created successfully!',
      config,
    );
  }

  @ApiOperation({ summary: 'Update deduplication config' })
  @ApiCreatedResponse({
    description: 'Deduplication config Updated successfully!',
    type: CreateDeduplicationConfigResponseDto,
  })
  @Put(':id')
  async updateDeDuplicationConfig(
    @AuthedUser() authedUser: IAuthedUser,
    @Body() body: CreateDeduplicationConfigRequestDto,
    @Param('id') id: string,
  ) {
    console.log('precheck id');
    console.log(body, authedUser);
    await this.checkMigrationReference(body.migrationId, authedUser.tenantId);

    console.log('pass id');
    const existingConfig = await this.deduplicationConfigService.findOneById(
      body.migrationId,
      id,
    );

    console.log('exists id');
    if (!existingConfig) {
      throw new BadRequestException(
        'Deduplication configuration does not exists',
      );
    }

    console.log('update id');
    const config = await this.deduplicationConfigService.update(id, body);

    return new SuccessResponseObject(
      'Deduplication config Updated successfully!',
      config,
    );
  }

  @ApiOperation({ summary: 'Get all deduplication configs' })
  @ApiOkResponse({
    description: 'Deals fetched successfully!',
    type: [CreateDeduplicationConfigResponseDto],
  })
  @Get('migration/:migrationId')
  async getDeDuplicationConfigs(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
  ) {
    await this.checkMigrationReference(migrationId, authedUser.tenantId);

    const configs = await this.deduplicationConfigService.findAll(migrationId);

    return new SuccessResponseObject(
      'Deduplication config fetched successfully!',
      configs,
    );
  }

  @ApiOperation({ summary: 'Get deduplication config by id' })
  @ApiOkResponse({
    description: 'DeDuplicationConfig fetched successfully!',
    type: CreateDeduplicationConfigResponseDto,
  })
  @Get('migration/:migrationId/id/:id')
  async getDeDuplicationConfig(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('id') id: string,
  ) {
    await this.checkMigrationReference(migrationId, authedUser.tenantId);

    const config = await this.deduplicationConfigService.findOneById(
      migrationId,
      id,
    );

    if (!config) {
      throw new BadRequestException('DeDuplicationConfig does not exists!');
    }

    return new SuccessResponseObject(
      'DeDuplicationConfig fetched successfully!',
      config,
    );
  }

  @ApiOperation({ summary: 'Get deduplication config by migration and table' })
  @ApiOkResponse({
    description: 'DeDuplicationConfig fetched successfully!',
    type: CreateDeduplicationConfigResponseDto,
  })
  @Get('migration/:migrationId/table/:table')
  async getDeDuplicationConfigByMigrationAndTable(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('table') table: string,
  ) {
    await this.checkMigrationReference(migrationId, authedUser.tenantId);

    const config =
      await this.deduplicationConfigService.findOneByMigrationAndTable(
        migrationId,
        table,
      );

    if (!config) {
      throw new BadRequestException('DeDuplicationConfig does not exists!');
    }

    return new SuccessResponseObject(
      'DeDuplicationConfig fetched successfully!',
      config,
    );
  }

  @ApiOperation({ summary: 'Delete deduplication config by id' })
  @ApiNoContentResponse({
    description: 'DeDuplicationConfig successfully deleted!',
  })
  @Delete('migration/:migrationId/id/:id')
  async deleteDeDuplicationConfig(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('migrationId') migrationId: string,
    @Param('id') id: string,
  ) {
    await this.checkMigrationReference(migrationId, authedUser.tenantId);

    await this.deduplicationConfigService.delete(migrationId, id);

    return new SuccessResponseObject(
      'DeDuplicationConfig successfully deleted!',
    );
  }

  async checkMigrationReference(migrationId: string, tenantId: number) {
    try {
      const migration = await this.dataMigrationService.findOne({
        where: {
          dataMigrationId: migrationId,
          tenantId: tenantId,
        },
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
