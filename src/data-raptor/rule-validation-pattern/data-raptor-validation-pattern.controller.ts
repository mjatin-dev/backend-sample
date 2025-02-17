import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DataRaptorValidationPatternService } from './rule-validation-pattern.service';
import { SuccessResponseObject } from '@/common/http';

@ApiTags('DataRaptorRuleValidationPattern')
@UseGuards(AuthGuard('jwt'))
@Controller('data-raptor-validation-pattern')
export class DataRaptorValidationPatternController {
  constructor(
    private readonly dataRaptorValidationPatternService: DataRaptorValidationPatternService,
  ) {}

  @Get()
  async getValidationPattern(@Query('type') validationPatternType: string) {
    const whereObject = {};
    if (!!validationPatternType) {
      whereObject['dataType'] = validationPatternType;
    }
    const patterns = await this.dataRaptorValidationPatternService.get(
      whereObject,
    );

    return new SuccessResponseObject(
      'Rules Validation Patterns retrieved Successfully',
      patterns,
    );
  }
}
