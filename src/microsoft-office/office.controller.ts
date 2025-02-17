import {
  Controller,
  UseGuards,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OfficeService } from './office.service';

@ApiTags('Office integration')
@Controller('office')
@UseGuards(AuthGuard('jwt'))
export class MicrosoftOfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post('/attachment')
  @ApiOperation({ summary: 'get Attachment download link from office' })
  public async getAttachmentDownloadLink(@Body() body: any) {
    try {
      console.log(body);
      const { attachmentId, dataSource, messageId } = body;

      return this.officeService.getAttachmentDownloadLink(
        dataSource,
        attachmentId,
        messageId,
      );
    } catch (err) {
      console.log(err);
    }
  }
}
