import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { ChangePasswordRequestDto } from './dto/change-password.request.dto';
import { CheckEmailRequestDto } from './dto/check-email.request.dto';
import { SignUpRequestDto } from './dto/signup.request.dto';
import { VerifyRequestDto } from './dto/verify-email.request.dto';
import { verifyEmailResponseDto } from './dto/verify-email.response.dto';
import { AuthCognitoUser } from './types';
import { SetPasswordRequestDto } from './dto/set-password.request.dto';
import { MailService } from '@/mail/mail.service';
import { UserType } from '@/user/types';
import { PasswordResetTokenRepository } from './repositories/password-reset-token.repository';
import { SetPasswordResponseDto } from './dto/set-password.response.dto';
export declare class AuthService {
    private readonly passwordResetTokenRepository;
    private readonly mailService;
    private readonly identityProvider;
    constructor(passwordResetTokenRepository: PasswordResetTokenRepository, mailService: MailService);
    authenticateUser(user: LoginRequestDto): Promise<LoginResponseDto>;
    authenticateUserCustomFlow(params: {
        email: string;
    }): Promise<LoginResponseDto>;
    setNewPassword(data: SetPasswordRequestDto): Promise<SetPasswordResponseDto>;
    changePassword(data: ChangePasswordRequestDto): Promise<void>;
    checkEmailAddress(data: CheckEmailRequestDto): Promise<boolean>;
    verifyEmail(data: VerifyRequestDto): Promise<verifyEmailResponseDto>;
    registerUser(data: SignUpRequestDto): Promise<boolean>;
    resendEmail(data: CheckEmailRequestDto): Promise<boolean>;
    createUser(email: string, role: UserType): Promise<{
        id: string;
        password: string;
    }>;
    updateUser(userId: string, email?: string): Promise<void>;
    getUser(username: string): Promise<AuthCognitoUser>;
    signUserOut(id: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    initPasswordReset(email: string): Promise<void>;
    confirmPasswordReset(token: string, password: string): Promise<LoginResponseDto>;
    updateUserGroup(id: string, currentGroup: UserType, nextGroup: UserType): Promise<void>;
    disableUser(id: string): Promise<void>;
    enableUser(id: string): Promise<void>;
}
