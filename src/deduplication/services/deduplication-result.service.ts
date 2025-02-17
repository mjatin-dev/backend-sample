import { Injectable } from '@nestjs/common';
import {
  DeduplicationQueryOption,
  DeduplicationResultRepository,
} from '../repositories/deduplication-result.repository';
import { DeduplicationResultStatus } from '../dto/update-deduplication-result-status.dto';

@Injectable()
export class DeduplicationResultService {
  constructor(
    private readonly deduplicationResultRepository: DeduplicationResultRepository,
  ) {}

  getDeduplicationResultData(
    tenantId: number,
    dataSourceId: string,
    queryOption: DeduplicationQueryOption,
  ) {
    return this.deduplicationResultRepository.getDeduplicationResultData(
      tenantId,
      dataSourceId,
      queryOption,
    );
  }

  getDeduplicationResultDataByIds(
    tenantId: number,
    dataSourceId: string,
    ids: string[],
  ) {
    return this.deduplicationResultRepository.getDeduplicationResultDataByIds(
      tenantId,
      dataSourceId,
      ids,
    );
  }

  updateDeduplicationResultStatus(
    tenantId: number,
    dataSourceId: string,
    newStatus: DeduplicationResultStatus,
    ids: string[],
  ) {
    return this.deduplicationResultRepository.updateDeduplicationResultStatus(
      tenantId,
      dataSourceId,
      newStatus,
      ids,
    );
  }
}
