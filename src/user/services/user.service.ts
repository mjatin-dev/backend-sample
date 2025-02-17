import { Injectable, NotFoundException } from '@nestjs/common';
import { FindConditions, FindOneOptions, Not, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user.response.dto';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { CreateUserRequestDto } from '../dto/create-user.request.dto';
import { AuthService } from '@/auth/auth.service';
import { MailService } from '@/mail/mail.service';
import env from '@/config/env.config';
import { cleanObject } from '@/common/utils';
import isEmpty from 'lodash.isempty';
import { UserRepository } from '../repositories/user.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { v4 } from 'uuid';
import { CreateUserResponseDto } from '../dto/create-user.response.dto';
import { userNormalizer } from '../normalizers/user.normalizer';
import { UserContactInformationService } from './userContactInformation.service';
import e, { Send } from 'express';
import { SendUserInvitationRequestDto } from '../dto/send-user-invitation-request.dto';
import { UserStatus, UserType } from '../types';
import {
  cancelUserInvitationEmail,
  sendUserInvitationEmail,
} from '@/auth/constant';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly userContactInfoService: UserContactInformationService,
    private readonly mailService: MailService,
  ) {}

  @Transactional()
  async create(
    data: CreateUserRequestDto,
    creatorId?: number,
  ): Promise<CreateUserResponseDto> {
    const {
      userName,
      userEmail,
      userType,
      phoneNumber,
      mobileNumber,
      profileJobRole,
    } = data;

    let tenantId: number | undefined;

    if (creatorId) {
      const creator = await this.findOne({ userId: creatorId });
      tenantId = creator.tenantId;
    }

    const user = this.userRepository.create({
      userName,
      userEmail,
      userType,
      tenantId,
      userCreatedBy: creatorId,
      userCognitoId: v4(), // temporal
    });

    const savedUser = await this.userRepository.save(user);

    await this.userContactInfoService.create({
      userId: savedUser.userId,
      phoneNumber,
      mobileNumber,
      // profileJobRole,
    });

    const cognitoUser = await this.authService.createUser(userEmail, userType);

    // update with actual cognito user id
    await this.userRepository.save({
      ...savedUser,
      userCognitoId: cognitoUser.id,
    });

    await this.mailService.sendWelcomeEmail(userEmail, {
      password: cognitoUser.password,
      dashboardUrl: `${env().frontEndUrl}/auth/login?email=${encodeURIComponent(
        userEmail,
      )}`,
    });

    return userNormalizer.getCreateUserResponseDto(savedUser);
  }

  /**
   * Send User invitation
   * @param data
   * @returns
   */
  async sendUserInvitation(data: SendUserInvitationRequestDto): Promise<void> {
    try {
      const { firstName, lastName, userEmail, userRole, tenantId } = data;
      const existingUser = await this.userRepository.findOne({
        where: { userEmail: userEmail },
      });
      if (existingUser) {
        throw new NotFoundException('User already exists!');
      }

      const newUser = this.userRepository.create({
        userName: `${firstName} ${lastName}`,
        userEmail: userEmail,
        userType: UserType.USER,
        tenantId: tenantId,
        tenantRole: userRole,
        userCognitoId: v4(), // temporal
        invitationStatus: UserStatus.PENDING,
      });

      const savedUser = await this.userRepository.save(newUser);
      // const cognitoUser = await this.authService.createUser(userEmail, UserType.USER);

      const invitationLink = `${env().frontEndUrl}/auth/signup?tenantId=${
        savedUser.tenantId
      }&userId=${savedUser.userId}`;
      const loginLink = `${env().frontEndUrl}/auth/login`;

      const htmlContent = sendUserInvitationEmail
        .replace('[Login Link]', loginLink)
        .replace('[First Name]', firstName)
        .replace('[Email Address]', savedUser.userEmail)
        .replace('[Role Name]', savedUser.tenantRole)
        .replace('[Invitation Link]', invitationLink);

      const sendUserInvitation = await this.mailService.sendUserInvitationEmail(
        'You have been invited to join the team',
        savedUser.userEmail,
        htmlContent,
      );

      return sendUserInvitation;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Re-Send user invitation
   * @param data
   * @returns
   */
  async resendUserInvitation(data: { userId: number }): Promise<void> {
    try {
      const { userId } = data;
      const fetchUser = await this.userRepository.findOne({
        where: { userId: userId },
      });
      if (!fetchUser) {
        throw new NotFoundException('User not exists!');
      }

      const invitationLink = `${env().frontEndUrl}/auth/signup?tenantId=${
        fetchUser.tenantId
      }&userId=${fetchUser.userId}`;
      const loginLink = `${env().frontEndUrl}/auth/login`;

      const htmlContent = sendUserInvitationEmail
        .replace('[Login Link]', loginLink)
        .replace('[First Name]', fetchUser.userName)
        .replace('[Email Address]', fetchUser.userEmail)
        .replace('[Role Name]', fetchUser.tenantRole)
        .replace('[Invitation Link]', invitationLink);

      const sendUserInvitation = await this.mailService.sendUserInvitationEmail(
        'You have been re-invited to join the team',
        fetchUser.userEmail,
        htmlContent,
      );

      return sendUserInvitation;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel user invitation
   * @param data
   * @returns
   */
  async cancelUserInvitation(data: { userId: number }): Promise<UpdateResult> {
    try {
      const { userId } = data;
      const fetchUser = await this.userRepository.findOne({
        where: { userId: userId },
      });
      if (!fetchUser) {
        throw new NotFoundException('User not exists!');
      }
      const updateUserInvitation = await this.userRepository.update(userId, {
        invitationStatus: UserStatus.CANCELLED,
      });

      const loginLink = `${env().frontEndUrl}/auth/login`;

      const htmlContent = cancelUserInvitationEmail
        .replace('[Login Link]', loginLink)
        .replace('[First Name]', fetchUser.userName);

      await this.mailService.sendUserInvitationEmail(
        'Invitation Cancelled',
        fetchUser.userEmail,
        htmlContent,
      );

      return updateUserInvitation;
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    where: FindConditions<User>,
    ownerId?: number,
  ): Promise<UserResponseDto> {
    const findOptions: FindOneOptions<User> = {
      where,
      relations: ['contactInfo'],
    };

    // if (ownerId) {
    //   findOptions.relations = ['company', 'profile'];
    //   findOptions.where = {
    //     ...where,
    //     company: { ownerId },
    //   };
    // }

    const user = await this.userRepository.findOne(undefined, findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return userNormalizer.getUserResponseDto(user);
  }

  async findAll(tenantId: number): Promise<UserResponseDto[]> {
    const userListResponse: UserResponseDto[] = await this.userRepository.find({
      where: { tenantId },
      relations: ['contactInfo'],
      order: { userId: 'DESC' },
    });
    return userListResponse.map(userNormalizer.getUserResponseDto);
  }

  @Transactional()
  async update(
    id: number,
    data: UpdateUserRequestDto & { companyId?: number },
    ownerId?: number,
  ): Promise<void> {
    const findOptions: FindOneOptions<User> = {
      where: { userId: id },
      relations: ['contactInfo'],
    };

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const { userName, userEmail, userType, tenantId, ...profileData } = data;

    if (userEmail) {
      await this.authService.updateUser(user.userCognitoId, userEmail);
    }

    if (userType && userType !== user.userType) {
      await this.authService.updateUserGroup(
        user.userCognitoId,
        user.userType,
        userType,
      );
    }

    const userUpdate: Partial<User> = {
      userName,
      userEmail,
      userType,
      tenantId,
    };

    if (!isEmpty(userUpdate)) {
      await this.userRepository.save({
        ...user,
        ...cleanObject({
          ...userUpdate,
          userModifiedBy: ownerId,
        }),
      });
    }

    if (!isEmpty(profileData)) {
      await this.userContactInfoService.update(
        user.contactInfo.userContInfoId,
        profileData,
      );
    }
  }

  @Transactional()
  async delete(id: number, ownerId?: number): Promise<void> {
    const findOptions: FindOneOptions<User> = { where: { userId: id } };

    if (ownerId) {
      findOptions.relations = ['company'];
      findOptions.where = {
        userId: id,
        company: { ownerId },
      };
    }

    const user = await this.userRepository.findOne(findOptions);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userRepository.remove([user]);

    await this.authService.deleteUser(user.userCognitoId);
  }

  async inactivate(
    id: number,
    userId: number,
    companyId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne(id, {
      where: { companyId, userId: Not(userId) },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.authService.disableUser(user.userCognitoId);

    await this.userRepository.save({ ...user, userActive: false });
  }

  async reactivate(
    id: number,
    userId: number,
    companyId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne(id, {
      where: { companyId, userId: Not(userId) },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.authService.enableUser(user.userCognitoId);

    await this.userRepository.save({ ...user, userActive: true });
  }
}
