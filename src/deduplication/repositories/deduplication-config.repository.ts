import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DeDuplicationConfig } from '../entities/deduplication-config.entity';

@EntityRepository(DeDuplicationConfig)
export class DeDuplicationConfigRepository extends BaseRepository<DeDuplicationConfig> {}
