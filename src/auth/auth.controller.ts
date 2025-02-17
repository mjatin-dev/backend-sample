import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SuccessResponseObject } from '../common/http';
import { LoginRequestDto } from './dto/login.request.dto';
import { ChangePasswordRequestDto } from './dto/change-password.request.dto';
import { SetPasswordRequestDto } from './dto/set-password.request.dto';
import { InitPasswordResetRequestDto } from './dto/init-password-reset.request.dto';
import { CheckEmailRequestDto } from './dto/check-email.request.dto';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login.response.dto';
import { SetPasswordResponseDto } from './dto/set-password.response.dto';
import { SalesforceAuthService } from '@/core/lib/salesforce/salesforce-auth.service';
import { UserType } from '@/user/types';
import { CreateUserRequestDto } from '@/user/dto/create-user.request.dto';
import { UserService } from '@/user/services/user.service';
import { VerifyRequestDto } from './dto/verify-email.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly salesforceAuthService: SalesforceAuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'User log in' })
  @ApiCreatedResponse({
    description: 'Successfully logged in.',
    type: LoginResponseDto,
  })
  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    try {
      const authSession = await this.authService.authenticateUser(body);

      return new SuccessResponseObject('Successfully logged in.', authSession);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get User integration auth request' })
  @ApiCreatedResponse({
    description: 'Success.',
    type: String,
  })
  @Post('login/integration/:app_id/request')
  async integrationLoginRequest(@Param('app_id') appId: string) {
    try {
      if (appId === 'salesforce') {
        const authUrl = await this.salesforceAuthService.authenticate();
        return new SuccessResponseObject('Success.', authUrl);
      }
      return new BadRequestException('Integration not recognized');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get User integration auth result' })
  @ApiCreatedResponse({
    description: 'Success.',
    type: LoginResponseDto,
  })
  @Post('login/integration/:app_id/result')
  async integrationLoginResult(
    @Param('app_id') appId: string,
    @Body() body: any,
  ) {
    try {
      if (appId === 'salesforce') {
        const { userInfo, isSandboxOrg, userIdentity } =
          await this.salesforceAuthService.login(body);
        let user = null;
        try {
          user = await this.authService.getUser(userIdentity.email);
        } catch (e) {}
        if (!user) {
          console.log('creating new user on cognito');
          const data: CreateUserRequestDto = {
            userName: userIdentity.username,
            userEmail: userIdentity.email,
            userType: UserType.USER,
            phoneNumber: userIdentity.mobile_phone,
            mobileNumber: userIdentity.mobile_phone,
          };
          await this.userService.create(data);
          user = await this.authService.getUser(userIdentity.email);
          try {
            await this.authService.initPasswordReset(user.email);
          } catch (e) {
            console.log('init password reset error', e);
          }
        }
        const loginSession = await this.authService.authenticateUserCustomFlow({
          email: userIdentity.email,
        });
        return new SuccessResponseObject('Success.', loginSession);
      }
      return new BadRequestException('Integration not recognized');
    } catch (error) {
      console.log('login error:::', error);
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'User create new password and authenticate' })
  @ApiCreatedResponse({
    description: 'Successfully logged in.',
    type: SetPasswordResponseDto,
  })
  @Post('set-password')
  async setPassword(@Body() body: SetPasswordRequestDto) {
    try {
      const authSession = await this.authService.setNewPassword(body);

      return new SuccessResponseObject('Successfully logged in.', authSession);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Initiate password reset' })
  @ApiCreatedResponse({ description: 'Successfully initiated password reset.' })
  @Post('password-reset/init')
  async initPasswordReset(@Body() body: InitPasswordResetRequestDto) {
    try {
      await this.authService.initPasswordReset(body.email);

      return new SuccessResponseObject(
        'Successfully initiated password reset.',
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Confirm password reset and authenticate' })
  @ApiCreatedResponse({
    description: 'Password successfully changed.',
    type: LoginResponseDto,
  })
  @Post('password-reset/confirm')
  async confirmPasswordReset(@Body() body: ConfirmPasswordResetDto) {
    try {
      const authSession = await this.authService.confirmPasswordReset(
        body.token,
        body.password,
      );

      return new SuccessResponseObject(
        'Password successfully changed.',
        authSession,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiCreatedResponse({ description: 'Password successfully changed.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordRequestDto) {
    try {
      await this.authService.changePassword(body);

      return new SuccessResponseObject('Password successfully changed.');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post('check-email')
  async checkEmail(@Body() body: CheckEmailRequestDto) {
    try {
      const res = await this.authService.checkEmailAddress(body);
      return new SuccessResponseObject('Succes', res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyRequestDto) {
    try {
      const res = await this.authService.verifyEmail(body);
      console.log('Verified email', res);
      return new SuccessResponseObject('Succes', res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  async registerUser(@Body() body: SignUpRequestDto) {
    try {
      const res = await this.authService.registerUser(body);
      // send an email.
      return new SuccessResponseObject('Succes', res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('resend')
  async resendEmail(@Body() body: CheckEmailRequestDto) {
    try {
      const res = await this.authService.resendEmail(body);
      // send an email.
      return new SuccessResponseObject('Succes', res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Log user out' })
  @ApiCreatedResponse({ description: 'Successfully logout.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('logout/:id')
  async logout(@Param('id') id: string) {
    try {
      await this.authService.signUserOut(id);
    } catch (error) {
      this.logger.error(`Sign user out error. ${error.message}.`, error.stack);
    }

    return new SuccessResponseObject('Successfully logout.');
  }

  @ApiOperation({ summary: 'User Details' })
  @ApiCreatedResponse({ description: 'Get user details' })
  @Get('user-details/:userId')
  async getUserDetails(@Param('userId') userId: string) {
    try {
      const details = await this.authService.getUserDetails(userId);
      return new SuccessResponseObject('User details.', details);
    } catch (error) {
      this.logger.error(
        `Error in user details. ${error.message}.`,
        error.stack,
      );
    }
  }
}
