import { DataRaptorValidationPatternService } from './rule-validation-pattern.service';
import { SuccessResponseObject } from '@/common/http';
export declare class DataRaptorValidationPatternController {
    private readonly dataRaptorValidationPatternService;
    constructor(dataRaptorValidationPatternService: DataRaptorValidationPatternService);
    getValidationPattern(validationPatternType: string): Promise<SuccessResponseObject>;
}
