import env from '@/config/env.config';
import { IntegrationRepository } from '@/integration/integration.repository';
import { IntegrationStateRepository } from '@/integration/integrationState.repository';
import { HttpException, Injectable } from '@nestjs/common';
import { AppIds } from '../../types';
import { KmsManagerService } from '@/core/lib/aws/kms/kms-manager.service';
import { IAuthedUser } from '@/auth/types';
import { Connection, OAuth2 } from 'jsforce';

@Injectable()
export class SalesforceMergeService {
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

  public async mergeRecords(
    authedUser: IAuthedUser,
    masterRecordId: string,
    duplicateRecordIds: string[],
    overWriteValues: Record<string, any>,
    objectType: string,
  ) {
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
    conn.on('refresh', async (accessToken, res) => {
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

    if (overWriteValues && Object.keys(overWriteValues).length > 0) {
      const updateRes = await conn
        .sobject(objectType)
        .update({ Id: masterRecordId, ...overWriteValues });
      if (updateRes.success !== true) {
        throw new HttpException('Error while updating the master record', 500);
      }
    }

    const mergeRes = await this.executeMergeProcess(
      masterRecordId,
      duplicateRecordIds,
      objectType,
      conn,
    );

    console.log('Merge response', JSON.stringify(mergeRes, null, 2));

    const mergeSuccess =
      mergeRes['soapenv:Envelope']?.['soapenv:Body']?.['mergeResponse']?.[
        'result'
      ]?.['success'] || false;

    if (mergeSuccess != true && mergeSuccess != 'true') {
      throw new HttpException('Error while merging the records', 500);
    }
  }

  private executeMergeProcess(
    masterRecordId: string,
    duplicateRecordIds: string[],
    objectType: string,
    conn: Connection,
  ) {
    // SOAP request body for merge operation
    const mergeRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:partner.soap.sforce.com" xmlns:urn1="urn:sobject.partner.soap.sforce.com">
    <soapenv:Header>
       <urn:SessionHeader>
          <urn:sessionId>${conn.accessToken}</urn:sessionId>
       </urn:SessionHeader>
    </soapenv:Header>
    <soapenv:Body>
       <urn:merge>
          <urn:request>
             <urn:masterRecord>
                <urn1:type>${objectType}</urn1:type>
                <urn1:Id>${masterRecordId}</urn1:Id>
             </urn:masterRecord>
             <urn:recordToMergeIds>${duplicateRecordIds.join(
               '</urn:recordToMergeIds><urn:recordToMergeIds>',
             )}</urn:recordToMergeIds>
          </urn:request>
       </urn:merge>
    </soapenv:Body>
 </soapenv:Envelope>`;

    return conn.request({
      method: 'POST',
      url: '/services/Soap/u/59.0', // Update with the correct API version
      body: mergeRequest,
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'merge',
      },
    });
  }
}
