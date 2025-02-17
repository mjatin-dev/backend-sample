import env from '@/config/env.config';
import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { AppIds } from '../../types';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';
import { Connection, OAuth2 } from 'jsforce';

@Injectable()
export class SalesforceSchemaService {
  #oAuth2Client: OAuth2;
  #oAuth2SandboxClient: OAuth2;

  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly integrationStateRepository: IntegrationStateRepository,
    private readonly kmsManagerService: KmsManagerService,
  ) {}

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

  private getFrontendRedirectUrl() {
    return env().frontEndUrl + '/d/integration-redirect/' + AppIds.SALESFORCE;
  }

  private async getIntegrationData(tenantId: number) {
    const integration =
      await this.integrationRepository.getOneIntegrationWithStateByTenant(
        tenantId,
        AppIds.SALESFORCE,
      );
    const integrationState = integration.integratedApps?.find(
      (app) => app.tenantId === tenantId,
    );
    return { integration, integrationState };
  }

  public async getFieldPickListValues(
    authedUser: IAuthedUser,
    objectName: string,
    fieldName: string,
  ) {
    const conn = await this.getSalesforceConnection(authedUser);

    const describe = await conn.sobject(objectName).describe();
    const field = describe.fields.find((field) => field.name === fieldName);

    if (!field) {
      throw new HttpException('Field not found', 404);
    }

    if (field.type !== 'picklist') {
      throw new HttpException('Field is not Pick list type', 404);
    }

    return field.picklistValues.map((value) => value.value);
  }

  public async createRecord(
    authedUser: IAuthedUser,
    objectName: string,
    record: any,
  ) {
    const conn = await this.getSalesforceConnection(authedUser);
    return await conn.sobject(objectName).create(record);
  }

  public async updateObjectRecord(
    authedUser: IAuthedUser,
    objectName: string,
    recordId: string,
    values: Record<string, any>,
  ) {
    const conn = await this.getSalesforceConnection(authedUser);

    const updateRes = await conn
      .sobject(objectName)
      .update({ Id: recordId, ...values });

    if (updateRes.success !== true) {
      throw new HttpException('Error while updating record', 500);
    }
  }

  private async getSalesforceConnection(authedUser: IAuthedUser) {
    const { integrationState } = await this.getIntegrationData(
      authedUser.tenantId,
    );

    if (!integrationState) {
      throw new HttpException('Integration not found', 404);
    }

    const session = integrationState.session;
    const tokens: any = session.tokens;
    const isSandboxOrg = session.meta?.isSandboxOrg == true;
    const accessToken = await this.kmsManagerService.decrypt(
      tokens.accessToken,
    );

    const refreshToken = await this.kmsManagerService.decrypt(
      tokens.refreshToken,
    );

    const instanceUrl = tokens.instanceUrl;

    const conn = new Connection({
      instanceUrl,
      accessToken,
      refreshToken,
      oauth2: isSandboxOrg ? this.#oAuth2SandboxClient : this.oAuth2Client,
      version: '59.0',
    });

    //Make Sure to update the connection object with the new access token
    conn.on('refresh', async (accessToken) => {
      const { integrationState } = await this.getIntegrationData(
        authedUser.tenantId,
      );
      const session = integrationState.session;
      const tokens: any = session.tokens;
      tokens.accessToken = await this.kmsManagerService.encrypt(
        env().integrationSessionKmsKeyId,
        accessToken,
      );
      await this.integrationStateRepository.update(
        integrationState.id,
        integrationState,
      );
    });

    return conn;
  }
}
