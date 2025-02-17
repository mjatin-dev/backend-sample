import env from '@/config/env.config';
import { IntegrationSession } from '@/core/types';
import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection, IdentityInfo, OAuth2, UserInfo } from 'jsforce';
import { AppIds, ICallbackQueryParams } from '../../types';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';
import { Integration } from '@/integration/integration.entity';
import { IntegrationState } from '@/integration/integrationState.entity';
import { IntegrationService } from '@/integration/integration.service';

const allowedAdminRoles = ['System Administrator', 'Delegated Admin'];

@Injectable()
export class SalesforceAuthService {
  #oAuth2Client: OAuth2;
  #oAuth2SandboxClient: OAuth2;

  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationStateRepository: IntegrationStateRepository,
    private readonly kmsManagerService: KmsManagerService,
    private integrationService: IntegrationService,
  ) {}

  private getFrontendRedirectUrl() {
    return env().frontEndUrl + '/d/integration-redirect/' + AppIds.SALESFORCE;
  }

  private async getIntegrationData(
    AppId: AppIds,
    option: { tenantId?: number; userId?: number },
  ): Promise<{
    integration?: Integration;
    integrationState?: IntegrationState;
  }> {
    const { tenantId, userId } = option;
    if (tenantId) {
      const integration =
        await this.integrationRepository.getOneIntegrationWithStateByTenant(
          tenantId,
          AppId,
        );
      const integrationState = integration?.integratedApps?.find(
        (app) => app.tenantId === tenantId,
      );
      return { integration, integrationState };
    } else {
      const integration =
        await this.integrationRepository.getOneIntegrationWithStateByUser(
          userId,
          AppId,
        );
      const integrationState = integration?.integratedApps?.find(
        (app) => app.userId === userId,
      );
      return { integration, integrationState };
    }
  }

  private async saveUserSession(
    AppId: AppIds,
    authedUser: IAuthedUser,
    session: IntegrationSession,
  ) {
    const queryOption =
      AppId === AppIds.SALESFORCE
        ? { tenantId: authedUser.tenantId }
        : { userId: authedUser.userId };

    const { integration, integrationState } = await this.getIntegrationData(
      AppId,
      queryOption,
    );

    if (integrationState) {
      await this.integrationStateRepository.update(integrationState.id, {
        session,
      });
      return;
    }

    await this.integrationStateRepository.insert({
      ...queryOption,
      integration,
      session,
    });
  }

  get oAuth2Client() {
    if (!this.#oAuth2Client) {
      this.#oAuth2Client = new OAuth2({
        clientId: env().salesforceConsumerKey,
        clientSecret: env().salesforceConsumerSecret,
        redirectUri: this.getFrontendRedirectUrl(),
      });
    }
    return this.#oAuth2Client;
  }

  get oAuth2SandboxClient() {
    if (!this.#oAuth2SandboxClient) {
      this.#oAuth2SandboxClient = new OAuth2({
        clientId: env().salesforceConsumerKey,
        clientSecret: env().salesforceConsumerSecret,
        redirectUri: this.getFrontendRedirectUrl(),
        loginUrl: 'https://test.salesforce.com',
      });
    }
    return this.#oAuth2SandboxClient;
  }

  async authorize(
    authedUser: IAuthedUser,
    optionalArgs: { env: 'prod' | 'test' },
  ): Promise<string> {
    const { integrationState } = await this.getIntegrationData(
      AppIds.SALESFORCE,
      { tenantId: authedUser.tenantId },
    );
    const scopes = this.getAppScopes();
    if (!integrationState?.session?.tokens) {
      let authUrl = '';
      if (optionalArgs.env === 'test') {
        authUrl = this.oAuth2SandboxClient.getAuthorizationUrl({
          scope: scopes.join(' '),
          state: `${authedUser.userId}@${AppIds.SALESFORCE}`,
        });
      } else {
        authUrl = this.oAuth2Client.getAuthorizationUrl({
          scope: scopes.join(' '),
          state: `${authedUser.userId}@${AppIds.SALESFORCE}`,
        });
      }
      console.log('Authorize this app by visiting this url:', authUrl);
      return authUrl;
    }
    return this.getFrontendRedirectUrl();
  }

  async authorizeUserIntegration(
    authedUser: IAuthedUser,
    optionalArgs: { env: 'prod' | 'test' },
  ): Promise<string> {
    console.log({ optionalArgs });
    const { integrationState } = await this.getIntegrationData(
      AppIds.SALESFORCE_USER,
      { userId: authedUser.userId },
    );
    const scopes = this.getAppScopes();
    if (!integrationState?.session?.tokens) {
      let authUrl = '';
      if (optionalArgs.env === 'test') {
        authUrl = this.oAuth2SandboxClient.getAuthorizationUrl({
          scope: scopes.join(' '),
          state: `${authedUser.userId}@${AppIds.SALESFORCE_USER}`,
        });
      } else {
        authUrl = this.oAuth2Client.getAuthorizationUrl({
          scope: scopes.join(' '),
          state: `${authedUser.userId}@${AppIds.SALESFORCE_USER}`,
        });
      }
      console.log('Authorize this app by visiting this url:', authUrl);
      return authUrl;
    }
    return this.getFrontendRedirectUrl();
  }

  async authenticate(): Promise<string> {
    const scopes = this.getAppScopes().join(' ');
    const authUrl = this.oAuth2Client.getAuthorizationUrl({
      scope: scopes,
      state: `{"app": "${AppIds.SALESFORCE}", "action": "login"}`,
    });
    console.log('Authenticate with Salesforce using this url:::', authUrl);
    return authUrl;
  }

  async login(body: any): Promise<any> {
    try {
      const { code } = body;
      const { identityInfo, userInfo, isSandboxOrg } =
        await this.verifyCodeAndGetIdentity(code);
      if (!identityInfo.email_verified || !identityInfo.asserted_user) {
        throw new HttpException('Email is not verified', 400);
      }
      return { userInfo, isSandboxOrg, userIdentity: identityInfo };
    } catch (err: any) {
      throw new HttpException(`Error integration login ${err.message}`, err);
    }
  }

  getAppScopes() {
    return [
      'id',
      'profile',
      'email',
      'address',
      'phone',
      'api',
      'web',
      'refresh_token',
      'offline_access',
      'openid',
      'custom_permissions',
      'wave_api',
      'content',
      'cdp_ingest_api',
      'cdp_profile_api',
      'cdp_query_api',
      'cdp_segment_api',
      // 'cdp_identity_resolution_api',
      // 'cdp_calculated_insight_api',
    ];
  }

  async handleAuthCallback(
    query: ICallbackQueryParams,
    AppId: AppIds,
    authedUser: IAuthedUser,
  ) {
    const { code, state } = query;
    const userId = Number(state?.split('@')[0]);
    if (isNaN(userId)) return;

    const { connection, isSandboxOrg, userInfo } =
      await this.verifyCodeAndGetConnection(code);

    const { userIdentity } = await this.validateIntegrationRoleRequirements(
      connection,
      AppId,
    );

    const accessTokenEncrypted = await this.encryptToken(
      connection.accessToken,
    );

    const refreshTokenEncrypted = await this.encryptToken(
      connection.refreshToken,
    );

    const orgName = connection.instanceUrl.split('.')[0].split('//')[1];

    const { tenantId: createdTenantId } =
      await this.integrationService.upgradeUserToTenantOwner(
        authedUser.userId,
        {
          addressState: userIdentity.addr_state || '',
          city: userIdentity.addr_city || '',
          country: userIdentity.addr_country || '',
          email: userIdentity.email || '',
          mobileNumber: userIdentity.mobile_phone || '',
          phoneNumber: userIdentity.mobile_phone || '',
          street: userIdentity.addr_street || '',
          zip: userIdentity.addr_zip || '',
        },
        orgName,
      );

    const saveIntegrationOptions: IAuthedUser = {
      ...authedUser,
    };

    if (!saveIntegrationOptions.tenantId) {
      saveIntegrationOptions.tenantId = createdTenantId;
    }

    await this.saveUserSession(AppId, saveIntegrationOptions, {
      tokens: {
        accessToken: accessTokenEncrypted,
        refreshToken: refreshTokenEncrypted,
        instanceUrl: connection.instanceUrl,
      },
      email: userIdentity.email,
      accounId: userInfo?.id,
      meta: {
        orgName,
        userIdentity,
        userInfo,
        loginUrl: connection.oauth2.loginUrl,
        isSandboxOrg,
      },
    });
  }

  validateIntegrationRoleRequirements = async (
    connection: Connection,
    AppId: AppIds,
  ) => {
    const userIdentity: IdentityInfo = await connection.identity();

    const userQuery = await connection.query(
      `SELECT Id, ProfileId FROM User WHERE Id = '${userIdentity.user_id}' limit 1`,
    );

    const userRecord: { Id: string; ProfileId: string } = userQuery
      .records[0] as any;

    if (!userRecord) {
      throw new NotFoundException('User not found');
    }

    const profileQuery = await connection.query(
      `SELECT Id, Name FROM Profile WHERE Id = '${userRecord.ProfileId}' limit 1`,
    );

    const profileRecord: { Id: string; Name: string } = profileQuery
      .records[0] as any;

    if (!profileRecord) {
      throw new NotFoundException('Profile not found');
    }

    if (
      AppId === AppIds.SALESFORCE &&
      !allowedAdminRoles.includes(profileRecord.Name)
    ) {
      throw new UnauthorizedException(
        'You must be a System Administrator to integrate with Salesforce',
      );
    }
    return { profileRecord, userRecord, userIdentity };
  };

  verifyCodeAndGetIdentity = async (code: string) => {
    let isSandboxOrg = false;
    let conn = new Connection({
      oauth2: this.oAuth2Client,
    });

    let userInfo: UserInfo;
    try {
      userInfo = await conn.authorize(code);
    } catch (err) {
      try {
        conn = new Connection({
          oauth2: this.oAuth2SandboxClient,
        });
        userInfo = await conn.authorize(code);
        isSandboxOrg = true;
        console.log('is sandbox account');
      } catch (err) {
        console.log('authorized err:', err);
        throw err;
      }
    }
    const identityInfo = await conn.identity();
    conn.logoutByOAuth2(true);
    return { identityInfo, userInfo, isSandboxOrg };
  };

  verifyCodeAndGetConnection = async (code: string) => {
    let isSandboxOrg = false;
    let conn = new Connection({
      oauth2: this.oAuth2Client,
    });

    let userInfo: UserInfo;
    try {
      userInfo = await conn.authorize(code);
    } catch (err) {
      try {
        conn = new Connection({
          oauth2: this.oAuth2SandboxClient,
        });
        userInfo = await conn.authorize(code);
        isSandboxOrg = true;
        console.log('is sandbox account');
      } catch (err) {
        console.log('authorized err:', err);
        throw err;
      }
    }

    const conn2 = new Connection({
      oauth2: isSandboxOrg ? this.#oAuth2SandboxClient : this.oAuth2Client,
      instanceUrl: conn.instanceUrl,
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken,
    });

    return { connection: conn2, userInfo, isSandboxOrg };
  };

  encryptToken = async (token: string) => {
    return this.kmsManagerService.encrypt(
      env().integrationSessionKmsKeyId,
      token,
    );
  };
}
