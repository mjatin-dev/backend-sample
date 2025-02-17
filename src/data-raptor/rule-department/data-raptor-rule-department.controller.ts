import { Controller, Get, UseGuards } from '@nestjs/common';
import { RuleDepartmentService } from './rule-department.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessResponseObject } from '@/common/http';

@ApiTags('DataRaptorRuleDepartment')
@UseGuards(AuthGuard('jwt'))
@Controller('data-raptor-rule-department')
export class DataRaptorRuleDepartmentController {
  constructor(private readonly ruleDepartmentService: RuleDepartmentService) {}

  @Get('')
  @ApiOperation({
    summary: 'Get all rule departments',
  })
  async getRulesByMigrationAndTableName() {
    const departments = await this.ruleDepartmentService.findMany({});

    return new SuccessResponseObject(
      'Rule departments retrieved Successfully',
      departments,
    );
  }
}
