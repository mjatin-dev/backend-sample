import { Controller, Get } from '@nestjs/common';
import { SuccessResponseObject } from './common/http';

@Controller('')
export class AppController {
  @Get('')
  healthCheck() {
    return new SuccessResponseObject('Server is running');
  }
}
