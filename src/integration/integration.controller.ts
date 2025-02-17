import { AuthedUser } from '@/auth/decorators/authed-user.decorator';
import { IAuthedUser } from '@/auth/types';
import { SuccessResponseObject } from '@/common/http';
import { ICallbackQueryParams, AppIds, IntegrationType } from '@/core/types';
import { UserType } from '@/user/types';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
  constructor(private integrationService: IntegrationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async list(@AuthedUser() authedUser: IAuthedUser) {
    const integrations = await this.integrationService.getIntegrationsApps(
      authedUser.userId,
      authedUser.tenantId,
    );
    return new SuccessResponseObject('success', integrations);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':appId')
  async getIntegration(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
  ) {
    const integration =
      await this.integrationService.getIntegrationWithInstallStatus(
        appId,
        authedUser.userId,
        authedUser.tenantId,
      );
    return new SuccessResponseObject('success', integration);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':appId/authorize')
  async authorize(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
    @Body() optionalArgs: any,
  ) {
    return this.integrationService.handleAuthorize(
      authedUser,
      appId,
      optionalArgs,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':appId/uninstall')
  async uninstall(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
  ) {
    await this.validateAuthorization(authedUser, appId);
    const result = await this.integrationService.uninstall(
      appId,
      authedUser.userId,
      authedUser.tenantId,
    );
    return new SuccessResponseObject('success', result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('callback/:appId')
  async handleAuthCallback(
    @AuthedUser() authedUser: IAuthedUser,
    @Param('appId') appId: AppIds,
    @Query() query: ICallbackQueryParams,
  ) {
    try {
      await this.integrationService.handleAuthCallBack(
        authedUser,
        appId,
        query,
      );
      return new SuccessResponseObject('success auth');
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      } else {
        throw new UnauthorizedException('Failed to authenticate');
      }
    }
  }

  async validateAuthorization(authedUser: IAuthedUser, appId: AppIds) {
    const integration = await this.integrationService.getIntegration(appId);
    if (
      integration.type === IntegrationType.TENANT &&
      authedUser.userType === UserType.USER
    ) {
      throw new UnauthorizedException(
        'You are not authorized to update tenant level integrations',
      );
    }
    return integration;
  }
}
