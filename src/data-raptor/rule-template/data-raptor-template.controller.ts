import { SuccessResponseObject } from '@/common/http';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RuleTemplateService } from './rule-template.service';

@ApiTags('DataRaptorTemplate')
@Controller('data-raptor-rule-template')
@UseGuards(AuthGuard('jwt'))
export class DataRaptorTemplateController {
  constructor(private readonly ruleTemplateService: RuleTemplateService) {}

  @Get('/dataSource/:dataSourceName/')
  @ApiOperation({
    summary: 'Get all rules template',
  })
  async getRuleTemplates(@Param('dataSourceName') dataSourceName: string) {
    const templates = await this.ruleTemplateService.findMany({
      where: { dataSourceName },
      relations: ['DepartmentObject', 'ObjectReferences'],
    });
    return new SuccessResponseObject(
      'Rules Templates retrieved Successfully',
      templates,
    );
  }
}
