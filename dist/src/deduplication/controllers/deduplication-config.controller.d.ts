import { SuccessResponseObject } from '@/common/http';
import { CreateDeduplicationConfigRequestDto } from '../dto/create-deduplication-config.request.dto';
import { BadRequestException } from '@nestjs/common';
import { DeduplicationConfigService } from '../services/deduplication-config.service';
import { DataMigrationService } from '@/data-migration/services/data-migration.service';
import { IAuthedUser } from '@/auth/types';
export declare class DeduplicationConfigController {
    private readonly deduplicationConfigService;
    private readonly dataMigrationService;
    constructor(deduplicationConfigService: DeduplicationConfigService, dataMigrationService: DataMigrationService);
    createDeDuplicationConfig(authedUser: IAuthedUser, body: CreateDeduplicationConfigRequestDto): Promise<SuccessResponseObject | BadRequestException>;
    updateDeDuplicationConfig(authedUser: IAuthedUser, body: CreateDeduplicationConfigRequestDto, id: string): Promise<SuccessResponseObject>;
    getDeDuplicationConfigs(authedUser: IAuthedUser, migrationId: string): Promise<SuccessResponseObject>;
    getDeDuplicationConfig(authedUser: IAuthedUser, migrationId: string, id: string): Promise<SuccessResponseObject>;
    getDeDuplicationConfigByMigrationAndTable(authedUser: IAuthedUser, migrationId: string, table: string): Promise<SuccessResponseObject>;
    deleteDeDuplicationConfig(authedUser: IAuthedUser, migrationId: string, id: string): Promise<SuccessResponseObject>;
    checkMigrationReference(migrationId: string, tenantId: number): Promise<import("../../data-migration/entities/dataMigration.entity").DataMigration>;
}
