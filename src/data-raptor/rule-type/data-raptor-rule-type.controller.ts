import { AuthGuard } from '@nestjs/passport';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { RuleType } from './rule-type.entity';
import { RuleTypeService } from './rule-type.service';
import { SuccessResponseObject } from '@/common/http';

@UseGuards(AuthGuard('jwt'))
@ApiTags('DataRaptorRuleType')
@Controller('data-raptor-rule-type')
export class DataRaptorRuleTypeController {
  constructor(private readonly ruleTypeService: RuleTypeService) { }

  @Get()
  @ApiResponse({ description: 'get All Rule Types', type: [RuleType] })
  async getRuleTypes(): Promise<SuccessResponseObject> {
    const types = await this.ruleTypeService.getRuleTypes();

    return new SuccessResponseObject(
      'Rule types retrieved Successfully',
      types,
    );
  }
}
