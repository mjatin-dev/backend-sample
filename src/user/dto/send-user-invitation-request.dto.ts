import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';

import { UserRole, UserType } from '../types';

export class SendUserInvitationRequestDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  userEmail: UserType;

  @IsEnum(UserRole)
  userRole: UserRole;

  @IsNumber()
  tenantId: number;
}
