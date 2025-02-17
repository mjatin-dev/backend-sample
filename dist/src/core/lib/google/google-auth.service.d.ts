import { IAuthedUser } from '@/auth/types';
import { IFirebaseProvider } from '@/core/lib/firebase/types';
import { IntegrationSession } from '@/core/types';
import { Auth } from 'googleapis';
import { AppIds, ICallbackQueryParams } from '../../types';
export declare class GoogleAuthService {
    #private;
    private readonly firebase;
    constructor(firebase: IFirebaseProvider);
    private getFrontendRedirectUrl;
    private getAppScopes;
    private saveUserSession;
    private getToken;
    getUserSession(userId: number): Promise<IntegrationSession>;
    get oAuth2Client(): Auth.OAuth2Client;
    getAuth(userId: number, tokens?: Auth.Credentials): Promise<Auth.OAuth2Client>;
    authorize(appId: AppIds, user: IAuthedUser): Promise<string>;
    handleAuthCallback(query: ICallbackQueryParams, authedUser: IAuthedUser): Promise<void>;
}
