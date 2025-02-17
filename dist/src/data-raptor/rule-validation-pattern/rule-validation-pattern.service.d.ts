import { DataRaptorValidationPatternRepository } from './rule-validation-pattern.repository';
export declare class DataRaptorValidationPatternService {
    private readonly validationPatternRepository;
    constructor(validationPatternRepository: DataRaptorValidationPatternRepository);
    get(whereObject: {
        dataType?: string;
    }): Promise<import("./rule-validation-pattern.entity").ValidationPattern[]>;
}
