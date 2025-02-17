import env from '@/config/env.config';
import { Injectable } from '@nestjs/common';
import { AppIds, ICallbackQueryParams, IntegrationSession } from '@/core/types';
import qs from 'qs';
// import crypto from 'node:crypto';
import { IAuthedUser } from '@/auth/types';
import axios from 'axios';
import { OfficeSessionResponse } from './types';
import { KmsManagerService } from '../aws/kms/kms-manager.service';
import { IntegrationState } from '@/integration/integrationState.entity';
import { Integration } from '@/integration/integration.entity';
import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import jwt from 'jsonwebtoken';

@Injectable()
export class Office365Service {
  // codeVerifier = 'aTFY_lKS9FOypZdzsq181XxBYONxOY6EeLNEbA47DYs';
  constructor(
    private readonly kmsManagerService: KmsManagerService,
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationStateRepository: IntegrationStateRepository,
  ) {}

  // generatePkceChallenge() {
  //   // Generate the code challenge by hashing the code verifier with SHA-256.
  //   const codeChallenge = crypto
  //     .createHash('sha256')
  //     .update(this.codeVerifier)
  //     .digest('base64url');

  //   return codeChallenge;
  // }

  getTokenByCode = async (code: string): Promise<OfficeSessionResponse> => {
    const params = new URLSearchParams();
    params.append('client_id', env().msAppId);
    params.append('scope', this.getScope().join(' '));
    params.append('code', code);
    params.append('redirect_uri', this.getFrontendRedirectUrl());
    params.append('grant_type', 'authorization_code');
    // params.append('code_verifier', this.codeVerifier);
    params.append('client_secret', env().msClientSecret);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const res = await axios.post(
      `https://login.microsoftonline.com/${env().msTenantId}/oauth2/v2.0/token`,
      params,
      config,
    );
    return res.data;
  };

  async handleAuthCallback(
    query: ICallbackQueryParams,
    authedUser: IAuthedUser,
  ) {
    const { code } = query;
    const data = await this.getTokenByCode(code);
    const idTokenPayload = jwt.decode(data.id_token) as {
      email: string;
      [key: string]: any;
    };
    const { email } = idTokenPayload;
    const session: IntegrationSession = {
      email,
      tokens: {
        accessToken: await this.encryptToken(data.access_token),
        refreshToken: await this.encryptToken(data.refresh_token),
        tokenType: data.token_type,
        expiresIn: data.expires_in,
        extExpiresIn: data.ext_expires_in,
        idToken: data.id_token,
      },
      meta: {
        ...idTokenPayload,
      },
    };
    await this.saveUserSession(AppIds.OFFICE365, authedUser, session);
  }

  async authorize(authedUser: IAuthedUser) {
    // const codeChallenge = this.generatePkceChallenge();
    const params = {
      client_id: env().msAppId,
      response_type: 'code',
      redirect_uri: this.getFrontendRedirectUrl(),
      scope: this.getScope().join(' '),
      state: `${authedUser.userId}@${authedUser.tenantId}`,
      // code_challenge: codeChallenge,
      // code_challenge_method: 'S256',
    };
    const url = new URL(
      `https://login.microsoftonline.com/${
        env().msTenantId
      }/oauth2/v2.0/authorize?${qs.stringify(params)}`,
    );
    return url.toString();
  }

  private getFrontendRedirectUrl() {
    return env().frontEndUrl + '/d/integration-redirect/' + AppIds.OFFICE365;
  }

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

  private async saveUserSession(
    AppId: AppIds,
    authedUser: IAuthedUser,
    session: IntegrationSession,
  ) {
    const queryOption = { userId: authedUser.userId };

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

  encryptToken = async (token: string) => {
    return this.kmsManagerService.encrypt(
      env().integrationSessionKmsKeyId,
      token,
    );
  };

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
}
