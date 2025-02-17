import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeduplicationConfigRequestDto } from '../dto/create-deduplication-config.request.dto';
import { CreateDeduplicationConfigResponseDto } from '../dto/deduplication-config.response.dto';
import { DeDuplicationConfigRepository } from '../repositories/deduplication-config.repository';

@Injectable()
export class DeduplicationConfigService {
  constructor(
    private readonly deduplicationConfig: DeDuplicationConfigRepository,
  ) {}

  async create(
    data: CreateDeduplicationConfigRequestDto,
  ): Promise<CreateDeduplicationConfigResponseDto> {
    const deduplicationConfig = this.deduplicationConfig.create({
      ...data,
    });
    const saveDeduplicationConfig = await this.deduplicationConfig.save(
      deduplicationConfig,
    );
    return saveDeduplicationConfig;
  }

  async findOneByMigrationAndTable(
    migrationId: string,
    tableName: string,
  ): Promise<CreateDeduplicationConfigResponseDto> {
    const deduplicationConfig = await this.deduplicationConfig.findOne({
      where: { migrationId, tableName },
    });
    return deduplicationConfig;
  }

  async findOneById(
    migrationId: string,
    id: string,
  ): Promise<CreateDeduplicationConfigResponseDto> {
    const deduplicationConfig = await this.deduplicationConfig.findOne(id, {
      where: { migrationId },
    });
    return deduplicationConfig;
  }

  async update(
    id: string,
    data: CreateDeduplicationConfigRequestDto,
  ): Promise<CreateDeduplicationConfigResponseDto> {
    const deduplicationConfig = await this.findOneById(data.migrationId, id);

    if (!deduplicationConfig) {
      throw new NotFoundException('deduplicationConfig not found!');
    }

    await this.deduplicationConfig.update(id, {
      ...data,
    });

    return await this.findOneById(data.migrationId, id);
  }

  async findAll(
    migrationId: string,
  ): Promise<CreateDeduplicationConfigResponseDto[]> {
    const deduplicationConfigResponse: CreateDeduplicationConfigResponseDto[] =
      await this.deduplicationConfig.find({
        where: { migrationId },
      });
    return deduplicationConfigResponse;
  }

  async delete(migrationId: string, id: string): Promise<void> {
    const deduplicationConfig = await this.deduplicationConfig.findOne(id, {
      where: { migrationId },
    });

    if (!deduplicationConfig) {
      throw new NotFoundException('De DuplicationConfig not found!');
    }

    await this.deduplicationConfig.remove([deduplicationConfig]);
  }
}
