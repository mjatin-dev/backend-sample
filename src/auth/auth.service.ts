import env from '@/config/env.config';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { ChangePasswordRequestDto } from './dto/change-password.request.dto';
import { CheckEmailRequestDto } from './dto/check-email.request.dto';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { VerifyRequestDto } from './dto/verify-email.request.dto';
import { verifyEmailResponseDto } from './dto/verify-email.response.dto';
import { emailContent } from './constant';
import jwt from 'jsonwebtoken';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminAddUserToGroupCommand,
  AdminUpdateUserAttributesCommand,
  AdminConfirmSignUpCommand,
  AdminGetUserCommand,
  AdminUserGlobalSignOutCommand,
  AdminDeleteUserCommand,
  AdminInitiateAuthCommand,
  AuthFlowType,
  AdminRespondToAuthChallengeCommand,
  ChallengeNameType,
  AdminSetUserPasswordCommand,
  AdminRemoveUserFromGroupCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthCognitoUser } from './types';
import { SetPasswordRequestDto } from './dto/set-password.request.dto';
import { MoreThan } from 'typeorm';
import { nanoid } from 'nanoid';
import { addHours } from 'date-fns';
import { MailService } from '@/mail/mail.service';
import { UserType } from '@/user/types';
import { PasswordResetTokenRepository } from './repositories/password-reset-token.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SetPasswordResponseDto } from './dto/set-password.response.dto';
import { UserRepository } from '@/user/repositories/user.repository';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly identityProvider: CognitoIdentityProviderClient;

  constructor(
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly mailService: MailService,
    private readonly userRepository: UserRepository,
  ) {
    this.identityProvider = new CognitoIdentityProviderClient({
      region: env().cognitoRegion,
      credentials: {
        accessKeyId: env().awsAccessKeyId,
        secretAccessKey: env().awsSecretAccessKey,
      },
    });
  }

  async authenticateUser(user: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = user;

    const initAuthCommand = new AdminInitiateAuthCommand({
      UserPoolId: env().cognitoUserPoolId,
      ClientId: env().cognitoClientId,
      AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const res = await this.identityProvider.send(initAuthCommand);

    if (res.AuthenticationResult) {
      return { accessToken: res.AuthenticationResult.IdToken };
    }

    return { session: res.Session };
  }

  async authenticateUserCustomFlow(params: {
    email: string;
  }): Promise<LoginResponseDto> {
    const { email } = params;

    const initAuthCommand = new AdminInitiateAuthCommand({
      UserPoolId: env().cognitoUserPoolId,
      ClientId: env().cognitoClientId,
      AuthFlow: AuthFlowType.CUSTOM_AUTH,
      AuthParameters: {
        USERNAME: email,
      },
    });

    const res = await this.identityProvider.send(initAuthCommand);

    if (res.AuthenticationResult) {
      return { accessToken: res.AuthenticationResult.IdToken };
    }

    return { session: res.Session };
  }

  async setNewPassword(
    data: SetPasswordRequestDto,
  ): Promise<SetPasswordResponseDto> {
    const { email, password, session } = data;

    const respondToAuthChallengeCommand =
      new AdminRespondToAuthChallengeCommand({
        UserPoolId: env().cognitoUserPoolId,
        ClientId: env().cognitoClientId,
        ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
        ChallengeResponses: {
          NEW_PASSWORD: password,
          USERNAME: email,
        },
        Session: session,
      });

    const res = await this.identityProvider.send(respondToAuthChallengeCommand);

    return { accessToken: res.AuthenticationResult.IdToken };
  }

  async changePassword(data: ChangePasswordRequestDto): Promise<void> {
    const { email, password } = data;

    const setUserPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: email,
      Password: password,
      Permanent: true,
    });

    await this.identityProvider.send(setUserPasswordCommand);
  }
  async checkEmailAddress(data: CheckEmailRequestDto): Promise<boolean> {
    const { email } = data;
    try {
      const userWithEmail = new AdminGetUserCommand({
        UserPoolId: env().cognitoUserPoolId,
        Username: email,
      });
      const response = await this.identityProvider.send(userWithEmail);
      console.log('User exists:', response);
      return true;
    } catch (error) {
      if (error.name === 'UserNotFoundException') {
        console.log('User not found');
        return false;
      }
    }
  }
  async verifyEmail(data: VerifyRequestDto): Promise<verifyEmailResponseDto> {
    const { token } = data;
    try {
      if (!token) {
        return { verified: false, message: 'Token is not valid.' };
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      if (typeof decoded === 'string') {
        throw new Error('Invalid token payload');
      }
      const username = decoded.username;
      const command = new AdminUpdateUserAttributesCommand({
        UserPoolId: env().cognitoUserPoolId,
        Username: username,
        UserAttributes: [
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      });
      await this.identityProvider.send(command);
      const ConfirmCommand = new AdminConfirmSignUpCommand({
        UserPoolId: env().cognitoUserPoolId,
        Username: username,
      });
      await this.identityProvider.send(ConfirmCommand);
      return { verified: true, message: 'Verified' };
    } catch (error) {
      if (error.message.includes('Current status is CONFIRMED')) {
        return { verified: true, message: 'Already verified.' };
      }
      if (error.message.includes('jwt expired')) {
        return { verified: false, message: 'Token Expired. Try again.' };
      }
    }
  }
  async registerUser(data: SignUpRequestDto): Promise<boolean> {
    const { email, password, firstName, lastName, company, jobTitle } = data;
    try {
      const attributes = [
        { Name: 'custom:firstName', Value: firstName },
        { Name: 'custom:lastName', Value: lastName },
        { Name: 'custom:company', Value: company },
        { Name: 'custom:jobTitle', Value: jobTitle },
      ];

      const command = new SignUpCommand({
        ClientId: env().cognitoClientId,
        Username: email,
        Password: password,
        UserAttributes: attributes,
      });

      const generateVerificationToken = (username: string) => {
        const secretKey = process?.env?.JWT_SECRET; // A secret key for signing the token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        return token;
      };

      const createVerificationLink = (username: string) => {
        const token = generateVerificationToken(username);
        const verificationUrl = `${
          env().frontEndUrl
        }/verify-email?token=${token}`;
        return verificationUrl;
      };

      const response = await this.identityProvider.send(command);
      console.log('response - 5 ', response);
      await this.addUserToGroup(env().cognitoUserPoolId, email, 'user');
      const verificationLink = createVerificationLink(email);
      const htmlContent = emailContent
        .replace('{{verificationLink}}', verificationLink)
        .replace('{{frontendUrl}}', env().frontEndUrl);
      await this.mailService.sendVerificationEmail(email, htmlContent);
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Handle error appropriately
    }
  }

  // Add user to group
  async addUserToGroup(
    userPoolId: string,
    username: string,
    groupName: string,
  ): Promise<any> {
    try {
      const command = new AdminAddUserToGroupCommand({
        UserPoolId: userPoolId,
        Username: username,
        GroupName: groupName,
      });
      const response = await this.identityProvider.send(command);
      return response;
    } catch (error) {
      console.error('Error adding user to group:', error);
      throw error;
    }
  }

  async resendEmail(data: CheckEmailRequestDto): Promise<boolean> {
    const { email } = data;
    try {
      const generateVerificationToken = (username: string) => {
        const secretKey = process.env.JWT_SECRET; // A secret key for signing the token
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        return token;
      };
      const createVerificationLink = (username: string) => {
        const token = generateVerificationToken(username);
        const verificationUrl = `${
          env().frontEndUrl
        }/verify-email?token=${token}`;
        return verificationUrl;
      };

      const verificationLink = createVerificationLink(email);
      const htmlContent = emailContent
        .replace('{{verificationLink}}', verificationLink)
        .replace('{{frontendUrl}}', env().frontEndUrl);
      await this.mailService.sendVerificationEmail(email, htmlContent);
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Handle error appropriately
    }
  }

  async createUser(
    email: string,
    role: UserType,
  ): Promise<{ id: string; password: string }> {
    const password = `Cc-${Math.random().toString(36).slice(2, 7)}1!`;

    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: email,
      TemporaryPassword: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'True' },
      ],
      MessageAction: 'SUPPRESS',
    });

    const res = await this.identityProvider.send(createUserCommand);

    if (!res.User) {
      throw new BadRequestException('User creation error!');
    }

    const addToGroupCommand = new AdminAddUserToGroupCommand({
      GroupName: role,
      UserPoolId: env().cognitoUserPoolId,
      Username: email,
    });

    await this.identityProvider.send(addToGroupCommand);

    return { id: res.User.Username, password };
  }

  async updateUser(userId: string, email?: string): Promise<void> {
    const userAttributes = [];

    if (email) {
      userAttributes.push(
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'True' },
      );
    }

    if (userAttributes.length === 0) return;

    const updateUserCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: userId,
      UserAttributes: userAttributes,
    });

    await this.identityProvider.send(updateUserCommand);
  }

  async getUser(username: string): Promise<AuthCognitoUser> {
    const getUserCommand = new AdminGetUserCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: username,
    });

    const user = await this.identityProvider.send(getUserCommand);

    const { email, sub } = user.UserAttributes.reduce((acc, val) => {
      acc[val.Name] = val.Value;
      return acc;
    }, {}) as { name: string; email: string; sub: string };

    return { id: sub, email };
  }

  async signUserOut(id: string): Promise<void> {
    const signOutCommand = new AdminUserGlobalSignOutCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: id,
    });

    await this.identityProvider.send(signOutCommand);
  }

  async deleteUser(id: string): Promise<void> {
    const deleteUserCommand = new AdminDeleteUserCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: id,
    });

    await this.identityProvider.send(deleteUserCommand);
  }

  async sendUserInvitation(data: SignUpRequestDto): Promise<void> {
    try {
    } catch (error) {
      console.error('Error sending user invitation:', error);
      throw error;
    }
  }

  @Transactional()
  async initPasswordReset(email: string): Promise<void> {
    const user = await this.getUser(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    let resetToken = await this.passwordResetTokenRepository.findOne({
      where: { userId: user.id },
    });

    if (!resetToken) {
      resetToken = this.passwordResetTokenRepository.create({
        userId: user.id,
      });
    }

    const token = nanoid(25);

    await this.passwordResetTokenRepository.save({
      ...resetToken,
      token,
      expiresAt: addHours(new Date(), 12),
      consumed: false,
      consumedAt: null,
    });

    await this.mailService.sendPasswordResetEmail(user.email, {
      resetPasswordLink: `${env().frontEndUrl}/auth/create-password/${token}`,
    });
  }

  @Transactional()
  async confirmPasswordReset(
    token: string,
    password: string,
  ): Promise<LoginResponseDto> {
    const resetToken = await this.passwordResetTokenRepository.findOne({
      where: {
        token,
        consumed: false,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (!resetToken) {
      throw new NotFoundException('Token not found.');
    }

    const user = await this.getUser(resetToken.userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.changePassword({ email: user.email, password });

    await this.passwordResetTokenRepository.save({
      ...resetToken,
      consumed: true,
      consumedAt: new Date(),
    });

    const authSession = await this.authenticateUser({
      email: user.email,
      password,
    });

    return authSession;
  }

  async updateUserGroup(
    id: string,
    currentGroup: UserType,
    nextGroup: UserType,
  ): Promise<void> {
    if (currentGroup === nextGroup) return;

    const removeFromGroupCommand = new AdminRemoveUserFromGroupCommand({
      GroupName: currentGroup,
      UserPoolId: env().cognitoUserPoolId,
      Username: id,
    });

    await this.identityProvider.send(removeFromGroupCommand);

    const addToGroupCommand = new AdminAddUserToGroupCommand({
      GroupName: nextGroup,
      UserPoolId: env().cognitoUserPoolId,
      Username: id,
    });

    await this.identityProvider.send(addToGroupCommand);
  }

  async disableUser(id: string): Promise<void> {
    const disableUserCommand = new AdminDisableUserCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: id,
    });

    await this.identityProvider.send(disableUserCommand);
  }

  async enableUser(id: string): Promise<void> {
    const enableUserCommand = new AdminEnableUserCommand({
      UserPoolId: env().cognitoUserPoolId,
      Username: id,
    });

    await this.identityProvider.send(enableUserCommand);
  }

  async getUserDetails(id: string): Promise<User> {
    const fetchUserDetails = this.userRepository.findOne({
      where: { userId: id },
    });
    return fetchUserDetails;
  }
}
