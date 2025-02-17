import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { KmsManagerService } from './kmsService';
import DBService, { IntegrationState } from './DBService';

export type TokenSchema = {
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
};

export class MyAuthenticationProvider implements AuthenticationProvider {
  private clientId: string;
  private tenantId: string;
  private clientSecret: string;
  private kmsManager: KmsManagerService;
  private dbService: DBService;

  constructor(
    private accessToken: string,
    private refreshToken: string,
    private sessionRow: IntegrationState<TokenSchema, any>, // private readonly dbService: DBService,
  ) {
    const clientId = process.env.MS_APP_ID;
    const clientSecret = process.env.MS_CLIENT_SECRET;
    const tenantId = process.env.MS_TENANT_ID;
    if (!clientId || !clientSecret || !tenantId) {
      throw new Error('MS_CLIENT_DATA env must be provided');
    }

    this.kmsManager = new KmsManagerService();
    this.clientId = clientId;
    this.tenantId = tenantId;
    this.clientSecret = clientSecret;
  }
  /**
   * This method will get called before every request to the msgraph server
   * This should return a Promise that resolves to an accessToken (in case of success) or rejects with error (in case of failure)
   * Basically this method will contain the implementation for getting and refreshing accessTokens
   */
  public async getAccessToken(): Promise<string> {
    console.log('executing get AccessToken');
    //Validate current AccessToken is valid
    const isValid = await this.validateAccessToken();
    if (isValid) {
      return this.accessToken;
    } else {
      //If not valid, refresh the token
      const { access_token, refresh_token } = await this.getNewTokens(
        this.refreshToken,
      );
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      this.sessionRow.session.tokens.accessToken =
        await this.kmsManager.encrypt(
          process.env.INTEGRATION_SESSION_KMS_KEY_ID || '',
          access_token,
        );
      this.sessionRow.session.tokens.refreshToken =
        await this.kmsManager.encrypt(
          process.env.INTEGRATION_SESSION_KMS_KEY_ID || '',
          refresh_token,
        );
      // await this.dbService.updateIntegrationAccessToken(this.sessionRow);
      return this.accessToken;
    }
  }

  private async validateAccessToken() {
    const payload: any = jwt.decode(this.accessToken);
    const tokenExp = payload?.exp || 0;
    const now = Math.floor(Date.now() / 1000);
    if (tokenExp < now) {
      return false;
    }
    return true;
  }

  private getNewTokens = async (
    refreshToken: string,
  ): Promise<RefreshTokenResponse> => {
    const params = new URLSearchParams();
    console.log('Access Token expired getting new one');
    params.append('grant_type', 'refresh_token');
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('scope', this.getScope().join(' '));
    console.log(this.getScope().join(' '));
    params.append('refresh_token', refreshToken);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const res = await axios.post(
      `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
      params,
      config,
    );
    console.log('new access token obtained');
    return res.data;
  };

  getScope() {
    return [
      'Bookings.ReadWrite.All',
      'Calendars.ReadWrite',
      'Calendars.ReadWrite.Shared',
      'Contacts.ReadWrite',
      'email',
      'Mail.ReadWrite.Shared',
      'Mail.Send',
      'Mail.Send.Shared',
      'MailboxFolder.ReadWrite',
      'MailboxItem.Read',
      'MailboxSettings.ReadWrite',
      'Notes.ReadWrite.All',
      'offline_access',
      'OnlineMeetings.ReadWrite',
      'openid',
      'profile',
      'Tasks.ReadWrite',
      'Tasks.ReadWrite.Shared',
      'User.Read',
    ];
  }
}
