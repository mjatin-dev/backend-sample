import { UserType } from '@/user/types';
export interface AuthCognitoUser {
    id: string;
    email: string;
}
export interface IAuthedUser {
    userId: number;
    userEmail: string;
    userType: UserType;
    tenantId?: number;
}
export declare const DEFAULT_JWT_STRATEGY_OPTIONS: {
    secretOrKeyProvider: import("jwks-rsa").SecretCallback;
    audience: string;
    issuer: string;
    algorithms: string[];
};
