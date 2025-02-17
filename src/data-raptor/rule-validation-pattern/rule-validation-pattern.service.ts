import { Injectable } from '@nestjs/common';
import { DataRaptorValidationPatternRepository } from './rule-validation-pattern.repository';

@Injectable()
export class DataRaptorValidationPatternService {
  constructor(
    private readonly validationPatternRepository: DataRaptorValidationPatternRepository,
  ) {}

  get(whereObject: { dataType?: string }) {
    return this.validationPatternRepository.find({
      where: whereObject,
    });
  }
}
