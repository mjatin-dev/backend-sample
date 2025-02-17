import { CreateDeduplicationConfigRequestDto } from '../dto/create-deduplication-config.request.dto';
import { CreateDeduplicationConfigResponseDto } from '../dto/deduplication-config.response.dto';
import { DeDuplicationConfigRepository } from '../repositories/deduplication-config.repository';
export declare class DeduplicationConfigService {
    private readonly deduplicationConfig;
    constructor(deduplicationConfig: DeDuplicationConfigRepository);
    create(data: CreateDeduplicationConfigRequestDto): Promise<CreateDeduplicationConfigResponseDto>;
    findOneByMigrationAndTable(migrationId: string, tableName: string): Promise<CreateDeduplicationConfigResponseDto>;
    findOneById(migrationId: string, id: string): Promise<CreateDeduplicationConfigResponseDto>;
    update(id: string, data: CreateDeduplicationConfigRequestDto): Promise<CreateDeduplicationConfigResponseDto>;
    findAll(migrationId: string): Promise<CreateDeduplicationConfigResponseDto[]>;
    delete(migrationId: string, id: string): Promise<void>;
}
