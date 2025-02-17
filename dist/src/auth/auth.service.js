"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const typeorm_1 = require("typeorm");
const nanoid_1 = require("nanoid");
const date_fns_1 = require("date-fns");
const mail_service_1 = require("../mail/mail.service");
const password_reset_token_repository_1 = require("./repositories/password-reset-token.repository");
const typeorm_transactional_cls_hooked_1 = require("typeorm-transactional-cls-hooked");
let AuthService = class AuthService {
    constructor(passwordResetTokenRepository, mailService) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.mailService = mailService;
        this.identityProvider = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: (0, env_config_1.default)().cognitoRegion,
            credentials: {
                accessKeyId: (0, env_config_1.default)().awsAccessKeyId,
                secretAccessKey: (0, env_config_1.default)().awsSecretAccessKey,
            },
        });
    }
    async authenticateUser(user) {
        const { email, password } = user;
        const initAuthCommand = new client_cognito_identity_provider_1.AdminInitiateAuthCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            ClientId: (0, env_config_1.default)().cognitoClientId,
            AuthFlow: client_cognito_identity_provider_1.AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
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
    async authenticateUserCustomFlow(params) {
        const { email } = params;
        const initAuthCommand = new client_cognito_identity_provider_1.AdminInitiateAuthCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            ClientId: (0, env_config_1.default)().cognitoClientId,
            AuthFlow: client_cognito_identity_provider_1.AuthFlowType.CUSTOM_AUTH,
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
    async setNewPassword(data) {
        const { email, password, session } = data;
        const respondToAuthChallengeCommand = new client_cognito_identity_provider_1.AdminRespondToAuthChallengeCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            ClientId: (0, env_config_1.default)().cognitoClientId,
            ChallengeName: client_cognito_identity_provider_1.ChallengeNameType.NEW_PASSWORD_REQUIRED,
            ChallengeResponses: {
                NEW_PASSWORD: password,
                USERNAME: email,
            },
            Session: session,
        });
        const res = await this.identityProvider.send(respondToAuthChallengeCommand);
        return { accessToken: res.AuthenticationResult.IdToken };
    }
    async changePassword(data) {
        const { email, password } = data;
        const setUserPasswordCommand = new client_cognito_identity_provider_1.AdminSetUserPasswordCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: email,
            Password: password,
            Permanent: true,
        });
        await this.identityProvider.send(setUserPasswordCommand);
    }
    async checkEmailAddress(data) {
        const { email } = data;
        try {
            const userWithEmail = new client_cognito_identity_provider_1.AdminGetUserCommand({
                UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
                Username: email
            });
            const response = await this.identityProvider.send(userWithEmail);
            console.log('User exists:', response);
            return true;
        }
        catch (error) {
            if (error.name === 'UserNotFoundException') {
                console.log('User not found');
                return false;
            }
        }
    }
    async verifyEmail(data) {
        const { token } = data;
        try {
            if (!token) {
                return { verified: false, message: 'Token is not valid.' };
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (typeof decoded === 'string') {
                throw new Error('Invalid token payload');
            }
            const username = decoded.username;
            const command = new client_cognito_identity_provider_1.AdminUpdateUserAttributesCommand({
                UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
                Username: username,
                UserAttributes: [
                    {
                        Name: 'email_verified',
                        Value: 'true',
                    },
                ],
            });
            await this.identityProvider.send(command);
            const ConfirmCommand = new client_cognito_identity_provider_1.AdminConfirmSignUpCommand({
                UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
                Username: username,
            });
            await this.identityProvider.send(ConfirmCommand);
            return { verified: true, message: 'Verified' };
        }
        catch (error) {
            if (error.message.includes('Current status is CONFIRMED')) {
                return { verified: true, message: 'Already verified.' };
            }
            if (error.message.includes('jwt expired')) {
                return { verified: false, message: 'Token Expired. Try again.' };
            }
        }
    }
    async registerUser(data) {
        const { email, password, firstName, lastName, company, jobTitle } = data;
        try {
            const attributes = [
                { Name: 'custom:firstName', Value: firstName },
                { Name: 'custom:lastName', Value: lastName },
                { Name: 'custom:company', Value: company },
                { Name: 'custom:jobTitle', Value: jobTitle },
            ];
            const command = new client_cognito_identity_provider_1.SignUpCommand({
                ClientId: (0, env_config_1.default)().cognitoClientId,
                Username: email,
                Password: password,
                UserAttributes: attributes
            });
            const generateVerificationToken = (username) => {
                const secretKey = process.env.JWT_SECRET;
                const token = jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: "1h" });
                return token;
            };
            const createVerificationLink = (username) => {
                const token = generateVerificationToken(username);
                const verificationUrl = `${(0, env_config_1.default)().frontEndUrl}/verify-email?token=${token}`;
                return verificationUrl;
            };
            const response = await this.identityProvider.send(command);
            console.log("response - 5 ", response);
            const verificationLink = createVerificationLink(email);
            const htmlContent = constant_1.emailContent
                .replace('{{verificationLink}}', verificationLink)
                .replace('{{frontendUrl}}', (0, env_config_1.default)().frontEndUrl);
            await this.mailService.sendVerificationEmail(email, htmlContent);
            return true;
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    async resendEmail(data) {
        const { email } = data;
        try {
            const generateVerificationToken = (username) => {
                const secretKey = process.env.JWT_SECRET;
                const token = jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: "1h" });
                return token;
            };
            const createVerificationLink = (username) => {
                const token = generateVerificationToken(username);
                const verificationUrl = `${(0, env_config_1.default)().frontEndUrl}/verify-email?token=${token}`;
                return verificationUrl;
            };
            const verificationLink = createVerificationLink(email);
            const htmlContent = constant_1.emailContent
                .replace('{{verificationLink}}', verificationLink)
                .replace('{{frontendUrl}}', (0, env_config_1.default)().frontEndUrl);
            await this.mailService.sendVerificationEmail(email, htmlContent);
            return true;
        }
        catch (error) {
            console.error('Error registering user:', error);
            throw error;
        }
    }
    async createUser(email, role) {
        const password = `Cc-${Math.random().toString(36).slice(2, 7)}1!`;
        const createUserCommand = new client_cognito_identity_provider_1.AdminCreateUserCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
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
            throw new common_1.BadRequestException('User creation error!');
        }
        const addToGroupCommand = new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
            GroupName: role,
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: email,
        });
        await this.identityProvider.send(addToGroupCommand);
        return { id: res.User.Username, password };
    }
    async updateUser(userId, email) {
        const userAttributes = [];
        if (email) {
            userAttributes.push({ Name: 'email', Value: email }, { Name: 'email_verified', Value: 'True' });
        }
        if (userAttributes.length === 0)
            return;
        const updateUserCommand = new client_cognito_identity_provider_1.AdminUpdateUserAttributesCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: userId,
            UserAttributes: userAttributes,
        });
        await this.identityProvider.send(updateUserCommand);
    }
    async getUser(username) {
        const getUserCommand = new client_cognito_identity_provider_1.AdminGetUserCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: username,
        });
        const user = await this.identityProvider.send(getUserCommand);
        const { email, sub } = user.UserAttributes.reduce((acc, val) => {
            acc[val.Name] = val.Value;
            return acc;
        }, {});
        return { id: sub, email };
    }
    async signUserOut(id) {
        const signOutCommand = new client_cognito_identity_provider_1.AdminUserGlobalSignOutCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: id,
        });
        await this.identityProvider.send(signOutCommand);
    }
    async deleteUser(id) {
        const deleteUserCommand = new client_cognito_identity_provider_1.AdminDeleteUserCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: id,
        });
        await this.identityProvider.send(deleteUserCommand);
    }
    async initPasswordReset(email) {
        const user = await this.getUser(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        let resetToken = await this.passwordResetTokenRepository.findOne({
            where: { userId: user.id },
        });
        if (!resetToken) {
            resetToken = this.passwordResetTokenRepository.create({
                userId: user.id,
            });
        }
        const token = (0, nanoid_1.nanoid)(25);
        await this.passwordResetTokenRepository.save(Object.assign(Object.assign({}, resetToken), { token, expiresAt: (0, date_fns_1.addHours)(new Date(), 12), consumed: false, consumedAt: null }));
        await this.mailService.sendPasswordResetEmail(user.email, {
            resetPasswordLink: `${(0, env_config_1.default)().frontEndUrl}/auth/create-password/${token}`,
        });
    }
    async confirmPasswordReset(token, password) {
        const resetToken = await this.passwordResetTokenRepository.findOne({
            where: {
                token,
                consumed: false,
                expiresAt: (0, typeorm_1.MoreThan)(new Date()),
            },
        });
        if (!resetToken) {
            throw new common_1.NotFoundException('Token not found.');
        }
        const user = await this.getUser(resetToken.userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        await this.changePassword({ email: user.email, password });
        await this.passwordResetTokenRepository.save(Object.assign(Object.assign({}, resetToken), { consumed: true, consumedAt: new Date() }));
        const authSession = await this.authenticateUser({
            email: user.email,
            password,
        });
        return authSession;
    }
    async updateUserGroup(id, currentGroup, nextGroup) {
        if (currentGroup === nextGroup)
            return;
        const removeFromGroupCommand = new client_cognito_identity_provider_1.AdminRemoveUserFromGroupCommand({
            GroupName: currentGroup,
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: id,
        });
        await this.identityProvider.send(removeFromGroupCommand);
        const addToGroupCommand = new client_cognito_identity_provider_1.AdminAddUserToGroupCommand({
            GroupName: nextGroup,
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: id,
        });
        await this.identityProvider.send(addToGroupCommand);
    }
    async disableUser(id) {
        const disableUserCommand = new client_cognito_identity_provider_1.AdminDisableUserCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: id,
        });
        await this.identityProvider.send(disableUserCommand);
    }
    async enableUser(id) {
        const enableUserCommand = new client_cognito_identity_provider_1.AdminEnableUserCommand({
            UserPoolId: (0, env_config_1.default)().cognitoUserPoolId,
            Username: id,
        });
        await this.identityProvider.send(enableUserCommand);
    }
};
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "initPasswordReset", null);
__decorate([
    (0, typeorm_transactional_cls_hooked_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "confirmPasswordReset", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [password_reset_token_repository_1.PasswordResetTokenRepository,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map