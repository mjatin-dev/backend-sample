import { Controller, Get, UseGuards } from '@nestjs/common';
import { RuleRiskService } from './rule-risk.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponseObject } from '@/common/http';

@ApiTags('DataRaptorRuleRisk')
@UseGuards(AuthGuard('jwt'))
@Controller('data-raptor-rule-risk')
export class DataRaptorRuleRiskController {
  constructor(private readonly ruleRiskService: RuleRiskService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all rule risk',
  })
  async getRulesByMigrationAndTableName() {
    const risks = await this.ruleRiskService.findMany({});

    return new SuccessResponseObject(
      'Rule risks retrieved Successfully',
      risks,
    );
  }
}
